import { optionsAction, SET_OPTIONS, SET_LANGUAGE, SET_OBS, SET_DEFAULTCHARACTER, SET_TIMER } from './types';
import { IOptions } from '../../helper/interfaces';

const killerDataState: IOptions = {
    obs: false,
    language: 'german',
    displayTime: 10,
    defaultCharacter: 'killer'
};

const optionsReducer = (state = killerDataState, action: optionsAction) => {

    let newState: IOptions = Object.assign({}, state);

    switch (action.type) {

        case SET_OPTIONS:
            newState = action.payload.options;
        return newState;

        case SET_LANGUAGE:
            newState.language = action.payload.language;
        return newState;

        case SET_OBS:
            newState.obs = action.payload.obs;
        return newState;

        case SET_DEFAULTCHARACTER:
            newState.defaultCharacter = action.payload.character;
        return newState;

        case SET_TIMER:
            newState.displayTime = action.payload.timer;
        return newState;

        default:
        return state;
    }

}

export default optionsReducer;