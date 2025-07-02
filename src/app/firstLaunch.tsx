import { useEffect } from 'react';
import { setRandomPerks, setRandomCharacter } from './store/random/action';
import { socket } from '..';
import { useDispatch } from 'react-redux';

import { ISavedData, ICurrentData, IRandomNumbers } from './helper/interfaces';
import { setSavedData } from './store/savedData/actions';
import { setCurrentData } from './store/currentData/actions';

export function useFirstLaunch() {

    const dispatch = useDispatch();
    useEffect(() => {

        // Set Default Parameters at Launch
        // dispatch(setLanguage('german'));
    })

    // Instantiate Socket io connection

    useEffect(() => {

        socket.on('syncData', (randomNumbers: IRandomNumbers, savedData: ISavedData, currentData: ICurrentData) => {

            console.log('Sync Data');
            if (randomNumbers.randomCharacter !== null && randomNumbers.randomCharacter !== undefined) {
                dispatch(setRandomCharacter(randomNumbers.randomCharacter));
            }

            if (randomNumbers.randomPerks !== null && randomNumbers.randomPerks !== undefined) {
                dispatch(setRandomPerks(randomNumbers.randomPerks));
            }

            if (savedData.Character.killer !== null && savedData.Perks.survivor !== null && savedData.Character.killer !== undefined && savedData.Perks.survivor !== undefined) {
                dispatch(setSavedData(savedData));
                dispatch(setCurrentData(currentData));
            }
        })

        socket.on('getSavedData', (savedData: any) => {

            dispatch(setSavedData(savedData));

        });

        socket.on('getCurrentData', (currentData: ICurrentData) => {

            dispatch(setCurrentData(currentData));

        });

        socket.on('getRandomNumbers', (randomNumbers: IRandomNumbers) => {

            console.log(randomNumbers);
            dispatch(setRandomPerks(randomNumbers.randomPerks));

        });
    });

    return ('');
}