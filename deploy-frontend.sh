#!/bin/bash
# Frontend Deployment Script
# This script deploys a new version of the optimal_front service
# Usage: ./deploy-frontend.sh <image_tag> <registry_image>

set -e  # Exit on any error
set -u  # Exit on undefined variable

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" >&2
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

# Check if required arguments are provided
if [ $# -lt 2 ]; then
    error "Usage: $0 <image_tag> <registry_image>"
    error "Example: $0 main-a1b2c3d-20241207 registry.gitlab.com/group/optimal_front"
    exit 1
fi

# Variables from command line arguments
IMAGE_TAG="$1"
REGISTRY_IMAGE="$2"
FULL_IMAGE="${REGISTRY_IMAGE}:${IMAGE_TAG}"

# Deployment configuration
DEPLOY_PATH="${DEPLOY_PATH:-/opt/optimal}"
VERSIONS_FILE="${DEPLOY_PATH}/.env.versions"
COMPOSE_FILE="${DEPLOY_PATH}/docker-compose.yml"
HEALTH_CHECK_TIMEOUT=60
HEALTH_CHECK_INTERVAL=5

log "Starting frontend deployment"
log "Image: ${FULL_IMAGE}"
log "Deploy path: ${DEPLOY_PATH}"

# Verify deployment directory exists
if [ ! -d "$DEPLOY_PATH" ]; then
    error "Deployment directory does not exist: ${DEPLOY_PATH}"
    exit 1
fi

# Verify docker-compose.yml exists
if [ ! -f "$COMPOSE_FILE" ]; then
    error "docker-compose.yml not found at: ${COMPOSE_FILE}"
    exit 1
fi

# Change to deployment directory
cd "$DEPLOY_PATH"

# Login to GitLab Container Registry
log "Authenticating with GitLab Container Registry..."
if [ -z "${CI_REGISTRY_PASSWORD:-}" ] || [ -z "${CI_REGISTRY_USER:-}" ]; then
    error "CI_REGISTRY_USER and CI_REGISTRY_PASSWORD environment variables must be set"
    exit 1
fi

echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin "${CI_REGISTRY:-registry.gitlab.com}" 2>&1 | grep -v "WARNING"
if [ $? -eq 0 ]; then
    log "Successfully authenticated with container registry"
else
    error "Failed to authenticate with container registry"
    exit 1
fi

# Pull new Docker image
log "Pulling Docker image: ${FULL_IMAGE}"
if docker pull "$FULL_IMAGE"; then
    log "Successfully pulled image"
else
    error "Failed to pull Docker image: ${FULL_IMAGE}"
    exit 1
fi

# Backup current version before updating
if [ -f "$VERSIONS_FILE" ]; then
    PREVIOUS_VERSION=$(grep "^FRONT_VERSION=" "$VERSIONS_FILE" | cut -d'=' -f2)
    log "Previous version: ${PREVIOUS_VERSION:-none}"
    cp "$VERSIONS_FILE" "${VERSIONS_FILE}.backup"
else
    warning "Version file does not exist, creating new one"
    PREVIOUS_VERSION="none"
fi

# Update version in .env.versions file
log "Updating version file..."
if [ -f "$VERSIONS_FILE" ]; then
    # Update existing FRONT_VERSION line
    if grep -q "^FRONT_VERSION=" "$VERSIONS_FILE"; then
        sed -i "s|^FRONT_VERSION=.*|FRONT_VERSION=${IMAGE_TAG}|" "$VERSIONS_FILE"
    else
        echo "FRONT_VERSION=${IMAGE_TAG}" >> "$VERSIONS_FILE"
    fi
else
    # Create new version file
    echo "FRONT_VERSION=${IMAGE_TAG}" > "$VERSIONS_FILE"
fi

log "Version file updated: FRONT_VERSION=${IMAGE_TAG}"

# Restart frontend service (only optimal-front)
log "Restarting frontend service (optimal-front)..."
if docker-compose up -d optimal-front; then
    log "Service restart initiated"
else
    error "Failed to restart service"
    # Attempt to restore previous version
    if [ -f "${VERSIONS_FILE}.backup" ]; then
        warning "Attempting to restore previous version..."
        mv "${VERSIONS_FILE}.backup" "$VERSIONS_FILE"
        docker-compose up -d optimal-front
    fi
    exit 1
fi

# Wait for service to start
log "Waiting for service to start..."
sleep 10

# Health check verification
log "Verifying health checks..."
ELAPSED=0
FRONTEND_HEALTHY=false

while [ $ELAPSED -lt $HEALTH_CHECK_TIMEOUT ]; do
    # Check optimal-front health
    FRONT_STATUS=$(docker inspect --format='{{.State.Health.Status}}' optimal-front 2>/dev/null || echo "unknown")
    
    if [ "$FRONT_STATUS" = "healthy" ]; then
        log "✓ optimal-front is healthy"
        FRONTEND_HEALTHY=true
        break
    elif [ "$FRONT_STATUS" = "unhealthy" ]; then
        error "optimal-front is unhealthy"
        break
    fi
    
    # Wait before next check
    sleep $HEALTH_CHECK_INTERVAL
    ELAPSED=$((ELAPSED + HEALTH_CHECK_INTERVAL))
    
    if [ $((ELAPSED % 15)) -eq 0 ]; then
        log "Still waiting for health checks... (${ELAPSED}s/${HEALTH_CHECK_TIMEOUT}s)"
    fi
done

# Final health check verification
if ! $FRONTEND_HEALTHY; then
    error "Health checks failed after ${HEALTH_CHECK_TIMEOUT} seconds"
    error "Frontend healthy: ${FRONTEND_HEALTHY}"
    
    # Show container logs for debugging
    log "Container status:"
    docker-compose ps optimal-front
    
    log "Recent logs from optimal-front:"
    docker-compose logs --tail=20 optimal-front
    
    # Attempt rollback if previous version exists
    if [ "$PREVIOUS_VERSION" != "none" ] && [ -f "${VERSIONS_FILE}.backup" ]; then
        warning "Attempting automatic rollback to previous version: ${PREVIOUS_VERSION}"
        mv "${VERSIONS_FILE}.backup" "$VERSIONS_FILE"
        docker-compose up -d optimal-front
        sleep 10
        error "Deployment failed. Rolled back to previous version."
    else
        error "Deployment failed. No previous version available for rollback."
    fi
    
    exit 1
fi

# Deployment successful - clean up backup
if [ -f "${VERSIONS_FILE}.backup" ]; then
    rm "${VERSIONS_FILE}.backup"
fi

# Log deployment success
DEPLOYMENT_LOG="${DEPLOY_PATH}/deployments.log"
TIMESTAMP=$(date +'%Y-%m-%d %H:%M:%S')
DEPLOYED_BY="${CI_COMMIT_AUTHOR:-${USER:-unknown}}"
ENVIRONMENT="${CI_ENVIRONMENT_NAME:-production}"

log "Logging deployment details..."
echo "${TIMESTAMP} | Frontend | ${IMAGE_TAG} | ${DEPLOYED_BY} | ${ENVIRONMENT} | SUCCESS" >> "$DEPLOYMENT_LOG"

# Display final status
log "=========================================="
log "Frontend deployment completed successfully!"
log "=========================================="
log "Version: ${IMAGE_TAG}"
log "Previous version: ${PREVIOUS_VERSION}"
log "Deployed by: ${DEPLOYED_BY}"
log "Environment: ${ENVIRONMENT}"
log "Timestamp: ${TIMESTAMP}"
log "=========================================="

# Show running container
log "Current container status:"
docker-compose ps optimal-front

exit 0
