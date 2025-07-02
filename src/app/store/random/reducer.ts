import { randomAction, SET_RANDOMPERKS, SET_RANDOMCHARACTER, SET_OLDRANDOMPERKS } from './types';
import { IRandomNumbers } from '../../helper/interfaces';


const randomNumbersState: IRandomNumbers = {
    oldRandomPerks: [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]
    ],
    randomPerks: [-1, -1, -1, -1],
    randomCharacter: -1,
};

const randomNumbersReducer = (state = randomNumbersState, action: randomAction) => {

    const newState: IRandomNumbers = Object.assign({}, state);

    switch (action.type) {

        case SET_RANDOMPERKS:
            newState.randomPerks = action.payload.randomPerks
        return newState;

        case SET_OLDRANDOMPERKS:

            newState.oldRandomPerks[2] = newState.oldRandomPerks[1];
            newState.oldRandomPerks[1] = newState.oldRandomPerks[0];
            newState.oldRandomPerks[0] = action.payload.oldRandomPerk;

        return newState;

        case SET_RANDOMCHARACTER:
            newState.randomCharacter = action.payload.randomCharacter
        return newState;

        default:
        return state;
    }

}

export default randomNumbersReducer;