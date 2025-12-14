# GitLab CI/CD Setup Guide for Optimal Front

This document provides detailed instructions for configuring GitLab CI/CD variables for the Optimal Front frontend application.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Variable Configuration Reference](#variable-configuration-reference)
4. [Step-by-Step Setup Instructions](#step-by-step-setup-instructions)
5. [Security Best Practices](#security-best-practices)
6. [Validation and Testing](#validation-and-testing)
7. [Troubleshooting](#troubleshooting)

## Overview

The GitLab CI/CD pipeline for Optimal Front requires 7 environment variables to be configured. These variables control:

- Container registry authentication
- SSH access to production servers
- Application configuration (API endpoints)

All variables must be configured as **Protected** to ensure they are only available to pipelines running on protected branches (main/master), preventing exposure in feature branch builds.

## Prerequisites

Before configuring CI/CD variables, ensure you have:

- [ ] GitLab project with Maintainer or Owner role
- [ ] Access to the production server
- [ ] Backend API URL for production
- [ ] SSH key pair generated for deployment

## Variable Configuration Reference

### Complete Variable List

| # | Variable Name | Type | Protected | Masked | Required | Purpose |
|---|--------------|------|-----------|--------|----------|---------|
| 1 | CI_REGISTRY_USER | Variable | ✅ | ✅ | Yes | GitLab Container Registry username |
| 2 | CI_REGISTRY_PASSWORD | Variable | ✅ | ✅ | Yes | GitLab Container Registry password/token |
| 3 | SSH_PRIVATE_KEY | File | ✅ | ✅ | Yes | Private SSH key for server deployment |
| 4 | SSH_HOST | Variable | ✅ | ❌ | Yes | Production server hostname/IP |
| 5 | SSH_USER | Variable | ✅ | ❌ | Yes | SSH username for deployment |
| 6 | DEPLOY_PATH | Variable | ✅ | ❌ | Yes | Deployment directory on server |
| 7 | NEXT_PUBLIC_API_URL | Variable | ✅ | ❌ | Yes | Backend API base URL |
| 8 | SLACK_WEBHOOK_URL | Variable | ✅ | ✅ | No | Slack webhook for notifications (optional) |
| 9 | NOTIFICATION_EMAIL | Variable | ✅ | ❌ | No | Email address for notifications (optional) |

### Variable Details

#### 1. CI_REGISTRY_USER

**Purpose:** Username for authenticating with GitLab Container Registry

**How to obtain:**
- Option A: Use `gitlab-ci-token` (recommended for CI/CD)
- Option B: Use your GitLab username
- Option C: Create a Deploy Token (Project Settings > Repository > Deploy Tokens)

**Example value:** `gitlab-ci-token`

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ✅ Yes

---

#### 2. CI_REGISTRY_PASSWORD

**Purpose:** Password or token for authenticating with GitLab Container Registry

**How to obtain:**
- Option A: Use `$CI_JOB_TOKEN` (automatically provided by GitLab)
- Option B: Create a Personal Access Token with `read_registry` and `write_registry` scopes
  - Go to User Settings > Access Tokens
  - Name: "CI/CD Registry Access"
  - Scopes: `read_registry`, `write_registry`
  - Expiration: Set appropriate date
- Option C: Use Deploy Token password

**Example value:** `glpat-xxxxxxxxxxxxxxxxxxxx`

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ✅ Yes

**Note:** Personal Access Tokens are recommended over Deploy Tokens for better audit trails.

---

#### 3. SSH_PRIVATE_KEY

**Purpose:** Private SSH key for authenticating to the production server during deployment

**How to obtain:**

```bash
# Generate a new ED25519 key (recommended)
ssh-keygen -t ed25519 -C "gitlab-ci-optimal-front" -f ~/.ssh/optimal_front_deploy

# Or generate RSA key (if ED25519 not supported)
ssh-keygen -t rsa -b 4096 -C "gitlab-ci-optimal-front" -f ~/.ssh/optimal_front_deploy

# Display the private key (this is what you'll paste into GitLab)
cat ~/.ssh/optimal_front_deploy

# Display the public key (add this to the server)
cat ~/.ssh/optimal_front_deploy.pub
```

**Server setup:**

```bash
# On the production server, add the public key to authorized_keys
# (Replace 'deploy' with your SSH_USER)
ssh deploy@your-server.com
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# Paste the public key, save and exit
chmod 600 ~/.ssh/authorized_keys
```

**Example value:** 
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
...
(multiple lines)
...
-----END OPENSSH PRIVATE KEY-----
```

**Security settings:**
- Type: **File** (Important!)
- Protected: ✅ Yes
- Masked: ✅ Yes

**Important:** 
- Must include the full key including `-----BEGIN` and `-----END` lines
- Must be set as File type to preserve line breaks
- Never commit this key to the repository
- Use a dedicated key for CI/CD (don't reuse personal keys)
- Can use the same key as backend if deploying to the same server, or create a separate key for better isolation

---

#### 4. SSH_HOST

**Purpose:** Hostname or IP address of the production server

**Example values:**
- `production.optimal.com`
- `192.168.1.100`
- `optimal-prod-01.example.com`

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ❌ No (hostnames are not sensitive)

**Note:** This should be the same server where the backend is deployed if using a shared Docker Compose setup.

---

#### 5. SSH_USER

**Purpose:** Username for SSH connection to production server

**Recommended value:** `deploy` (dedicated deployment user)

**Server setup:**

```bash
# On production server, create deployment user (if not already created)
sudo adduser deploy
sudo usermod -aG docker deploy

# Test SSH access
ssh deploy@your-server.com
```

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ❌ No (usernames are not sensitive)

**Note:** Should be the same user as the backend deployment if using shared infrastructure.

---

#### 6. DEPLOY_PATH

**Purpose:** Directory path where the application is deployed on the server

**Recommended value:** `/opt/optimal`

**Server setup:**

```bash
# On production server (if not already created)
sudo mkdir -p /opt/optimal
sudo chown deploy:deploy /opt/optimal
chmod 755 /opt/optimal
```

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ❌ No (paths are not sensitive)

**Note:** Should be the same path as the backend deployment since they share the docker-compose.yml file.

---

#### 7. NEXT_PUBLIC_API_URL

**Purpose:** Base URL for the backend API that the Next.js frontend will communicate with

**Example values:**
- `https://api.optimal.com`
- `https://optimal.com/api`
- `http://192.168.1.100:7099/api`

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ❌ No (API URLs are not sensitive, but protect to prevent exposure)

**Important:**
- Must be accessible from the client's browser (not just from the server)
- Should use HTTPS in production
- Include the full URL including protocol (http:// or https://)
- Do not include trailing slash
- This value will be embedded in the client-side JavaScript bundle

**Next.js Environment Variable Note:**
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- They are embedded at build time, not runtime
- Changing this value requires rebuilding the Docker image

---

#### 8. SLACK_WEBHOOK_URL (Optional)

**Purpose:** Webhook URL for sending pipeline notifications to Slack

**How to obtain:**

1. Go to your Slack workspace
2. Navigate to **Apps** > **Manage Apps**
3. Search for **Incoming Webhooks**
4. Click **Add to Slack**
5. Choose a channel (e.g., `#deployments`, `#ci-cd`)
6. Click **Add Incoming WebHooks Integration**
7. Copy the Webhook URL

**Example value:** `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX`

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ✅ Yes

**Note:** If not configured, Slack notifications will be skipped. See [NOTIFICATION_SETUP_GUIDE.md](../NOTIFICATION_SETUP_GUIDE.md) for detailed setup instructions.

---

#### 9. NOTIFICATION_EMAIL (Optional)

**Purpose:** Email address to receive pipeline notifications

**Example value:** `devops@optimal.com`

**Security settings:**
- Type: Variable
- Protected: ✅ Yes
- Masked: ❌ No

**Note:** This is a reference variable. Actual email notifications should be configured in GitLab project settings under **Settings** > **Integrations** > **Emails on push** or **Pipeline emails**.

---

## Step-by-Step Setup Instructions

### Step 1: Prepare Required Information

Before starting, gather all the information you'll need:

- [ ] GitLab Personal Access Token or Deploy Token
- [ ] SSH key pair (generated and public key added to server)
- [ ] Production server hostname/IP
- [ ] Deployment user credentials
- [ ] Backend API URL

### Step 2: Access GitLab CI/CD Settings

1. Navigate to your GitLab project: `https://gitlab.com/your-group/optimal_front`
2. Click **Settings** in the left sidebar
3. Click **CI/CD**
4. Scroll to the **Variables** section
5. Click **Expand**

### Step 3: Add Each Variable

For each variable in the table above:

1. Click the **Add variable** button
2. Fill in the fields:
   - **Key:** Enter the exact variable name (e.g., `CI_REGISTRY_USER`)
   - **Value:** Enter the variable value
   - **Type:** Select "Variable" or "File" as specified
   - **Flags:**
     - ✅ Check **Protect variable** (for all variables)
     - ✅ Check **Mask variable** (for sensitive values as specified)
3. Click **Add variable**

### Step 4: Verify Configuration

After adding all variables:

1. Count the variables - you should have exactly 7
2. Verify each variable has the correct flags:
   - All should be Protected
   - Sensitive values should be Masked
   - SSH_PRIVATE_KEY should be File type
3. Check for typos in variable names (they are case-sensitive)
4. Verify NEXT_PUBLIC_API_URL format is correct

### Step 5: Test the Pipeline

1. Ensure your `main` or `master` branch is protected:
   - Go to Settings > Repository > Protected branches
   - Protect the main/master branch
2. Push a commit to the protected branch
3. Monitor the pipeline execution
4. Check for any authentication or connection errors

## Security Best Practices

### Access Control

- **Limit GitLab Access:** Only Maintainers and Owners can view CI/CD variables
- **Use Protected Branches:** Configure main/master as protected branches
- **Audit Access:** Regularly review who has access to the project

### Credential Management

- **Rotate Regularly:** Change passwords and tokens every 90 days
- **Use Unique Credentials:** Don't reuse credentials across environments
- **Least Privilege:** Grant minimum necessary permissions
- **Monitor Usage:** Review audit logs for suspicious activity

### SSH Key Security

- **Dedicated Keys:** Use separate SSH keys for CI/CD
- **Key Rotation:** Rotate SSH keys annually
- **Passphrase Protection:** Consider using passphrase-protected keys
- **Revoke Old Keys:** Remove old public keys from servers
- **Separate Keys:** Consider using different keys for frontend and backend deployments for better isolation

### Variable Security

- **Never Commit Secrets:** Use `.gitignore` to prevent accidental commits
- **Mask Sensitive Values:** Always mask passwords, tokens, and keys
- **Use File Type:** Use File type for multi-line secrets
- **Review Logs:** Check pipeline logs for accidental exposure

### Next.js Specific Security

- **Public Variables:** Remember that `NEXT_PUBLIC_*` variables are exposed to the browser
- **No Secrets in Public Variables:** Never put API keys, passwords, or secrets in NEXT_PUBLIC_ variables
- **API URL Validation:** Ensure the API URL uses HTTPS in production
- **CORS Configuration:** Ensure backend CORS settings allow requests from the frontend domain

### Network Security

- **Firewall Rules:** Restrict SSH access to known IP ranges
- **VPN Access:** Consider requiring VPN for server access
- **SSH Hardening:** Disable password authentication, use key-only
- **Port Changes:** Consider using non-standard SSH ports

## Validation and Testing

### Pre-Deployment Checklist

Before running your first pipeline:

- [ ] All 7 variables are configured
- [ ] All variables are marked as Protected
- [ ] Sensitive variables are marked as Masked
- [ ] SSH_PRIVATE_KEY is set as File type
- [ ] SSH public key is added to server's authorized_keys
- [ ] NEXT_PUBLIC_API_URL is correct and accessible
- [ ] Protected branches are configured in GitLab

### Testing Individual Components

**Test SSH Connection:**

```bash
# From your local machine
ssh -i ~/.ssh/optimal_front_deploy deploy@your-server.com
```

**Test API URL Accessibility:**

```bash
# Test that the API URL is accessible
curl -I https://api.optimal.com/health

# Or test a specific endpoint
curl https://api.optimal.com/api/sliders
```

**Test Container Registry Access:**

```bash
# Test login to GitLab Container Registry
echo "YOUR_CI_REGISTRY_PASSWORD" | docker login -u YOUR_CI_REGISTRY_USER --password-stdin registry.gitlab.com
```

**Test Next.js Build with Environment Variables:**

```bash
# Locally test that the build works with the API URL
export NEXT_PUBLIC_API_URL=https://api.optimal.com
npm run build
npm start
```

### Pipeline Testing Strategy

1. **Test on Feature Branch First:**
   - Push to a feature branch
   - Verify build and test stages work
   - Deploy stage should be skipped (not a protected branch)

2. **Test on Protected Branch:**
   - Merge to main/master
   - Verify all stages execute
   - Monitor deployment to production

3. **Verify Deployment:**
   - Check application is accessible
   - Verify API calls work correctly
   - Test critical user flows
   - Check browser console for errors

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Permission denied (publickey)"

**Symptoms:** Pipeline fails during deploy stage with SSH authentication error

**Solutions:**
1. Verify SSH_PRIVATE_KEY is set as **File** type (not Variable)
2. Ensure the private key includes header and footer lines
3. Check that the public key is in server's `~/.ssh/authorized_keys`
4. Verify SSH_USER has correct permissions on the server
5. Test SSH connection manually from your machine

```bash
# Test with verbose output
ssh -v -i ~/.ssh/optimal_front_deploy deploy@your-server.com
```

---

#### Issue: "unauthorized: authentication required"

**Symptoms:** Pipeline fails when pushing to Container Registry

**Solutions:**
1. Verify CI_REGISTRY_USER and CI_REGISTRY_PASSWORD are correct
2. Check that the token has `read_registry` and `write_registry` scopes
3. Ensure variables are marked as Protected
4. Verify Container Registry is enabled for the project

---

#### Issue: "API calls failing in production"

**Symptoms:** Frontend loads but cannot communicate with backend

**Solutions:**
1. Verify NEXT_PUBLIC_API_URL is correct and accessible from the browser
2. Check that the URL uses HTTPS in production
3. Verify backend CORS settings allow requests from frontend domain
4. Check browser console for CORS or network errors
5. Ensure the API URL doesn't have a trailing slash

```bash
# Test API accessibility from the server
curl -I $NEXT_PUBLIC_API_URL/health

# Test from your local machine (simulating browser)
curl -I https://api.optimal.com/health
```

---

#### Issue: "Environment variable not available in browser"

**Symptoms:** `process.env.NEXT_PUBLIC_API_URL` is undefined in the browser

**Solutions:**
1. Verify the variable name starts with `NEXT_PUBLIC_`
2. Rebuild the Docker image (environment variables are embedded at build time)
3. Check that the variable is set during the build stage in the pipeline
4. Verify the variable is not being overridden in the code

---

#### Issue: "Host key verification failed"

**Symptoms:** SSH connection fails due to unknown host key

**Solutions:**
1. Add host key verification to pipeline script:

```yaml
before_script:
  - mkdir -p ~/.ssh
  - ssh-keyscan -H $SSH_HOST >> ~/.ssh/known_hosts
```

2. Or disable strict host checking (less secure):

```yaml
before_script:
  - mkdir -p ~/.ssh
  - echo "StrictHostKeyChecking no" >> ~/.ssh/config
```

---

#### Issue: "Variables not available in pipeline"

**Symptoms:** Pipeline cannot access CI/CD variables

**Solutions:**
1. Verify variables are marked as Protected
2. Ensure the branch is protected in GitLab
3. Check that you have the correct permissions
4. Verify variable names match exactly (case-sensitive)

---

#### Issue: "Build succeeds but application shows old API URL"

**Symptoms:** Application is using a different API URL than configured

**Solutions:**
1. Verify you're using the correct image tag in deployment
2. Check that the new image was actually pulled to the server
3. Verify docker-compose is using the new image version
4. Restart the container to ensure it's using the new image

```bash
# On the server
cd /opt/optimal
docker-compose pull optimal-front
docker-compose up -d optimal-front
docker-compose logs optimal-front
```

---

### Getting Help

If you encounter issues not covered here:

1. **Check Pipeline Logs:** Review the full job logs in GitLab
2. **Review Documentation:** Check the main README.md
3. **Test Locally:** Try to reproduce the issue on your local machine
4. **Check Browser Console:** Look for client-side errors
5. **Contact DevOps Team:** Reach out to the team for assistance

---

## Appendix: Quick Reference

### Variable Checklist

**Required Variables:**
```
[ ] CI_REGISTRY_USER (Variable, Protected, Masked)
[ ] CI_REGISTRY_PASSWORD (Variable, Protected, Masked)
[ ] SSH_PRIVATE_KEY (File, Protected, Masked)
[ ] SSH_HOST (Variable, Protected)
[ ] SSH_USER (Variable, Protected)
[ ] DEPLOY_PATH (Variable, Protected)
[ ] NEXT_PUBLIC_API_URL (Variable, Protected)
```

**Optional Variables (for notifications):**
```
[ ] SLACK_WEBHOOK_URL (Variable, Protected, Masked)
[ ] NOTIFICATION_EMAIL (Variable, Protected)
```

### Useful Commands

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "gitlab-ci-deploy" -f ~/.ssh/deploy_key

# Test SSH connection
ssh -i ~/.ssh/deploy_key user@host

# Test API accessibility
curl -I https://api.optimal.com/health

# Login to GitLab Container Registry
echo "token" | docker login -u username --password-stdin registry.gitlab.com

# Test Next.js build with environment variable
export NEXT_PUBLIC_API_URL=https://api.optimal.com
npm run build

# Check running containers on server
docker ps

# View container logs
docker logs optimal-front

# Restart frontend container
docker-compose restart optimal-front
```

### Shared Infrastructure Notes

If deploying to the same server as the backend:

- **SSH Credentials:** Can use the same SSH_HOST, SSH_USER, and SSH_PRIVATE_KEY as the backend
- **Deploy Path:** Must use the same DEPLOY_PATH since docker-compose.yml is shared
- **Coordination:** Frontend and backend deployments are independent but share the same docker-compose stack
- **Service Isolation:** Each deployment only restarts its own service (optimal-front or optimal-back)

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-06  
**Maintained By:** DevOps Team
