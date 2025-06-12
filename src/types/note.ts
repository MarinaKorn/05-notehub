export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}