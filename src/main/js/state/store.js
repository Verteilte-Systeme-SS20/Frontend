import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import * as reducers from './features';
import { restService } from './middlewares';

const persistConfig = {
    key: 'root',
    storage
};

export default function configureStore(initialState) {
    const rootReducer = persistReducer(persistConfig, combineReducers(reducers));

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            logger,
            restService
        )
    );
}
