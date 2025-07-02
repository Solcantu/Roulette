import { ISavedData } from '../../helper/interfaces';

export const SET_SAVEDDATA = 'SET_SAVEDDATA';
export const SET_SAVEDSELECTEDPERK = 'SET_SAVEDSELECTEDPERK';
export const SET_SAVEDSELECTEDPERKLIST = 'SET_SAVEDSELECTEDPERKLIST';

interface ISetSavedDataAction {

    type: typeof SET_SAVEDDATA,
    payload: {
        savedData: ISavedData
    }

}

interface ISetSavedSelectedPerkListAction {

    type: typeof SET_SAVEDSELECTEDPERKLIST,
    payload: {
        perkList: boolean[],
        currentCharacter: 'survivor' | 'killer'
    }

}

interface ISetSavedSelectedPerkAction {

    type: typeof SET_SAVEDSELECTEDPERK,
    payload: {
        perkSelection: boolean,
        index: number,
        currentCharacter: 'survivor' | 'killer'
    }

}

export type savedDataActions = ISetSavedDataAction | ISetSavedSelectedPerkAction | ISetSavedSelectedPerkListAction