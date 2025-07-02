import React from 'react';
import { socket } from '../..';
import { useDispatch, connect } from 'react-redux';
import languageJSON from '../../static/language.json';
import { setLanguage } from '../store/options/action';
import { RootState } from '../store/combineReducer';

interface IPropsFromStore {
    language: 'german' | 'english'
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    language: state.options.language,

})

function Language (props: IPropsFromStore) {

    const dispath = useDispatch();

    return (
        <div className='language-button' onClick={() => {
            if (props.language === 'english') {
                socket.emit('changeLanguage', 'german');
                dispath(setLanguage('german'));
            } else {
                socket.emit('changeLanguage', 'english');
                dispath(setLanguage('english'));
            }
        }}>
            <div className='text'>
                { languageJSON[props.language].title }
            </div>
        </div>
    )

}

export default connect(mapStoreFromProps)(Language)