import React from 'react';

import SelectMode from '../dashboard/selectMode';
import { Link } from 'react-router-dom';
import languageJSON from '../../../static/language.json';
import { socket } from '../../..';
import { setRandomPerks, setRandomCharacter, setOldRandomPerks } from '../../store/random/action';
import { useDispatch, connect } from 'react-redux';
import PerkShowcase from '../../components/showcase/showcase';
import createRNGArray from '../../helper/rng';
import { RootState } from '../../store/combineReducer';
import { IRandomNumbers, ICurrentData } from '../../helper/interfaces';
import { buttonIMGs } from '../../helper/iconObject';

interface IPropsFromStore {
    language: 'german' | 'english'
    currentData: ICurrentData
    randomNumbers: IRandomNumbers
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    language: state.options.language,
    currentData: state.data.currentData,
    randomNumbers: state.randomNumbers

})

function Perk(props: IPropsFromStore) {

    const dispatch = useDispatch();

    return (
        <div className='perkSite-container'>

            <div className='title'>Perk</div>

            <SelectMode />

            <Link className='button' to='/'>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.language]['perk-list'].back }
                </div>
            </Link>

            <Link className='button' to='/perk-table' onClick={() => {resetRaffle()}}>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_loadout} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.language].dashboard['perk-list'].toLocaleUpperCase() }
                </div>
            </Link>

            <div className='button' onClick={() => {onPerkRaffleClick ()}}>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.language].dashboard['perk-raffle'].toLocaleUpperCase() }
                </div>
            </div>

            <PerkShowcase />

        </div>
    );

    function resetRaffle() {
        dispatch(setRandomPerks([-1, -1, -1, -1]));
    }

    /**
     * Start function if "raffle" is clicked
     */
    function onPerkRaffleClick () {

        if (!props.randomNumbers.randomPerks.includes(-1)) {

            dispatch(setOldRandomPerks(props.randomNumbers.randomPerks));
        }

        let rngArray = [-1, -1, -1, -1];
        const perkArray: number[] = [-1, -1, -1, -1];

        if (props.currentData.SelectedPerks.length <= 4) {

            // TODO: Give user an Error message!

            // socket.emit('raffleClick', rngArray);
        } else {
            rngArray = createRNGArray(props.currentData.SelectedPerks.length, 4);

            dispatch(setRandomPerks(rngArray));

            socket.emit('setRandomNumbers', {
                randomCharacter: -1,
                randomPerks: rngArray
            });

        }

        // socket.emit('characterRaffleClick', -1);
        if (props.randomNumbers.randomCharacter !== -1) { dispatch(setRandomCharacter(-1)); }

        return perkArray;

    }

}

export default connect(mapStoreFromProps)(Perk);