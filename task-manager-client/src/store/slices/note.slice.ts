import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../interfaces/note.interface";
import { fetchGetNoteById, fetchGetNotes, fetchGetNotesWithFilters } from "../thunks/note.thunk";
import { IFilters } from "../../interfaces/filters.interface";
import { FiltersInitialState } from "../../constants/filter.constants";
import { PURGE } from "redux-persist";

export interface NoteState {
  notes: Array<INote>;
  note?: INote;
  filters: IFilters;
}

const initialState: NoteState = {
  notes: [],
  filters: FiltersInitialState,
  note: undefined,
};

export const UiSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Array<INote>>) => {
      state.notes = action.payload;
    },
    setNote: (state, action: PayloadAction<INote>) => {
      state.note = action.payload;
    },

    setFilters: (
      state,
      { payload: { key, value } }: PayloadAction<{ key: string; value: string }>
    ) => {
      switch (key) {
        case "search":
          state.filters.search = value
          break;
        case "filters":
          state.filters.filters = value

          break;
        case "sort":
          state.filters.sort = value
          break;
        case "archived":
          state.filters.archived = value
          break;
        default:
          state = state;
      }
    },
    cleanFilter: (state) => {
      state.filters = FiltersInitialState;
    },
    cleanNote: (state) => {
      state.note = undefined;
    },
    cleanNotes: (state) => {
      state.notes = [];
    },
    cleanAll: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchGetNotes.fulfilled, (state, { payload }) => {
      state.notes = [...payload];
    });
    builder.addCase(fetchGetNotesWithFilters.fulfilled, (state, {payload})=>{
      state.notes = [...payload];
    });
    builder.addCase(fetchGetNoteById.fulfilled,(state, {payload})=>{
      state.note = payload
    } )
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});


export const {
  cleanAll,
  cleanNote,
  cleanNotes,
  cleanFilter,
  setNote,
  setNotes,
  setFilters,
} = UiSlice.actions;

export default UiSlice.reducer;
