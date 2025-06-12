export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';