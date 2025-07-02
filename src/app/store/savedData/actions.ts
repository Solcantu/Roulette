import { ISavedData } from '../../helper/interfaces';
import { SET_SAVEDDATA, SET_SAVEDSELECTEDPERK, savedDataActions, SET_SAVEDSELECTEDPERKLIST } from './types';


export function setSavedData (savedData: ISavedData): savedDataActions {

    return {
        type: SET_SAVEDDATA,
        payload: {
            savedData
        }
    }

}

export function setSavedSelectedPerk (perkSelection: boolean, index:number, currentCharacter:'survivor' | 'killer'): savedDataActions {

    return {
        type: SET_SAVEDSELECTEDPERK,
        payload: {
            perkSelection,
            index,
            currentCharacter
        }
    }

}

export function setSavedSelectedPerkList (perkList: boolean[], currentCharacter: 'survivor' | 'killer'): savedDataActions {

    return {
        type: SET_SAVEDSELECTEDPERKLIST,
        payload: {
            perkList,
            currentCharacter
        }
    }

}