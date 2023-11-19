import React, { useState, useEffect } from 'react'

import { TaskProps } from '../../services/todo';

const Task = (props: TaskProps) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const ToggleChecked = () => {
        setIsChecked(!isChecked);
        props.onCheck();
    }

    useEffect(() => {
        setIsChecked(props.done);
    }, [props.done]);

    return (
        <div className={`task checked-${isChecked}`} onClick={ToggleChecked}>
            <input type='checkbox' checked={isChecked} readOnly />
            <span></span>
            <p>{props.text}</p>
        </div>
    )
}
export default Task;