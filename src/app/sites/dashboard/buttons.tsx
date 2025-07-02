import React, { useState } from 'react';
import { devBuild } from '../../..';
import { Link } from 'react-router-dom';
import languageJSON from '../../../static/language.json';
import { RootState } from '../../store/combineReducer';
import { connect } from 'react-redux';
import { buttonIMGs } from '../../helper/iconObject';

interface IPropsFromStore {
    language: 'german' | 'english'
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    language: state.options.language

})

function Buttons (props: IPropsFromStore) {

    const [openLink, setOpenLink] = useState(false);

    return (
        <div className='buttonContainer'>

            <div className='button-left' onClick={() => { setOpenLink(!openLink)}}>
                <img className='button-blood-hover-left' src={buttonIMGs.blood_hover} alt='ProfilePicture'></img>
                <img className='button-frame-left' src={buttonIMGs.button_navLeft_background} alt='ProfilePicture'></img>
                <img className='button-limiter-left' src={buttonIMGs.button_navLimiter} alt='ProfilePicture'></img>
                <img className='button-blood-mark-left' src={buttonIMGs.button_blood_mark} alt='ProfilePicture'></img>

                <div className='button-left-text'>
                    { openLink ? languageJSON[props.language].dashboard['obs-link-close'] : languageJSON[props.language].dashboard['obs-link-open'] }
                </div>
            </div>

            {
                openLink ?
                <div className='OBSLink selectable'>
                    { devBuild ?
                    'localhost:3000/obs'
                    :
                    'localhost:8001/obs'
                    }
                </div>
                : ''
            }

            <Link className='button-left' to='/perk'>
                <img className='button-blood-hover-left' src={buttonIMGs.blood_hover} alt='ProfilePicture'></img>
                <img className='button-frame-left' src={buttonIMGs.button_navLeft_background} alt='ProfilePicture'></img>
                <img className='button-limiter-left' src={buttonIMGs.button_navLimiter} alt='ProfilePicture'></img>
                <img className='button-blood-mark-left' src={buttonIMGs.button_blood_mark} alt='ProfilePicture'></img>

                <div className='button-left-text'>
                    { languageJSON[props.language].dashboard.perk.toLocaleUpperCase() }
                </div>
            </Link>

            <Link className='button-left' to='/character'>
                <img className='button-blood-hover-left' src={buttonIMGs.blood_hover} alt='ProfilePicture'></img>
                <img className='button-frame-left' src={buttonIMGs.button_navLeft_background} alt='ProfilePicture'></img>
                <img className='button-limiter-left' src={buttonIMGs.button_navLimiter} alt='ProfilePicture'></img>
                <img className='button-blood-mark-left' src={buttonIMGs.button_blood_mark} alt='ProfilePicture'></img>

                <div className='button-left-text'>
                    { languageJSON[props.language].dashboard.character.toLocaleUpperCase() }
                </div>
            </Link>
        </div>
    )

}

export default connect(mapStoreFromProps)(Buttons)