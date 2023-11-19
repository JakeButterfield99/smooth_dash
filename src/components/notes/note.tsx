import React from "react";

import noteService, { NoteProps } from '../../services/notes';

interface IProps {
    note: NoteProps,
    setNote: Function,
}
const Note = (props: IProps) => {

    const TitleChanged = (e: any) => {
        const t = e.target.value;
        const n = Object.assign({}, props.note);
        n.title = t;
        props.setNote(n);
    }

    const ContentChanged = (e: any) => {
        const n = Object.assign({}, props.note);
        n.content = e.target.value;
        props.setNote(n);
    }

    return (
        <div className="note">
            <input
                className="title"
                placeholder="Title.."
                value={props.note.title}
                onChange={TitleChanged}
            />
            <textarea
                className="text"
                placeholder="Note here.."
                value={props.note.content}
                onChange={ContentChanged}
            />
        </div>
    )
}
export default Note;