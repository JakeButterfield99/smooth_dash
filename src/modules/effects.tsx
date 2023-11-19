import React, { useState, useContext, useEffect } from "react";
import AppContext from "../services/context";

import Rain from "../components/effects/rain";
import Snow from "../components/effects/snow";

const Effects = () => {

    const context = useContext(AppContext);

    if (!context?.effect.active) return null;

    const effect = context?.background.weather;

    if (effect === "rain")
        return (<Rain />);

    if (effect === "snow")
        return (<Snow />);

    return null;
}
export default Effects;