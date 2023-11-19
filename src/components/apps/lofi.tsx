import React, { useState, useRef, useContext, useEffect } from "react";
import AppContext from "../../services/context";

interface Video {
    id: string,
    name: string,
    author: string,
}

const Videos: Video[] = [
    { id: "FSIfaM5cCns", name: "Japanese Lofi Music #14", author: "Stomp's Playlist" },
    { id: "J4Fcf1y7ryU", name: "Aesthetic Lofi Mix 2022", author: "Stomp's Playlist" },
    { id: "NH0rWI0iCqU", name: "Chill Lofi Listening", author: "Envato Tuts+" },
    { id: "pLcw3dK1yU0", name: "Lofi Hiphop Mix 2022", author: "Stomp's Playlist" },
]

const Commands: { [name: string]: string } = {
    'play': '{"event":"command","func":"' + 'playVideo' + '","args":""}',
    'pause': '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
}

const Lofi = () => {

    const context = useContext(AppContext);
    const iframe = useRef<HTMLIFrameElement>(null);

    const [play, setPlay] = useState<boolean>(false);
    const [video, setVideo] = useState<Video>();

    useEffect(() => {
        RandomVideo();
    }, [])

    const SendCommand = (type: string) => {
        iframe?.current?.contentWindow?.postMessage(Commands[type], '*');
    }

    const PlayVideo = () => {
        SendCommand('play');
        setPlay(true);
    }

    const PauseVideo = () => {
        SendCommand('pause');
        setPlay(false);
    }

    const RefreshVideo = () => {
        RandomVideo();
        setPlay(false);
    }

    const RandomVideo = () => {
        let vid;
        do {
            vid = Videos[Math.floor(Math.random() * Videos.length)];
        }
        while (video === vid);

        setVideo(vid);
    }

    const stop_icon = "/img/apps/night/stop.png";
    const play_icon = "/img/apps/night/play.png";
    const refresh_icon = "/img/apps/night/refresh.png";

    if (video === undefined)
        return null;

    return (
        <div className={`center lofi ${context?.dark ? 'dark' : null}`}>
            <iframe
                ref={iframe}
                className="youtube-video"
                src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&version=3&playerapiid=ytplayer`}
            />

            <h1 className="text-shadow">{video.name}</h1>
            <a href={`https://www.youtube.com/watch?v=${video?.id}`} target="_blank">
                <h2 className="text-shadow">By: {video.author}</h2>
            </a>


            <div className="buttons">

                {play ?
                    <div className="button" onClick={PauseVideo}>
                        <img src={stop_icon} />
                    </div>
                    :
                    <div className="button" onClick={PlayVideo}>
                        <img src={play_icon} />
                    </div>
                }

                <div className="button" onClick={RefreshVideo}>
                    <img src={refresh_icon} />
                </div>

            </div>

        </div>
    );
}
export default Lofi;