export interface IPerk {
    title: string;
    perkColor: string;
    path: string;
}
export interface IPerkArr extends Array<IPerk> {};

export interface ICharacter {
    name: string;
    img: string;
    portraitImg: string;
    perks: string[];
}

export interface ICharacterArr extends Array<ICharacter> {};

export interface IRandomNumbers {
    randomCharacter: number;
    randomPerks: number[];
    oldRandomPerks: number[][];
}


export interface ISavedData {
    Character: {
        survivor: ICharacterArr,
        killer: ICharacterArr,
    };
    SelectedCharacter: {
        survivor: boolean[],
        killer: boolean[],
    };

    Perks: {
        survivor: IPerkArr,
        killer: IPerkArr,
    };
    SelectedPerks: {
        survivor: boolean[],
        killer: boolean[],
    };
}

export interface ICurrentData {
    CurrentCharacter: 'survivor' | 'killer',
    SelectedCharacter: ICharacterArr,
    SelectedPerks: IPerkArr,
}

export interface IOptions {
    obs: boolean,
    language: 'german' | 'english',
    displayTime: 0 | 10 | 20 | 30,
    defaultCharacter: 'survivor' | 'killer'
}

export interface ICompeleteStore {
    savedData: ISavedData;
    currentData: ICurrentData;
    randomNumbers: IRandomNumbers;
    options: IOptions;
}