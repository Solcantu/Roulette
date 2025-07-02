import React, { useState, useEffect } from 'react';
import { socket } from '../../..';
import { useDispatch, connect } from 'react-redux';
import { setRandomPerks, setRandomCharacter } from '../../store/random/action';
import { setCurrentCharacter, setCurrentSelectedPerks } from '../../store/currentData/actions';
import { getSelectedPerkList } from '../../helper/helper';
import { RootState } from '../../store/combineReducer';
import { IRandomNumbers, ISavedData, ICurrentData } from '../../helper/interfaces';
import { buttonIMGs } from '../../helper/iconObject';

interface IPropsFromStore {
    randomNumbers: IRandomNumbers;
    savedData: ISavedData;
    currentData: ICurrentData;
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    randomNumbers: state.randomNumbers,
    savedData: state.data.savedData,
    currentData: state.data.currentData

})

function SelectMode(props: IPropsFromStore) {

    const dispath = useDispatch();

    const [characterBool, setCharacterBool] = useState(true);

    useEffect(() => {
        if (props.currentData.CurrentCharacter === 'killer') {
            setCharacterBool(true);
        } else {
            setCharacterBool(false);
        }
    }, [props.currentData.CurrentCharacter])

    return (
        <div className='select-container'>
            <div className={ characterBool ? 'button-select active' : 'button-select' } onClick={ () => onModeClick('killer') }>
                <img src={ characterBool ? buttonIMGs.mode_killer_active : buttonIMGs.mode_killer} alt='ProfilePicture'></img>
            </div>
            <div className={ characterBool ? 'button-select' : 'button-select active' } onClick={ () => onModeClick('survivor') }>
                <img src={ characterBool ? buttonIMGs.mode_survivor : buttonIMGs.mode_survivor_active } alt='ProfilePicture'></img>
            </div>
        </div>
    )

    /**
     * When one of the Mode Switch buttons is clicked, this function will be called
     * @param setKiller Sets if isKiller is true or false
     */
    function onModeClick(setKiller: 'survivor' | 'killer') {

        if (setKiller === 'killer') {
            setCharacterBool(true);
        } else {
            setCharacterBool(false);
        }

        if (props.randomNumbers.randomCharacter !== -1) {
            dispath(setRandomCharacter(-1));
            socket.emit('setRandomNumbers', {
                randomCharacter: -1,
                randomPerks: [-1, -1, -1, -1]
            });
        }
        if (!props.randomNumbers.randomPerks.includes(-1)) {
            dispath(setRandomPerks([-1, -1, -1, -1]));
            socket.emit('setRandomNumbers', {
                randomCharacter: -1,
                randomPerks: [-1, -1, -1, -1]
            });
        }

        dispath(setCurrentCharacter(setKiller));
        dispath(setCurrentSelectedPerks(getSelectedPerkList(props.savedData.SelectedPerks[setKiller], props.savedData.Perks[setKiller])));

        socket.emit('setCurrentData', props.currentData);

    }

}

export default connect(mapStoreFromProps)(SelectMode)