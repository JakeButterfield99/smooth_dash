import React, { useState, useEffect, useContext } from 'react';

import weatherService, { WeatherData, FutureData, BackgroundData } from '../services/weather';
import AppContext from "../services/context";

const Weather = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [stage, setStage] = useState<string>("day");
    const [weather, setWeather] = useState<WeatherData>();

    const context = useContext(AppContext);

    const ApplyWeatherData = (data: any) => {
        const stage = weatherService.GetStage(data.sunrise, data.sunset);
        setStage(stage);
        setWeather(data);

        const back: BackgroundData = {
            time: stage,
            weather: data.status,
        }
        context?.setBackground(back);

        setLoading(false);
    }

    const GetWeather = () => {
        // Load cached data
        const cache_data = weatherService.GetCacheData();
        if (cache_data)
            ApplyWeatherData(cache_data);

        // Load updated data
        weatherService.GetData().then((res) => {
            const data = weatherService.ProcessData(res.data);
            ApplyWeatherData(data);
        });
    }

    useEffect(() => {
        GetWeather();
    }, [])

    if (loading)
        return null;

    return (
        <div className={`weather ${context?.dark ? 'dark' : ''}`}>

            <div className='top'>
                {['day', 'night'].includes(stage) ?
                    <img src={`/img/weather/${stage}/${weather?.status}.png`} />
                    :
                    <img src={`/img/weather/${stage}.png`} />
                }
                <div className='wrapper'>
                    <h1 className='text-shadow'>
                        {weather?.temp}
                        <span style={{ fontSize: '25px' }} className='degrees'>o</span>
                    </h1>
                    <div className='container'>
                        <div>
                            {['sunset', 'night'].includes(stage) ?
                                <img src={`/img/weather/night/down.png`} />
                                :
                                <img src={`/img/weather/day/down.png`} />
                            }
                            <p>
                                {weather?.sunset
                                    .getHours().toString().padStart(2, '0')
                                }
                                :
                                {weather?.sunset
                                    .getMinutes().toString().padStart(2, '0')
                                }
                            </p>
                        </div>
                        <div>
                            <p>
                                {weather?.future.at(1)?.sunrise
                                    ?.getHours().toString().padStart(2, '0')
                                }
                                :
                                {weather?.future.at(1)?.sunrise
                                    ?.getHours().toString().padStart(2, '0')
                                }
                            </p>
                            {['sunrise', 'day'].includes(stage) ?
                                <img src={`/img/weather/day/up.png`} />
                                :
                                <img src={`/img/weather/night/up.png`} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>

                {weather?.future.map((val: FutureData, i: number) =>
                    <div className='future' key={i}>
                        <h2>
                            {val.date.toLocaleString('en-us', { weekday: 'short' })}
                        </h2>

                        {["clear", "drizzle", "partly_cloudy"].includes(val.status) ?
                            <img src={`/img/weather/alt/${val.status}.png`} />
                            :
                            <img src={`/img/weather/day/${val.status}.png`} />
                        }

                        <h1>
                            {val.temp}
                            <span style={{ fontSize: '10px' }} className='degrees'>o</span>
                        </h1>
                    </div>
                )}

            </div>
        </div>
    )

}

export default Weather;