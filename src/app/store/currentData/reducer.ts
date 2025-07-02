import { ICurrentData } from '../../helper/interfaces';
import { SET_CURRENTDATA, currentDataAction, SET_CURRENTSELECTEDPERKS, SET_CURRENTCHARACTER } from './types';
import { getPerkJSON, getCharacterJSON } from '../../helper/helper';

const currentDataState: ICurrentData = {
    CurrentCharacter: 'killer',
    SelectedCharacter: getCharacterJSON('killer'),
    SelectedPerks: getPerkJSON('killer')
};

const currentDataReducer = (state = currentDataState, action: currentDataAction) => {

    let newState: ICurrentData = Object.assign({}, state);

    switch (action.type) {

        case SET_CURRENTDATA:
            newState = action.payload.currentData
        return newState;

        case SET_CURRENTSELECTEDPERKS:
            newState.SelectedPerks = action.payload.perkArray
        return newState;

        case SET_CURRENTCHARACTER:
            newState.CurrentCharacter = action.payload.currentCharacter
        return newState;

        default:
        return state;
    }

}

export default currentDataReducer;