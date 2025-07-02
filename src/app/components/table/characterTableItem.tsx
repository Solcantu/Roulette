import React from 'react';

interface IProps {

    title: string;
    index: number;
    iconIMG: { [index: string]: string; };

    path: string;
    isSelected: boolean;
    onUpdate?: () => void;

}

export function CharacterTableItem(props: IProps) {

    return (
        <li className={ props.isSelected ? 'character' : 'character disabled' } onClick={() => {

            // props.onUpdate();

        }}>
            <img className='charPortrait' src={props.iconIMG[props.path]} alt=''></img>
            <div className='character-text'>
                { props.title }
            </div>
        </li>
    );

}