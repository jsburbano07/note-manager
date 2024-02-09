import { createAsyncThunk } from "@reduxjs/toolkit";
import NoteService from "../../services/note.service";
import { INote } from "../../interfaces/note.interface";
import { setLoader, setNotify } from "../slices/ui.slice";
import { NOTIFY_CONTANTS } from "../../constants/ui.constants";
import { RootState } from "../store";

export const fetchCreateNote = createAsyncThunk(
  "notes/fetchCreateNote",
  async (note: INote, thunkApi) => {
    try {
      thunkApi.dispatch(setLoader(true))
      const response = await NoteService.createNote(note);
      thunkApi.dispatch(setNotify(NOTIFY_CONTANTS.success("Note was created succesfully.")))
      thunkApi.dispatch(setLoader(false))
      return response;
    } catch (error) {
      thunkApi.dispatch(setLoader(false))
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to create the note."))
      );
      throw error;
    }
  }
);

export const fetchGetNotes = createAsyncThunk(
  "notes/fetchGetNotes",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoader(true))
      const response = await NoteService.getAllNotes();
      thunkApi.dispatch(setLoader(false))
      return response;
    } catch (error) {
      thunkApi.dispatch(setLoader(false))
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to get notes."))
      );
      throw error;
    }
  }
);

export const fetchGetNotesWithFilters = createAsyncThunk(
  "notes/fetchGetNotesWithFilters",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoader(true))
      const {notes: {filters}} = thunkApi.getState() as RootState
      const response = await NoteService.getAllNotesWithFilters(filters);
      thunkApi.dispatch(setLoader(false))
      return response;
    } catch (error) {
      thunkApi.dispatch(setLoader(false))
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to get notes."))
      );
      throw error;
    }
  }
);

export const fetchGetNoteById = createAsyncThunk(
  "notes/fetchGetNoteById",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoader(true))
      const response = await NoteService.getNoteById(id);
      thunkApi.dispatch(setLoader(false))
      return response;
    } catch (error) {
      thunkApi.dispatch(setLoader(false))
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to get note by id."))
      );
      throw error;
    }
  }
);



export const fetchUpdateNote = createAsyncThunk(
  "notes/fetchUpdateNote",
  async ({_id, noteData}: {_id: string, noteData: Partial<INote>}, thunkApi) => {
    try {
      thunkApi.dispatch(setLoader(true))
      await NoteService.updateNote(_id, noteData);
      thunkApi.dispatch(setNotify(NOTIFY_CONTANTS.success("Note was updated succesfully.")))
      await thunkApi.dispatch(fetchGetNotesWithFilters())
      thunkApi.dispatch(setLoader(false))

    } catch (error) {
      thunkApi.dispatch(setLoader(false))
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to update notes."))
      );
      throw error;
    }
  }
);


export const fetchDeleteNote = createAsyncThunk(
  "notes/fetchDeleteNote",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoader(true))
      await NoteService.deleteNote(id);
      thunkApi.dispatch(setNotify(NOTIFY_CONTANTS.success("Note was deleted succesfully.")))
      await thunkApi.dispatch(fetchGetNotesWithFilters())
      thunkApi.dispatch(setLoader(false))
    } catch (error) {
      thunkApi.dispatch(setLoader(false))
      thunkApi.dispatch(
        setNotify(NOTIFY_CONTANTS.error("Failed to delete note."))
      );
      throw error;
    }
  }
);

export type IFetchCreateNote = typeof fetchCreateNote;
