import React from 'react';
import { getPerkIMG, getPerkBackgroundColor, getPerkText } from '../../helper/helper';
import { RootState } from '../../store/combineReducer';
import { ICurrentData, IOptions } from '../../helper/interfaces';
import { connect } from 'react-redux';

interface IProps {
    perkNumber: number
}

interface IPropsFromStore {
    currentData: ICurrentData
    options: IOptions
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    currentData: state.data.currentData,
    options: state.options

})

function Perk(props: IProps & IPropsFromStore) {

    return (
        <div className='perk'>
            <img className='perk-background' src={getPerkBackgroundColor(props.currentData.SelectedPerks[props.perkNumber].perkColor)} alt=''></img>
            <img className='perk-icon' src={getPerkIMG(props.currentData.CurrentCharacter, props.currentData.SelectedPerks[props.perkNumber].path)} alt=''></img>
            <div className='perk-text'>
                {
                    getPerkText(props.options.language, props.currentData.CurrentCharacter, props.currentData.SelectedPerks[props.perkNumber].title)
                }
                </div>
        </div>
    )

}

export default connect(mapStoreFromProps)(Perk);