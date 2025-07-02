import React from 'react';
import { Link } from 'react-router-dom';
import languageJSON from '../../../static/language.json';
import { CharacterTableItem } from '../../components/table/characterTableItem';
import { killerPortraitIMGs } from '../../helper/iconObject';
import { ISavedData } from '../../helper/interfaces';
import { RootState } from '../../store/combineReducer';
import { connect } from 'react-redux';
import { buttonIMGs } from '../../helper/iconObject';

interface IPropsFromStore {
    savedData: ISavedData
    language: 'german' | 'english'
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    savedData: state.data.savedData,
    language: state.options.language

})

function CharacterTable(props: IPropsFromStore) {

    /*
    function onUpdate() {

        if (isKillerSelected) {
            socket.emit('characterTableChange', selKillerData, isKillerSelected);
        } else {
            socket.emit('characterTableChange', selSurvivorData, isKillerSelected);
        }

    }

    function switchAll() {

        if (isKillerSelected) {

            const newArr: boolean[] = new Array(selKillerData.length).fill(selectedAll);
            socket.emit('characterTableChange', newArr, isKillerSelected);
            dispatch(setSelectedKiller(newArr));

        } else {
            const newArr: boolean[] = new Array(selSurvivorData.length).fill(selectedAll);
            socket.emit('characterTableChange', newArr, isKillerSelected);
            dispatch(setSelectedSurvivor(newArr));
        }

        setSelectedAll(!selectedAll);
    }
    */
    return (
        <div>

            <div className='perkTableButton-container'>

            <div className='title'>Charakter Liste</div>

                <Link className='button' to='/character'>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                        { languageJSON[props.language]['perk-list'].back }
                    </div>
                </Link>

                <div className='button' onClick={() => {/* switchAll() */}}>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                        { languageJSON[props.language]['perk-list'].switch }
                    </div>
                </div>
            </div>

            <ul className='perkList-container'>

                {

                    props.savedData.Character.killer.map((character, index) => {
                        const killerList: { [index: string]: string } = languageJSON[props.language].killer;

                        return <CharacterTableItem
                            iconIMG={killerPortraitIMGs}
                            index={index}
                            isSelected={props.savedData.SelectedCharacter.killer[index]}
                            path={character.portraitImg}
                            title={killerList[character.name]}
                            key={character.name}
                        />
                    })

                }
            </ul>
        </div>
    );

}

export default connect(mapStoreFromProps)(CharacterTable)