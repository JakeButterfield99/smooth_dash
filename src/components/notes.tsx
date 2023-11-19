import React, { useState, useEffect } from 'react';

import noteService, { NoteProps } from '../services/notes';

import Note from './notes/note';
import List from './notes/list';

interface IProps {
    open: boolean,
    setOpen: Function,
}
const Notes = (props: IProps) => {

    const [show, setShow] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [list, setList] = useState<boolean>(false);

    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [active, setActive] = useState<number>(0);
    const [activeNote, setActiveNote] = useState<NoteProps>();

    useEffect(() => {
        if (props.open)
            setShow(true);
        else {
            new Promise(resolve => setTimeout(resolve, 500)).then(() => {
                setShow(false);
            });
        }
    }, [props.open])

    useEffect(() => {
        const a = noteService.LoadActiveNote();
        setActive(a);

        const n = noteService.LoadNotes();
        setNotes(n);

        if (a in n)
            setActiveNote(n[a]);
        else
            setList(true);

        setLoaded(true);

        if (a == -1)
            setList(true);
    }, []);

    useEffect(() => {
        if (loaded)
            noteService.SaveNotes(notes, active);
    }, [notes]);

    const OpenList = () => {
        setList(true);
    }

    const SelectNote = (idx: number) => {
        if (idx in notes) {
            setActive(idx);
            setActiveNote(notes[idx]);
            setList(false);
        }
    }

    const CreateNote = () => {
        const note: NoteProps = {
            title: "",
            content: "",
            created: new Date,
        }
        setNotes([...notes, note]);
        setActive(notes.length);
        setActiveNote(note);
        setList(false);
    }

    const EditNote = (note: NoteProps) => {
        let n = [...notes];
        n[active] = note;

        console.log('edit', active, note);

        setNotes(n);
        setActiveNote(note);
    }

    const DeleteNote = (idx: number) => {
        let n = notes.filter((_, index) => index != idx);
        setNotes(n);

        if (active == idx) {
            setActive(0);
            setActiveNote(undefined);
        }
        setList(true);
    }

    const HeaderPress = () => {
        props.setOpen(false);
    }

    if (show)
        return (
            <div className={`active-app app-open-${props.open} notes`}>

                <List
                    open={list}
                    notes={notes}
                    active={active}
                    selectNote={SelectNote}
                    createNote={CreateNote}
                    deleteNote={DeleteNote}
                />

                <div className='header box-shadow'>
                    <img src='/img/apps/menu.png' onClick={OpenList} />
                    <h1 onClick={HeaderPress}>Notes</h1>
                    <img src='/img/apps/new.png' onClick={CreateNote} />
                </div>

                <div className='content'>
                    {activeNote !== undefined ?
                        <Note note={activeNote} setNote={EditNote} />
                        :
                        null
                    }
                </div>

                <div className='admin'>
                    <img src='/img/apps/delete.png' onClick={() => { DeleteNote(active) }} />
                </div>
            </div>
        )
    else
        return null

}
export default Notes;