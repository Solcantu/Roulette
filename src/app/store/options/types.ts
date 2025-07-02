import { IOptions } from '../../helper/interfaces';

export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_OBS = 'SET_OBS';
export const SET_DEFAULTCHARACTER = 'SET_DEFAULTCHARACTER';
export const SET_TIMER = 'SET_TIMER';

export interface ISetOptionsAction {

    type: typeof SET_OPTIONS,
    payload: {
        options: IOptions
    }

}

export interface ISetLanguageAction {

    type: typeof SET_LANGUAGE,
    payload: {
        language: 'german' | 'english'
    }

}

export interface ISetOBSAction {

    type: typeof SET_OBS,
    payload: {
        obs: boolean
    }

}

export interface ISetDefaultCharacterAction {

    type: typeof SET_DEFAULTCHARACTER,
    payload: {
        character: 'survivor' | 'killer'
    }

}

export interface ISetTimer {

    type: typeof SET_TIMER,
    payload: {
        timer:  0 | 10 | 20 | 30
    }

}

export type optionsAction = ISetOptionsAction | ISetLanguageAction | ISetOBSAction | ISetDefaultCharacterAction | ISetTimer;