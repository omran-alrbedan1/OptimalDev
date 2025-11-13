import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const loadInitialState = (): AuthState => {
  const authData = getCookie("authData");
  return authData
    ? JSON.parse(authData as string)
    : {
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

      setCookie(
        "authData",
        JSON.stringify({
          user,
          token: access_token,
          isAuthenticated: true,
        }),
        {
          maxAge: 30 * 24 * 60 * 60,
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
      deleteCookie("authData");
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      deleteCookie("authData");
      deleteCookie("token");
    },
    loadStoredAuth(state) {
      const storedAuth = loadInitialState();
      if (storedAuth.isAuthenticated) {
        state.user = storedAuth.user;
        state.token = storedAuth.token;
        state.isAuthenticated = storedAuth.isAuthenticated;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loadStoredAuth,
} = authSlice.actions;

export default authSlice.reducer;
