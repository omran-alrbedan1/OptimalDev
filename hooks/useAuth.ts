"use client";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthToken,
} from "@/store/selectors/authSelector";
import {
  loadStoredAuth,
  logout as logoutAction,
} from "@/store/slices/authSlice";
import { deleteCookie } from "cookies-next";

export const useAuth = (requireAuth = false) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Select auth state from Redux store
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) return;

    if (
      !requireAuth &&
      isAuthenticated &&
      ["/login", "/register"].includes(pathname)
    ) {
      router.push("/home");
    }
  }, [requireAuth, isAuthenticated, isLoading, router, pathname]);

  const logout = useCallback(async () => {
    try {
      dispatch(logoutAction());

      deleteCookie("token");
      deleteCookie("authData");

      router.push("/home");

      if (pathname === "/home") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [dispatch, router, pathname]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || (!user && !isAuthenticated && token === null),
    logout,
  };
};
