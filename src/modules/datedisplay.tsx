import React, { useState, useEffect, useContext } from 'react';

import AppContext from "../services/context";

const DateDisplay = () => {

    const context = useContext(AppContext);

    const [now, setNow] = useState<Date>(new Date);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    const hours = now?.getHours().toString().padStart(2, '0');
    const mins = now?.getMinutes().toString().padStart(2, '0');

    const day = now?.toLocaleString('en-us', { weekday: 'short' });
    const month = now?.toLocaleString('en-us', { month: 'short' });

    return (
        <div className={`date text-shadow`}>
            <h1>{`${hours}:${mins}`}</h1>
            <h2>{`${day} ${now?.getDate()} ${month}`}</h2>
        </div >
    )

}
export default DateDisplay;