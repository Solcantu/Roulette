import React from 'react';
import { backgroundPerkIMGs, colorPerkBackground } from '../../helper/iconObject';

interface IProps {

    title: string;
    index: number;
    iconIMG: { [index: string]: string; };
    color: string;
    selectStatus: boolean;
    setTempPerk(value: boolean, index: number): void;

    path: string;

}

export function PerkTableItem(props: IProps) {

    return (
        <li className={ props.selectStatus ? 'perk selected' : 'perk' } onClick={() => {
            props.setTempPerk(!props.selectStatus, props.index)
        }}>
            <img className='perk-background' src={ props.selectStatus ? colorPerkBackground[props.color] : backgroundPerkIMGs.perkIcon_backgroundDisabled } alt=''></img>
            <img className='perk-icon' src={props.iconIMG[props.path]} alt=''></img>
            <div className='perk-text'>
                { props.title }
            </div>
        </li>
    );

}