import React, { useState, useEffect, useContext } from "react";

import AppContext from "../services/context";
import backgroundsService from "../services/backgrounds";
import BackgroundOption from "./bg/background_option";

interface IProps {
    open: boolean,
    setOpen: Function,
}
const Backgrounds = (props: IProps) => {

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

    const BackgroundPressed = (bg: string) => {
        context?.setCity(bg);
        backgroundsService.SavePreferredBackground(bg);
    }

    if (!show)
        return null;

    const backgrounds = backgroundsService.GetBackgrounds();

    return (
        <div className={`active-app active-app-left app-open-${props.open} background-list box-shadow`}>
            <div className='header box-shadow'>
                <h1 onClick={HeaderPress}>Backgrounds</h1>
            </div>
            <div className='content'>
                {Object.keys(backgrounds).map((val) => {
                    const bg = backgrounds[val];
                    return (
                        <BackgroundOption
                            key={val}
                            text={bg.name}
                            flag={bg.flag}
                            onPress={() => BackgroundPressed(val)}
                            active={context?.city === val}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default Backgrounds;