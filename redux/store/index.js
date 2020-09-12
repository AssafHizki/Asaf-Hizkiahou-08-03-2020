import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from "redux-thunk";
import rootReducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunk,
        createLogger(),
    ),
);

let persistor = persistStore(store);

export {
    store,
    persistor,
};