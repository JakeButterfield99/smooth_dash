import React, { useState, useEffect } from 'react';

import Task from './todo/task';

import todoService, { TaskProps } from '../services/todo';

interface IProps {
    open: boolean,
    setOpen: Function,
}
const ToDo = (props: IProps) => {

    const [show, setShow] = useState<boolean>(false);
    const [list, setList] = useState<TaskProps[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        if (props.open)
            setShow(true);
        else {
            new Promise(resolve => setTimeout(resolve, 400)).then(() => {
                setShow(false);
            });
        }
    }, [props.open])

    useEffect(() => {
        setList(todoService.LoadList());
        setLoaded(true);
    }, [])

    useEffect(() => {
        if (loaded)
            todoService.SaveList(list);
    }, [list]);

    const HandleKeyPress = (e: any) => {
        if (e.key == "Enter") {
            if (input != "") {
                NewTask(input);
                setInput("");
            }
        }
    }

    const NewTask = (content: string) => {
        const task: TaskProps = {
            text: content,
            done: false,
            onCheck: () => { },
        }
        setList([...list, task]);
    }

    const ClearList = () => {
        setList([]);
    }

    const PurgeList = () => {
        let filter = list.filter(val => val.done === false);
        setList(filter);
    }

    const TaskChecked = (idx: number) => {
        let l = [...list];
        l[idx].done = !l[idx].done;
        setList(l);
    }

    const HeaderPress = () => {
        props.setOpen(false);
    }

    if (!show)
        return null

    return (
        <div className={`active-app app-open-${props.open} todo box-shadow`}>
            <div className='header box-shadow'>
                <img src='/img/apps/delete.png' onClick={ClearList} />
                <h1 onClick={HeaderPress}>To Do</h1>
                <img src='/img/apps/clear.png' onClick={PurgeList} />
            </div>
            <div className='content'>
                {list?.map((val: TaskProps, i: number) =>
                    <Task
                        key={i}
                        done={val.done}
                        text={val.text}
                        onCheck={() => TaskChecked(i)}
                    />
                )}
            </div>
            <div className='input'>
                <input
                    value={input}
                    className='input box-shadow'
                    type='text'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={HandleKeyPress}
                    placeholder='+ New Task'
                />
            </div>

        </div>
    )

}
export default ToDo;