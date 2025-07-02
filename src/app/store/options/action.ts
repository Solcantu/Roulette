import { optionsAction, SET_OPTIONS, SET_LANGUAGE, SET_OBS, SET_DEFAULTCHARACTER, SET_TIMER } from './types';
import { IOptions } from '../../helper/interfaces';

export function setOptions (options: IOptions): optionsAction {
    return {
        type: SET_OPTIONS,
        payload: {
            options
        }
    }

}

export function setLanguage (language: 'german' | 'english'): optionsAction {
    return {
        type: SET_LANGUAGE,
        payload: {
            language
        }
    }

}

export function setOBS (obs: boolean): optionsAction {
    return {
        type: SET_OBS,
        payload: {
            obs
        }
    }

}

export function setDefaultCharacter (character: 'survivor' | 'killer'): optionsAction {
    return {
        type: SET_DEFAULTCHARACTER,
        payload: {
            character
        }
    }

}

export function setTimer (timer: 0 | 10 | 20 | 30): optionsAction {
    return {
        type: SET_TIMER,
        payload: {
            timer
        }
    }

}