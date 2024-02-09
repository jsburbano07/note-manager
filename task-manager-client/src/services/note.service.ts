// note.service.ts

import { AxiosError } from "axios";
import Axios from "../AxiosCustom";
import { INote } from "../interfaces/note.interface";
import { IFilters } from "../interfaces/filters.interface";


const NoteService = {
  getAllNotes: async (): Promise<INote[]> => {
    try {
      const response = await Axios.get<INote[]>(`/notes`);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },
  getAllNotesWithFilters: async ({
    search,
    filters,
    sort,
    archived,
  }: IFilters): Promise<INote[]> => {
    let queryParams = "";

    if (search) {
      queryParams += `search=${search}&`;
    }

    if (filters) {
      queryParams += `filterBy=${filters}&`;
    }

    if (sort) {
      queryParams += `sortBy=${sort}&`;
    }

    if (archived) {
      queryParams += `archived=${archived}&`;
    }

    queryParams = queryParams.slice(0, -1);

    try {
      const response = await Axios.get<INote[]>(
        `/notes?${queryParams}`
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  getNoteById: async (id: string): Promise<INote> => {
    try {
      const response = await Axios.get<INote>(`/notes/${id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  createNote: async (noteData: INote): Promise<INote> => {
    try {
      const response = await Axios.post<INote>(`/notes`, noteData);
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  updateNote: async (
    id: string,
    noteData: Partial<INote>
  ): Promise<INote> => {
    try {
      const response = await Axios.put<INote>(
        `/notes/${id}`,
        noteData
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  deleteNote: async (id: string): Promise<void> => {
    try {
      await Axios.delete<void>(`/notes/${id}`);
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  },

  getTags: async () => {
    try {
      const {data} = await Axios.get<Array<string>>(`/notes/tags`);
      return data
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }
};

function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    // El servidor respondió con un status code que no está en el rango 2xx
    console.error("Error response from server:", error.response.data);
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió una respuesta
    console.error("No response received from server");
  } else {
    // Algo sucedió en la configuración de la solicitud que generó un error
    console.error("Request configuration error:", error.message);
  }
  throw new Error("Error communicating with the server");
}

export default NoteService;
