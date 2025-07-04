"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/selectors/authSelector";
import { loadStoredAuth } from "@/store/slices/authSlice";

export const useAuth = (requireAuth = false) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [requireAuth, isAuthenticated, router]);

  return {
    user,
    isAuthenticated,
    isLoading: !user && !isAuthenticated,
  };
};
