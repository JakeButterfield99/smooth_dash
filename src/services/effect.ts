export interface EffectInterface {
    active: boolean,
    mute: boolean,
}

export const DefaultEffect: EffectInterface = {
    active: true,
    mute: false,
}

export const ActiveEffects = [
    'rain'
]

const GetRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export default {
    GetRandomNumber
}