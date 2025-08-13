import axios from "axios";
import { Note, NoteId } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NoteHttpRespond {
    notes: Note[],
    total_pages: number,
}

export interface CreateNewNote {
    title: string,
    content: string,
    tag: string,
}

export const fetchNotes = async (searchQuery: string, currentPage: number): Promise<NoteHttpRespond> => {
    const response = await axios.get<NoteHttpRespond>(
        "https://notehub-public.goit.study/api/notes",
        {
            params: {
                search: searchQuery,
                page: currentPage,
                perPage: 12
            },
            headers: {
                Authorization: `Bearer ${myKey}`,
            },
        }
    );
    return response.data;
}

export const deleteNote = async (noteId: NoteId) => {
    const response = await axios.delete<Note[]>(
        `https://notehub-public.goit.study/api/notes/${noteId}`,
        {headers: {
            Authorization: `Bearer ${myKey}`,
        }}
    );
    return response.data;
}

export const createNote = async (newTask: CreateNewNote) => {
    const res = await axios.post<Note[]>("https://notehub-public.goit.study/api/notes/",
        newTask,
        {headers: {
            Authorization: `Bearer ${myKey}`,
        }}
    );
  return res.data;
};
