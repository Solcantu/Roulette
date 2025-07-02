import React from 'react';

import SelectMode from '../dashboard/selectMode';
import { Link } from 'react-router-dom';
import languageJSON from '../../../static/language.json';
import { socket } from '../../..';
import createRNGArray from '../../helper/rng';
import { setRandomCharacter, setRandomPerks } from '../../store/random/action';
import { useDispatch, connect } from 'react-redux';
import PerkShowcase from '../../components/showcase/showcase';
import { ICurrentData } from '../../helper/interfaces';
import { RootState } from '../../store/combineReducer';
import { buttonIMGs } from '../../helper/iconObject';

interface IPropsFromStore {
    currentData: ICurrentData
    language: 'german' | 'english'
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    currentData: state.data.currentData,
    language: state.options.language

})

function Character(props: IPropsFromStore) {

    const dispatch = useDispatch();

    return (
        <div className='perkSite-container'>

            <div className='title'>Charakter</div>

            <SelectMode />

            <Link className='button' to='/'>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.language]['perk-list'].back }
                </div>
            </Link>

            <Link className='button' to='/character-table'>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_loadout} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.language].dashboard['character-list'].toLocaleUpperCase() }
                </div>
            </Link>

            <div className='button' onClick={() => {onKillerRaffleClick()}}>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.language].dashboard['character-raffle'].toLocaleUpperCase() }
                </div>
            </div>

            <PerkShowcase />

        </div>
    );

    function onKillerRaffleClick() {

        const selectedPerkArray = props.currentData.SelectedCharacter;

        const randomKiller = createRNGArray(selectedPerkArray.length, 1);

        dispatch(setRandomCharacter(randomKiller[0]));
        socket.emit('characterRaffleClick', randomKiller[0]);

        dispatch(setRandomPerks([-1, -1, -1, -1]));
        socket.emit('raffleClick', [-1, -1, -1, -1]);

    }

}

export default connect(mapStoreFromProps)(Character);