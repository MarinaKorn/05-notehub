import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  results: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get<FetchNotesResponse>('', {
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  data: CreateNoteParams
): Promise<Note> => {
  const response = await axiosInstance.post<Note>('', data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/${id}`);
  return response.data;
};
