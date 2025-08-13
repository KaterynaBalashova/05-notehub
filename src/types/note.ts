export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    tag: string
};

export type NoteId = Note["id"];