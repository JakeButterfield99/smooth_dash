import axios from 'axios';

import { BackgroundImages } from './backgrounds';

const CACHE_DATA_KEY = "smooth_dash_weather"

const WMOCodes = {
    "clear": [0, 1],
    "partly_cloudy": [2],
    "cloudy": [3],
    "fog": [45, 48],
    "drizzle": [51, 53, 55, 56, 57],
    "rain": [61, 63, 65, 66, 67],
    "snow": [71, 73, 75, 77, 85, 86],
    "rain_showers": [80, 81, 82],
    "thunderstorm": [95, 96, 99],
}

export interface BackgroundData {
    time: keyof BackgroundImages,
    weather: string,
}
export const DefaultBackground: BackgroundData = {
    time: "day",
    weather: "clear",
}

const GetLocation = async (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function (pos: GeolocationPosition) {
            resolve(pos.coords);
        });
    });
}

async function GetData() {
    const coords: GeolocationCoordinates = await GetLocation();
    let lat = coords.latitude;
    let long = coords.longitude;

    const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toString()}&longitude=${long.toString()}&hourly=temperature_2m,weathercode&daily=sunrise,sunset&timezone=America%2FLos_Angeles`;

    return axios.get(api);
}

function FormatDate(dt: Date) {
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const date = dt.getDate().toString().padStart(2, '0');
    const hour = dt.getHours().toString().padStart(2, '0');
    const min = dt.getMinutes().toString().padStart(2, '0');

    const string = `${year}-${month}-${date}T${hour}:${min}`;

    return string;
}

function GetClosestDateTime() {
    let dt = new Date;
    dt.setMinutes(dt.getMinutes() + 30);
    dt.setMinutes(0, 0, 0);

    dt = new Date(dt.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));

    return FormatDate(dt);
}

function FindTime(times: string[], date: string = GetClosestDateTime()) {
    for (let i = 0; i < times.length; i++) {
        if (times[i] == date) {
            return i;
        }
    }
    return 0;
}

function FindCode(codes: number[], idx: number) {
    return codes[idx];
}

function FindStatus(key: number) {
    const code = Object.keys(WMOCodes).find(
        (k: string) => WMOCodes[k as keyof typeof WMOCodes].includes(key)
    );
    return code || "a";
}

export interface FutureData {
    date: Date,
    temp: number,
    status: string,
    sunrise: Date,
}
export interface WeatherData {
    sunrise: Date,
    sunset: Date,
    status: string,
    temp: number,
    future: FutureData[],
}
function ProcessData(data: any): WeatherData {
    const daily = data.daily;
    const hourly = data.hourly;
    const key = FindTime(hourly.time);
    const weather = FindCode(hourly.weathercode, key);

    const future: FutureData[] = [];

    for (let i = 1; i < 6; i++) {
        const d = new Date;
        d.setDate(d.getDate() + i);
        d.setHours(12);
        d.setMinutes(0);
        const format = FormatDate(d);
        const k = FindTime(hourly.time, format);
        const w = FindCode(hourly.weathercode, k);

        const fut: FutureData = {
            date: d,
            temp: Math.round(hourly.temperature_2m[k]),
            status: FindStatus(w),
            sunrise: new Date(daily.sunrise[i]),
        }
        future.push(fut);
    }

    const processed: WeatherData = {
        sunrise: new Date(daily.sunrise[0]),
        sunset: new Date(daily.sunset[0]),
        status: FindStatus(weather),
        temp: Math.round(hourly.temperature_2m[key]),
        future: future,
    }

    SaveCacheData(processed);

    return processed;
}

function GetStage(sunrise: Date, sunset: Date) {
    const now = new Date;

    const bSunrise = new Date(sunrise.getTime() - 20 * 60000);
    const aSunrise = new Date(sunrise.getTime() + 20 * 60000);
    const bSunset = new Date(sunset.getTime() - 20 * 60000);
    const aSunset = new Date(sunset.getTime() + 20 * 60000);

    if (now >= bSunrise && now <= aSunrise) {
        return 'sunrise';
    }
    else if (now >= bSunset && now <= aSunset) {
        return 'sunset';
    }
    else if (now < bSunrise || now > aSunset) {
        return 'night';
    }
    else {
        return 'day';
    }
}

function ReviveDateTime(key: any, value: any) {
    const reDateDetect = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    if (typeof value == 'string' && (reDateDetect.exec(value))) {
        return new Date(value);
    }
    return value;
}

function GetCacheData() {
    const data = localStorage.getItem(CACHE_DATA_KEY);
    if (!data) return false;
    return JSON.parse(data, ReviveDateTime);
}

function SaveCacheData(data: WeatherData) {
    const json = JSON.stringify(data);
    localStorage.setItem(CACHE_DATA_KEY, json);
}

export default {
    GetData,
    GetClosestDateTime,
    ProcessData,
    GetStage,
    GetCacheData
}