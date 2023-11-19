import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../services/context";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IterationProps {
    title: string,
    time: number,
}

const IterationStatus: IterationProps[] = [
    { title: "Deep Work", time: 25 },
    { title: "Good job, take a break", time: 5 },
    { title: "Deep Work", time: 25 },
    { title: "You're doing great! Rest for a few", time: 5 },
    { title: "Deep Work", time: 25 },
    { title: "All done! Good Job 👍", time: 0 },
]


const Pomodoro = () => {

    const context = useContext(AppContext);

    const [seconds, setSeconds] = useState<number>(IterationStatus[0].time * 60);
    const [start, setStart] = useState<boolean>(false);
    const [iteration, setIteration] = useState<number>(0);

    const title = IterationStatus[iteration].title;
    const maxSeconds = IterationStatus[iteration].time * 60;

    const audio = new Audio('/sound/alarm.mp3');

    let refresh = false;

    const FormatText = () => {
        var m = Math.floor(seconds / 60);
        var s = seconds - m * 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }

    const RefreshTimer = () => {
        refresh = true;
        setStart(false);
        setSeconds(maxSeconds);
    }

    const TimerDone = () => {
        setStart(false);
        audio.play();

        setTimeout(() => {
            const it = iteration + 1;

            if (IterationStatus[it])
                if (IterationStatus[it].time != 0) {
                    setSeconds(IterationStatus[it].time * 60);
                    setStart(true);
                }


            setIteration(it);

        }, 1000);
    }

    const TickTimer = () => {
        if (!start) return;

        if (seconds == 1) {
            setTimeout(() => {
                TimerDone();
            }, 1000);
        }

        if (refresh)
            refresh = false;
        else
            setSeconds(seconds - 1);
    }

    useEffect(() => {
        if (!start) return;
        seconds > 0 && setTimeout(() => TickTimer(), 1000);
    }, [seconds]);

    useEffect(() => {
        if (!start) return;
        if (seconds == 0) {
            if (iteration == (IterationStatus.length - 1)) {
                setStart(true);
                setSeconds(IterationStatus[0].time * 60);
                setIteration(0);
            }
            else {
                setStart(false);
            }
        }
        else {
            setSeconds(seconds - 1);
        }
    }, [start]);

    const stop_icon = "/img/apps/night/stop.png";
    const play_icon = "/img/apps/night/play.png";
    const refresh_icon = "/img/apps/night/refresh.png";

    return (
        <div className={`center pomodoro`}>
            <h1>{title}</h1>
            <CircularProgressbar
                value={seconds}
                maxValue={maxSeconds}
                text={FormatText()}
            />
            <div className="buttons">
                <button onClick={() => { setStart(!start) }}>
                    {start ?
                        <img src={stop_icon} />
                        : <img src={play_icon} />
                    }
                </button>
                <button onClick={RefreshTimer}>
                    <img src={refresh_icon} />
                </button>
            </div>

        </div>
    )

}
export default Pomodoro;