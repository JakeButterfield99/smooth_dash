import React, { useEffect, useState } from "react";

import effectService from "../../services/effect";

const Rain = () => {

    const [drops, setDrops] = useState<number>(50);

    const CreateDrop = (rain: Element, idx: number) => {
        const drop = document.createElement('div');
        drop.setAttribute('id', `drop${idx}`);
        drop.setAttribute('class', 'drop');

        const left = effectService.GetRandomNumber(0, window.innerWidth);
        const delay = (effectService.GetRandomNumber(1, 100) / 100).toString() + 's';

        drop.style.left = `${left}px`;
        drop.style.animationDelay = delay;

        rain.appendChild(drop);
    }

    const StartRain = () => {
        const rain = document.getElementsByClassName('rain')[0];

        for (let i = 1; i < drops; i++) {
            CreateDrop(rain, i);
        }
    }

    useEffect(() => {
        StartRain();
    }, []);

    return (
        <div className="rain"></div>
    )
}
export default Rain;