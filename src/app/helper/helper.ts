// Import JSON
import killerPerksJSON from '../../static/killerPerks.json';
import survPerksJSON from '../../static/survivorPerks.json';

import killerJSON from '../../static/killer.json';
import survJSON from '../../static/survivor.json';

import languageJSON from '../../static/language.json'

import { IPerkArr, ICharacterArr } from './interfaces';
import { killerIMGs, survivorIMGs, killerIconPerkIMGs, survivorIconPerkIMGs, colorPerkBackground } from './iconObject';
/**
* Gets the JSON content based on "isKiller"
*/
export function getPerkJSON(selectedCharacter: 'survivor' | 'killer'): IPerkArr {

    const killerPerks: IPerkArr = killerPerksJSON;
    const survPerks: IPerkArr = survPerksJSON;

    switch (selectedCharacter) {
        case 'killer':
            return killerPerks;
        case 'survivor':
            return survPerks;

        default:
            return killerPerks;
    }
}

/**
* Gets the JSON content based on "isKiller"
*/
export function getCharacterJSON(selectedCharacter: 'survivor' | 'killer'): ICharacterArr {

    const killerCharacter: ICharacterArr = killerJSON;
    const survCharacter: ICharacterArr = survJSON;

    switch (selectedCharacter) {
        case 'killer':
            return killerCharacter;
        case 'survivor':
            return survCharacter;

        default:
            return killerCharacter;
    }
}

export function getSelectedPerkList(booleanList: boolean[], perkList: IPerkArr) {

    const newPerkList: IPerkArr = [];

    booleanList.forEach((perk, index) => {

        if (perk) {
            newPerkList.push(perkList[index])
        }

    })

    return newPerkList;
}

export function getCharacterIMG(selectedCharacter: 'survivor' | 'killer', imgName: string) {

    switch (selectedCharacter) {
        case 'killer':
            return killerIMGs[imgName];
        case 'survivor':
            return survivorIMGs[imgName]

        default:
            return killerIMGs[imgName];
    }
}

export function getPerkIMG(selectedCharacter: 'survivor' | 'killer', imgName: string) {

    switch (selectedCharacter) {
        case 'killer':
            return killerIconPerkIMGs[imgName];

        case 'survivor':
            return survivorIconPerkIMGs[imgName];

        default:
            return killerIMGs[imgName];
    }
}
export function getPerkText(language: 'english' | 'german', currentCharacter: 'killer' | 'survivor', perkName: string) {

    const killerList: { [index: string]: string } = languageJSON[language].killerPerks;
    const survList: { [index: string]: string } = languageJSON[language].survivorPerks;

    if (currentCharacter === 'killer') {
        return killerList[perkName];
    } else {
        return survList[perkName];
    }

}

export function getPerkBackgroundColor(color: string) {

    return colorPerkBackground[color];
}
