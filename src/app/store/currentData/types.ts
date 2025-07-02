import { ICurrentData, IPerkArr } from '../../helper/interfaces';

export const SET_CURRENTDATA = 'SET_CURRENTDATA';
export const SET_CURRENTCHARACTER = 'SET_CURRENTCHARACTER';
export const SET_CURRENTSELECTEDPERKS = 'SET_CURRENTSELECTEDPERKS';

export interface ISetCurrentDataAction {

    type: typeof SET_CURRENTDATA,
    payload: {
        currentData: ICurrentData
    }

}

export interface ISetCurrentCharacterAction {

    type: typeof SET_CURRENTCHARACTER,
    payload: {
        currentCharacter: 'survivor' | 'killer'
    }

}

export interface ISetCurrentSelectedPerkAction {

    type: typeof SET_CURRENTSELECTEDPERKS,
    payload: {
        perkArray: IPerkArr
    }

}

export type currentDataAction = ISetCurrentDataAction | ISetCurrentSelectedPerkAction | ISetCurrentCharacterAction;