import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { INotify } from "../../interfaces/ui.interface";

export interface UiState {
loader:boolean,
notify?: INotify,
}

const initialState: UiState = {
    loader: false,
    notify: undefined,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setNotify: (state, action: PayloadAction<INotify>) => {
      state.notify = action.payload;
    },
    cleanNotify: (state) => {
      state.notify = undefined;
    },
    cleanAll: () => {
      return initialState;
    },
  }
});

export const { cleanAll, cleanNotify, setLoader, setNotify } =
  UiSlice.actions;

export default UiSlice.reducer;
