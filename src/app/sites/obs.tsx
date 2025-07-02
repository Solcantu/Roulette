import React, { useEffect } from 'react';

import PerkShowcase from '../components/showcase/showcase';
import { useDispatch } from 'react-redux';
import { setOBS } from '../store/options/action';

function Obs() {

    const dispatch = useDispatch();

    document.body.style.background = 'none';

    useEffect(() => {
        dispatch(setOBS(true));
    })

    return (
        <div>
            <PerkShowcase />
        </div>
    );

}

export default Obs;