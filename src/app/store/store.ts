import { combinedReducer, RootState } from './combineReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware, compose } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import logger from 'redux-logger'

import { devToolsEnhancer } from 'redux-devtools-extension';

const persistedReducer = persistReducer<RootState>({
    key: 'root',
    storage,
    debug: true,
    whitelist: [
        'data',
        'options'
    ],
    blacklist: [
        'randomNumbers',
    ],
    stateReconciler: autoMergeLevel2,
}, combinedReducer);

export const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(logger),
        devToolsEnhancer({})
    )
);

export const persistor = persistStore(store);