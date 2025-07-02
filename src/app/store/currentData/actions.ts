import { ICurrentData, IPerkArr } from '../../helper/interfaces';
import { SET_CURRENTDATA, currentDataAction, SET_CURRENTSELECTEDPERKS, SET_CURRENTCHARACTER } from './types';

export function setCurrentData (currentData: ICurrentData): currentDataAction {

    return {
        type: SET_CURRENTDATA,
        payload: {
            currentData
        }
    }

}

export function setCurrentSelectedPerks (perkArray: IPerkArr): currentDataAction {

    return {
        type: SET_CURRENTSELECTEDPERKS,
        payload: {
            perkArray
        }
    }

}

export function setCurrentCharacter (character: 'survivor' | 'killer'): currentDataAction {

    return {
        type: SET_CURRENTCHARACTER,
        payload: {
            currentCharacter: character
        }
    }

}