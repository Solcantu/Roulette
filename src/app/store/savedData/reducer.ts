import { ISavedData } from '../../helper/interfaces';
import { SET_SAVEDDATA, SET_SAVEDSELECTEDPERK, savedDataActions, SET_SAVEDSELECTEDPERKLIST } from './types';
import { getCharacterJSON, getPerkJSON } from '../../helper/helper';

const selectedKiller: boolean[] = new Array(getCharacterJSON('killer').length).fill(true);
const selectedSurvivor: boolean[] = new Array(getCharacterJSON('survivor').length).fill(true);
const selectedKillerPerks: boolean[] = new Array(getPerkJSON('killer').length).fill(true);
const selectedSurvivorPerks: boolean[] = new Array(getPerkJSON('survivor').length).fill(true);

const savedDataState: ISavedData = {
    Character: {
        killer: getCharacterJSON('killer'),
        survivor: getCharacterJSON('survivor')
    },
    SelectedCharacter: {
        killer: selectedKiller,
        survivor: selectedSurvivor
    },
    Perks: {
        killer: getPerkJSON('killer'),
        survivor: getPerkJSON('survivor')
    },
    SelectedPerks: {
        killer: selectedKillerPerks,
        survivor: selectedSurvivorPerks
    }
};

const savedDataReducer = (state = savedDataState, action: savedDataActions) => {

    let newState: ISavedData = Object.assign({}, state);

    switch (action.type) {

        case SET_SAVEDDATA:

            newState = action.payload.savedData
        return newState;

        case SET_SAVEDSELECTEDPERK:
            newState.SelectedPerks[action.payload.currentCharacter][action.payload.index] = action.payload.perkSelection;
        return newState;

        case SET_SAVEDSELECTEDPERKLIST:

            newState.SelectedPerks[action.payload.currentCharacter] = action.payload.perkList

        return newState;

        default:
        return state;
    }

}

export default savedDataReducer;