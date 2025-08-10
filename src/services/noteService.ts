import axios from "axios";
import { Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NoteHttpRespond {
    result: Note[],
}