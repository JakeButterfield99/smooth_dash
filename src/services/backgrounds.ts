const CACHE_BACKGROUND_KEY = 'smooth_dash_background';
export const DEFAULT_BACKGROUND = 'vancouver';
const BASE_URL = "/public/img/background/"

export interface BgOptionProps {
    text: string,
    flag: string,
    active: boolean,
    onPress: Function,
}

export interface BackgroundImages {
    sunrise: string,
    day: string,
    sunset: string,
    night: string
}

interface Background {
    name: string,
    flag: string,
    images: BackgroundImages,
    dark: string[],
}

const backgrounds: { [key: string]: Background } = {
    'vancouver': {
        flag: "🇨🇦",
        name: "Vancouver, BC",
        images: {
            sunrise: "sunrise.jpg", sunset: "sunset.jpg", day: "day.jpg", night: "night.jpg"
        },
        dark: [],
    },
    'london': {
        flag: "🇬🇧",
        name: "London, UK",
        images: {
            sunrise: "sunrise.jpg", sunset: "sunset.jpg", day: "day.jpg", night: "night.webp"
        },
        dark: [],
    },
    'ottawa': {
        flag: "🇨🇦",
        name: "Ottawa, ON",
        images: {
            sunrise: "sunrise.jpg", sunset: "sunset.avif", day: "day.jpg", night: "night.jpg"
        },
        dark: ['day'],
    }
}

const GetBackgrounds = () => {
    return backgrounds;
}

const SavePreferredBackground = (bg: string) => {
    localStorage.setItem(CACHE_BACKGROUND_KEY, bg);
}

const LoadPreferredBackground = () => {
    const bg = localStorage.getItem(CACHE_BACKGROUND_KEY);
    return bg || DEFAULT_BACKGROUND;
}

export default {
    GetBackgrounds,
    SavePreferredBackground,
    LoadPreferredBackground
}