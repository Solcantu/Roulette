import React, { useState, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import languageJSON from '../../static/language.json';
import { ICompeleteStore, IOptions } from '../helper/interfaces';
import { useDispatch, connect } from 'react-redux';
import { setCurrentData } from '../store/currentData/actions';
import { setSavedData } from '../store/savedData/actions';
import { setOptions, setDefaultCharacter, setTimer } from '../store/options/action';
import { setRandomCharacter, setRandomPerks } from '../store/random/action';
import { RootState } from '../store/combineReducer';
import { buttonIMGs } from '../helper/iconObject';

interface IPropsFromStore {
    options: IOptions
}

const mapStoreToProps = (state: RootState) => ({

    options: state.options

});

function Options(props: IPropsFromStore) {
    const completeData = useSelector(
        (state: RootState) => (
            state
        )
    )

    const [tempImportedData, setTempImportedData]:[ICompeleteStore | null, Dispatch<SetStateAction<null>> | Dispatch<SetStateAction<null>>] = useState(null);

    const ref = React.createRef<HTMLInputElement>();
    const dispatch = useDispatch();

    const downloadFile = async () => {
        const fileName = 'file';
        const json = JSON.stringify(completeData);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = href;
        link.download = fileName + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className='optionsSite-container'>

            <div className='title'>Perk</div>

            <Link className='button' to='/'>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                        { languageJSON[props.options.language].options.back }
                    </div>
            </Link>

            <div className='button' onClick={() => {

                switch(props.options.defaultCharacter) {
                    case 'killer':
                        dispatch(setDefaultCharacter('survivor'));
                    break;

                    case 'survivor':
                        dispatch(setDefaultCharacter('killer'));
                    break;
                }

            }}>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.options.language].options.preferredCharacter }: { props.options.defaultCharacter }
                </div>
            </div>

            <div className='button' onClick={() => {

                switch (props.options.displayTime) {
                    case 0:
                        dispatch(setTimer(10));
                    break;
                    case 10:
                        dispatch(setTimer(20));
                    break;
                    case 20:
                        dispatch(setTimer(30));
                    break;
                    case 30:
                        dispatch(setTimer(0));
                    break;
                }

            }}>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.options.language].options.disappearTimer }: { props.options.displayTime }s
                </div>
            </div>

            <div className='button'>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <input type='file' ref={ref} onChange={
                    async (data) => {
                        if (data.target.files) {
                            // TODO: Needs checks, if the file is valid!

                            try {

                                const file = data.target.files[0];

                                const fileText = await file.text();
                                const jsonInputData: ICompeleteStore = JSON.parse(fileText);

                                // Check if file is a json file
                                if (!file.name.endsWith('.json')) {
                                    throw new Error('Not a json file.');
                                }

                                // Check if Main Keys exist
                                const mainKeys = Object.keys(jsonInputData);
                                if (mainKeys[0] !== 'savedData' || mainKeys[1] !== 'currentData' || mainKeys[2] !== 'randomNumbers' || mainKeys[3] !== 'options') {
                                    throw new Error('A main key is Missing.');
                                }

                                // Check if too many keys are in the file
                                if (mainKeys.length !== 4) {
                                    throw new Error('Too many main keys');
                                }

                                if (jsonInputData.currentData) {
                                    dispatch(setCurrentData(jsonInputData.currentData));
                                }
                                if (jsonInputData.savedData) {
                                    dispatch(setSavedData(jsonInputData.savedData));
                                }
                                if (jsonInputData.options) {
                                    dispatch(setOptions(jsonInputData.options));
                                }
                                if (jsonInputData.randomNumbers.randomCharacter) {
                                    dispatch(setRandomCharacter(jsonInputData.randomNumbers.randomCharacter));
                                }
                                if (jsonInputData.randomNumbers.randomPerks) {
                                    dispatch(setRandomPerks(jsonInputData.randomNumbers.randomPerks));
                                }

                                console.log('Opened File');

                            } catch(error) {
                                console.error(error);

                            }

                        }
                    }
                } />
                {
                    /*
                    <div className='text'>
                    { languageJSON[props.options.language].options.import }
                    </div>
                    */
                }
            </div>

            <div className='button' onClick={() => {downloadFile()}}>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.options.language].options.export }
                </div>
            </div>

            <div className='button'>
                <div className='icon-frame'>
                    <img className='icon' src={buttonIMGs.button_icon_shrineOfSecrets} alt='ProfilePicture'></img>
                </div>
                <div className='text'>
                    { languageJSON[props.options.language].options.applyChanges }
                </div>
            </div>
        </div>
    );

}


export default connect(mapStoreToProps)(Options);