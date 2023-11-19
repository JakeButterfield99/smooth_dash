import React, { useState, useEffect } from "react";

import effectService from "../../services/effect";

const Snow = () => {
    const [drops, setDrops] = useState<number>(100);

    const CreateDrop = (snow: Element, idx: number) => {
        const drop = document.createElement('div');
        drop.setAttribute('id', `drop${idx}`);
        drop.setAttribute('class', 'snow-drop');

        const left = effectService.GetRandomNumber(0, window.innerWidth);
        const delay = (effectService.GetRandomNumber(1, 100) / 50).toString() + 's';

        drop.style.left = `${left}px`;
        drop.style.animationDelay = delay;

        snow.appendChild(drop);
    }

    const StartSnow = () => {
        const snow = document.getElementsByClassName('snow')[0];

        for (let i = 1; i < drops; i++) {
            CreateDrop(snow, i);
        }
    }

    useEffect(() => {
        StartSnow();
    }, []);

    return (
        <div className="snow"></div>
    )
}
export default Snow;