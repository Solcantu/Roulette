export const SET_RANDOMPERKS = 'SET_RANDOMPERKS';
export const SET_OLDRANDOMPERKS = 'SET_OLDRANDOMPERKS';
export const SET_RANDOMCHARACTER = 'SET_RANDOMCHARACTER';

export interface ISetRandomPerksAction {

    type: typeof SET_RANDOMPERKS,
    payload: {
        randomPerks: number[]
    }

}

export interface ISetOldRandomPerksAction {

    type: typeof SET_OLDRANDOMPERKS,
    payload: {
        oldRandomPerk: number[]
    }

}

export interface ISetRandomCharacterAction {

    type: typeof SET_RANDOMCHARACTER,
    payload: {
        randomCharacter: number
    }

}


export type randomAction = ISetRandomPerksAction | ISetOldRandomPerksAction | ISetRandomCharacterAction;