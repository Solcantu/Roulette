import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
import Dashboard from './sites/dashboard';
import Obs from './sites/obs';

import PerkTable from './sites/perk/perkTable';
import { useFirstLaunch } from './firstLaunch';
import Perk from './sites/perk';
import Character from './sites/character';
import CharacterTable from './sites/character/characterTable';
import Options from './sites/options';
import { useSelector } from 'react-redux';
import { RootState } from './store/combineReducer';

function App() {

    useFirstLaunch();

    const obs = useSelector(
        (state: RootState) => (
            state.options.obs
        )
    );

    return (
        <div className={obs ? 'App unselectable Obs' : 'App unselectable'}>

            {
                obs ? '' : <img className='backgroundIMG' src={require('../static/images/Banner_DLC_Chapter_16_Big.png')} alt=''></img>
            }

            <div className='innerApp'>
                <Router>
                    <Switch>
                        <Route path='/obs'>
                            <Obs />
                        </Route>
                        <Route path='/perk'>
                            <Perk />
                        </Route>
                        <Route path='/character'>
                            <Character />
                        </Route>
                        <Route path='/options'>
                            <Options />
                        </Route>

                        <Route path='/perk-table'>
                            <PerkTable />
                        </Route>
                        <Route path='/character-table'>
                            <CharacterTable />
                        </Route>
                        <Route path='/'>
                            <Dashboard />
                        </Route>
                    </Switch>
                </Router>
            </div>

        </div>
    );

}

export default App;