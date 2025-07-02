import React from 'react';
import { appVersion, devBuild } from '../../..';

export function Footer() {

    return (
        <div className='footer-container'>
            DBD Perk Generator by Solcantu Developments - { devBuild ? 'DEV BUILD' : '' } V{ appVersion }
        </div>
    )

}