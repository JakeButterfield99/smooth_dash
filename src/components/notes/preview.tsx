import { MouseEventHandler } from "react";

import { NoteProps } from '../../services/notes';

interface IProps {
    note: NoteProps,
    active: boolean,
    onClick: MouseEventHandler<HTMLDivElement>,
    deleteNote: MouseEventHandler<HTMLImageElement>,
}
const Preview = (props: IProps) => {

    return (
        <div className={"preview " + (props.active ? 'active' : '')}>
            <div className="content" onClick={props.onClick}>
                <h1>{props.note.title.trim() != '' ?
                    props.note.title
                    : 'New Note'}
                </h1>
                <p>{props.note.content.trim() != '' ?
                    props.note.content
                    : ''}
                </p>
            </div>
            <img src='/img/apps/delete.png' onClick={props.deleteNote} />
        </div>
    )
}
export default Preview;