import React, { useState, useEffect, useContext } from "react";

import AppContext from "../services/context";

interface IProps {
    open: boolean,
    setOpen: Function,
}
const Apps = (props: IProps) => {

    const context = useContext(AppContext);

    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (props.open)
            setShow(true);
        else {
            new Promise(resolve => setTimeout(resolve, 400)).then(() => {
                setShow(false);
            });
        }
    }, [props.open]);

    const HeaderPress = () => {
        props.setOpen(false);
    }

    const OpenApp = (app: string) => {
        if (context?.center === app)
            context?.setCenter("");
        else
            context?.setCenter(app);
    }

    if (!show)
        return null;

    return (
        <div className={`active-app app-open-${props.open} app-list box-shadow`}>
            <div className='header box-shadow'>
                <h1 onClick={HeaderPress}>Apps</h1>
            </div>
            <div className='content'>

                <div className="entry" onClick={() => OpenApp("pomodoro")}>
                    <div className="desc">
                        <h1>Pomodoro</h1>
                        <p>Break work into 25min intervals</p>
                    </div>
                    <button>{context?.center === "pomodoro" ? "Close" : "Open"}</button>
                </div>

                <div className="entry" onClick={() => OpenApp("lofi")}>
                    <div className="desc">
                        <h1>Lofi Beats</h1>
                        <p>Get into some deep work or relax</p>
                    </div>
                    <button>{context?.center === "lofi" ? "Close" : "Open"}</button>
                </div>

            </div>
        </div>
    )
}
export default Apps;