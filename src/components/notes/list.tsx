import React, { MouseEventHandler, useEffect } from "react";

import { NoteProps } from '../../services/notes';

import Preview from './preview';

interface IProps {
    open: boolean,
    notes: NoteProps[],
    active: number,
    selectNote: Function,
    createNote: MouseEventHandler<HTMLImageElement>,
    deleteNote: Function,
}
const List = (props: IProps) => {

    const NoteSelected = (idx: number) => {
        props.selectNote(idx);
    }

    if (!props.open)
        return null

    return (
        <div className={`list list-open-${props.open}`}>
            <div className="header box-shadow">
                <h1>My Notes</h1>
                <img src='/img/apps/new.png' onClick={props.createNote} />
            </div>
            {props.notes?.map(function (val: NoteProps, idx: number) {
                return <Preview
                    key={idx}
                    note={val}
                    active={(props.active === idx)}
                    onClick={() => NoteSelected(idx)}
                    deleteNote={() => props.deleteNote(idx)}
                />
            })}
        </div>
    )
}
export default List;