import React from 'react';
import Perk from './perk';
import Character from './character';
import { RootState } from '../../store/combineReducer';
import { connect } from 'react-redux';

interface IPropsFromStore {
    randomPerks: number[]
    randomCharacter: number
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    randomPerks: state.randomNumbers.randomPerks,
    randomCharacter: state.randomNumbers.randomCharacter

})

function PerkShowcase(props: IPropsFromStore) {

    return (

        <div>
            {
                hasContent()
            }

            {
                props.randomPerks.includes(-1) ?
                '' :
                <div className='perk-container'>
                    <Perk perkNumber={props.randomPerks[0]}/>
                    <Perk perkNumber={props.randomPerks[1]}/>
                    <Perk perkNumber={props.randomPerks[2]}/>
                    <Perk perkNumber={props.randomPerks[3]}/>
                </div>
            }
        </div>
    )

    function hasContent() {
        if (props.randomCharacter !== -1) {
            return <Character />
        }
    }
}

export default connect(mapStoreFromProps)(PerkShowcase);