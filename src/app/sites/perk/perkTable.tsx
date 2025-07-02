import React, { useState, useEffect } from 'react';
import { PerkTableItem } from '../../components/table/perkTableItem';
import { socket } from '../../..';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { killerIconPerkIMGs, survivorIconPerkIMGs } from '../../helper/iconObject';
import languageJSON from '../../../static/language.json';
import { setSavedSelectedPerkList } from '../../store/savedData/actions';
import { setCurrentSelectedPerks } from '../../store/currentData/actions';
import { IPerkArr, ISavedData, ICurrentData } from '../../helper/interfaces';
import { getSelectedPerkList } from '../../helper/helper';
import { RootState } from '../../store/combineReducer';
import { buttonIMGs } from '../../helper/iconObject';

enum Sort {
    None,
    ASC,
    DESC
}

interface IPropsFromStore {
    language: 'german' | 'english'
    perkList: IPerkArr
    savedData: ISavedData
    currentData: ICurrentData
}

const mapStoreFromProps = (state: RootState): IPropsFromStore => ({

    language: state.options.language,
    perkList: state.data.savedData.Perks[state.data.currentData.CurrentCharacter],
    savedData: state.data.savedData,
    currentData: state.data.currentData

})

function PerkTable(props: IPropsFromStore) {

    const dispatch = useDispatch();

    const [selectedAll, setSelectedAll] = useState(false);
    const [tempPerkList, setTempPerkList] = useState({perkList: props.perkList, booleanPerkList: props.savedData.SelectedPerks[props.currentData.CurrentCharacter]});
    const [sortAlphabetical, setSortAlphabetical] = useState(Sort.ASC);
    const [sortedArray, setSortedArray] = useState([...tempPerkList.perkList]);

    // Update list, if anything changes
    useEffect(() => {

        setSortedArray([...props.perkList]);
        setTempPerkList({perkList: [...props.perkList], booleanPerkList: [...props.savedData.SelectedPerks[props.currentData.CurrentCharacter]]});

    }, [props.currentData.CurrentCharacter, props.perkList, props.savedData.SelectedPerks]);

    // Update Redux Store and Server
    function applyChanges(): void {
        const selectedPerkList: IPerkArr = getSelectedPerkList(tempPerkList.booleanPerkList, props.savedData.Perks[props.currentData.CurrentCharacter]);
        dispatch(setCurrentSelectedPerks(selectedPerkList));
        dispatch(setSavedSelectedPerkList(tempPerkList.booleanPerkList, props.currentData.CurrentCharacter));

        socket.emit('setRandomNumbers', {
            randomCharacter: -1,
            randomPerks: [-1, -1, -1,- 1]
        });
        socket.emit('setSavedData', props.savedData);
        socket.emit('setCurrentData', props.currentData);
    }

    // If a perk was clicked, update the temp Perk
    function setTempPerk(value:boolean, index: number): void {

        const newTempPerkList = tempPerkList.booleanPerkList;
        newTempPerkList[index] = value;

        setTempPerkList({perkList: props.perkList, booleanPerkList: newTempPerkList});
    }

    function updateSort(): void {

        switch (sortAlphabetical) {
            case Sort.None:
                setSortedArray([...tempPerkList.perkList]);
                setSortAlphabetical(Sort.ASC);
            break;
            case Sort.ASC:
                const ascArr = sortedArray;
                ascArr.sort((a, b) => {

                    if(a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) { return -1; }
                    if(a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) { return 1; }
                    return 0;
                });

                setSortedArray(ascArr);
                setSortAlphabetical(Sort.DESC);
            break;
            case Sort.DESC:
                const descArr = sortedArray;
                descArr.sort((a, b) => {

                    if(a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) { return -1; }
                    if(a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) { return 1; }
                    return 0;
                });

                setSortedArray(descArr);
                setSortAlphabetical(Sort.None);
            break;
        }

    }

    function switchAll(): void {

        const newArr: boolean[] = new Array(props.perkList.length).fill(selectedAll);
        setTempPerkList({perkList: props.perkList, booleanPerkList: newArr});
        setSelectedAll(!selectedAll);
    }

    return (
        <div>
            <div className='perkTableButton-container'>

            <div className='title'>Perk Liste</div>

                <Link className='button' to='/perk'>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_loadout} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                        { languageJSON[props.language]['perk-list'].back }
                    </div>
                </Link>

                <div className='button' onClick={() => {switchAll()}}>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_loadout} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                        { languageJSON[props.language]['perk-list'].switch }
                    </div>
                </div>

                <div className='button' onClick={() => { updateSort(); }}>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_loadout} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                    { languageJSON[props.language]['perk-list'].sortAlphabetical }
                    </div>
                </div>

                <div className='button' onClick={() => {applyChanges()}}>
                    <div className='icon-frame'>
                        <img className='icon' src={buttonIMGs.button_icon_loadout} alt='ProfilePicture'></img>
                    </div>
                    <div className='text'>
                    { languageJSON[props.language]['perk-list'].applyChanges }
                    </div>
                </div>
            </div>

            <ul className='perkList-container'>
                {
                    sortedArray.map((item) => {

                        const killerList: { [index: string]: string } = languageJSON[props.language].killerPerks;
                        const survivorList: { [index: string]: string } = languageJSON[props.language].survivorPerks;

                        let IMG = killerIconPerkIMGs;
                        let textList = killerList;

                        if (props.currentData.CurrentCharacter === 'survivor') {
                            IMG = survivorIconPerkIMGs;
                            textList = survivorList;
                        }

                        // May need rework in the future
                        let trueIndex = -1;
                        tempPerkList.perkList.find((value, index) => {
                            if (value.title === item.title) {
                                trueIndex = index;
                                return true;
                            }

                            return false;
                        });
                        return <PerkTableItem
                            title={textList[item.title]}
                            path={item.path}
                            iconIMG={IMG}
                            color={item.perkColor}
                            selectStatus={tempPerkList.booleanPerkList[trueIndex]}
                            setTempPerk={setTempPerk}
                            index={trueIndex}
                            key={trueIndex}
                        />
                    })
                }
            </ul>
        </div>
    );

}

export default connect(mapStoreFromProps)(PerkTable)