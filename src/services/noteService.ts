import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },

});
export const fetchNotes = async (
  page: number,
  search: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await instance.get("/", {
    params: {
      page,
      perPage: 12,
      ...(search !== "" && { search: search }),
    },
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt'>
): Promise<Note> => {
  const response = await instance.post('/', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await instance.delete(`/${id}`);
  return response.data;
};