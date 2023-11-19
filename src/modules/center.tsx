import React, { useState, useContext } from "react";

import AppContext from "../services/context";

import Pomodoro from "../components/apps/pomodoro";
import Lofi from "../components/apps/lofi";

const Center = () => {

    const context = useContext(AppContext);

    if (context?.center == "pomodoro")
        return (<Pomodoro />);

    if (context?.center == "lofi")
        return (<Lofi />);

    return null;

}
export default Center;