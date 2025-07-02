import { combineReducers } from 'redux';
import randomNumbersReducer from './random/reducer';

import optionsReducer from './options/reducer';
import savedDataReducer from './savedData/reducer';
import currentDataReducer from './currentData/reducer';

export const combinedReducer = combineReducers({

    data: combineReducers({
        savedData: savedDataReducer,
        currentData: currentDataReducer,
    },),

    randomNumbers: randomNumbersReducer,
    options: optionsReducer

});

export type RootState = ReturnType<typeof combinedReducer>

/*
killer: killerReducer,
    survivor: survivorReducer,

    selectedKiller: selectedKillerReducer,
    selectedSurvivor: selectedSurvivorReducer,

    killerPerks: killerPerkReducer,
    survivorPerks: survivorDataReducer,

    selectedKillerPerks: selectedKillerPerkReducer,
    selectedSurvivorPerks: selectedSurvivorPerkReducer,

    isKillerSelected: isKillerSelectedReducer,

*/
