import React from 'react';
import { getCharacterIMG } from '../../helper/helper';
import { RootState } from '../../store/combineReducer';
import { IRandomNumbers, ICurrentData } from '../../helper/interfaces';
import { connect } from 'react-redux';

interface IPropsFromStore {
    randomNumbers: IRandomNumbers
    currentData: ICurrentData
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    randomNumbers: state.randomNumbers,
    currentData: state.data.currentData

})

function Character(props: IPropsFromStore) {

    return (
        <div className='character'>

            <img className='character-img' src={getCharacterIMG('killer', props.currentData.SelectedCharacter[props.randomNumbers.randomCharacter].img)} alt=''></img>
            <div className='character-text'>
                {
                    // getPerkText(langauge)
                }
                </div>
        </div>
    )
}

export default connect(mapStoreFromProps)(Character);