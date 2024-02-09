import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { setNotify } from "../slices/ui.slice";
import { NOTIFY_CONTANTS } from "../../constants/ui.constants";
import { IAuth } from "../../interfaces/auth.interface";
import { persistor } from "../store";

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (userData: IAuth, thunkApi) => {
    try {
      const response = await AuthService.register(userData);
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.success("User registered successfully."))
      );
      return response;
    } catch (error) {
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to register user."))
      );
      throw error;
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (userData: IAuth, thunkApi) => {
    try {
      const response = await AuthService.login(userData);
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.success("User logged in successfully."))
      );
      return response;
    } catch (error) {
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to log in user."))
      );
      throw error;
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.logout();
      await persistor.purge()
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.success("User logged out successfully."))
      );
      return response;
    } catch (error) {
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to log out user."))
      );
      throw error;
    }
  }
);

export type IFetchRegister = typeof fetchRegister;
export type IFetchLogin = typeof fetchLogin;
export type IFetchLogout = typeof fetchLogout;
