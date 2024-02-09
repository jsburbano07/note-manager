import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegister } from "../thunks/auth.thunk";
import { PURGE } from "redux-persist";

export interface AuthState {
  username: string;
  token: string;
}

const initialState: AuthState = {
  username: "",
  token: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    cleanAuth: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRegister?.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.username;
    });
    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.username;
    });
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setToken, setUserName, cleanAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
