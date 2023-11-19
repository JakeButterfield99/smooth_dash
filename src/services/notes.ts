export interface NoteProps {
    title: string,
    content: string,
    created: Date,
}

const SaveNotes = (notes: NoteProps[], active: number) => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("active_note", active.toString());
}

const LoadNotes = () => {
    const notes = localStorage.getItem("notes") || "[]";

    try {
        return JSON.parse(notes);
    }
    catch (error: any) {
        console.log('notes error', error);
        return [];
    }
}

const LoadActiveNote = () => {
    const load = localStorage.getItem("active_note") || "-1";
    return parseInt(load);
}

export default {
    LoadNotes,
    SaveNotes,
    LoadActiveNote,
}