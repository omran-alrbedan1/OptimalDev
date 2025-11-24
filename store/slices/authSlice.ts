import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

// Define proper TypeScript interfaces
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  country_id?: string;
  city_id?: string;
  // Add other user fields as needed
}

interface LoginResponse {
  user: User;
  access_token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Improved initial state loader
const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    // Server-side: return default state
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }

  try {
    const authData = getCookie("authData");
    if (authData) {
      const parsedData = JSON.parse(authData as string);
      return {
        user: parsedData.user || null,
        token: parsedData.token || null,
        isAuthenticated: parsedData.isAuthenticated || false,
        loading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error("Error parsing auth data from cookies:", error);
    // Clear invalid cookie
    deleteCookie("authData");
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      const { user, access_token } = action.payload;

      state.user = user;
      state.token = access_token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // Set both individual token cookie and authData cookie
      setCookie("token", access_token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      setCookie(
        "authData",
        JSON.stringify({
          user,
          token: access_token,
          isAuthenticated: true,
        }),
        {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        }
      );
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Clear all auth-related cookies
      deleteCookie("authData");
      deleteCookie("token");
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear all auth-related cookies
      deleteCookie("authData");
      deleteCookie("token");
    },
    loadStoredAuth(state) {
      const storedAuth = loadInitialState();
      state.user = storedAuth.user;
      state.token = storedAuth.token;
      state.isAuthenticated = storedAuth.isAuthenticated;
      state.loading = false;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        // Update cookie with new user data
        if (state.token) {
          setCookie(
            "authData",
            JSON.stringify({
              user: state.user,
              token: state.token,
              isAuthenticated: true,
            }),
            {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            }
          );
        }
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loadStoredAuth,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
