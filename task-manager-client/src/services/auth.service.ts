// auth.service.ts

import { AxiosError } from "axios";
import Axios from "../AxiosCustom.ts";

const AuthService = {
  register: async (userData: { username: string; password: string }): Promise<any> => {
    try {
      const response = await Axios.post<any>(`/auth/register`, userData);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  login: async (userData: { username: string; password: string }): Promise<any> => {
    try {
      const response = await Axios.post<any>(`/auth/login`, userData);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  logout: async (): Promise<any> => {
    try {
      const response = await Axios.post<any>(`/auth/logout`);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },
  verifyToken: async function isAuthenticated():Promise<boolean> {
    try {
        await Axios.get<any>(`/auth/verify`); 
      return true;
    } catch (error) {
      return false;
    }
  }
};

function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    console.error("Error response from server:", error.response.data);
  } else if (error.request) {
    console.error("No response received from server");
  } else {
    console.error("Request configuration error:", error.message);
  }
  throw new Error("Error communicating with the server");
}

export default AuthService;
