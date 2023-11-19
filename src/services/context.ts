import React from "react";
import { EffectInterface } from "../services/effect";

import { BackgroundData } from './weather';

export interface AppContextInterface {
    background: BackgroundData,
    center: string,
    dark: boolean,
    effect: EffectInterface,
    title: string,
    city: string,

    setBackground: Function,
    setCenter: Function,
    setEffect: Function,
    setTitle: Function,
    setCity: Function,
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export default AppContext;