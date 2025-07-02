import { randomAction, SET_RANDOMPERKS, SET_RANDOMCHARACTER, SET_OLDRANDOMPERKS } from './types'

export function setRandomPerks (randomPerks: number[]): randomAction {

    return {
        type: SET_RANDOMPERKS,
        payload: {
            randomPerks
        }
    }

}

export function setOldRandomPerks (oldRandomPerk: number[]): randomAction {

    return {
        type: SET_OLDRANDOMPERKS,
        payload: {
            oldRandomPerk
        }
    }

}

export function setRandomCharacter (randomCharacter: number): randomAction {

    return {
        type: SET_RANDOMCHARACTER,
        payload: {
            randomCharacter
        }
    }

}