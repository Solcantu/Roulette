import React from 'react';

// Import Components & Functions
import Buttons from './buttons';
import Language from '../../components/language';

import '../../../main.min.css';

import { Footer } from './footer';
import { Link } from 'react-router-dom';


function Dashboard() {

    return (
        <div className='dashboard-container'>
            <div className='languageButton-container'>
                <div className='language-button'>

                    <Link className='text' to='/options'>
                        Optionen
                    </Link>
                </div>

                <Language />
            </div>

            <div className='title'>Dead by Daylight Roulette</div>

            <Buttons />

            <Footer />
        </div>
    );

}

export default Dashboard;