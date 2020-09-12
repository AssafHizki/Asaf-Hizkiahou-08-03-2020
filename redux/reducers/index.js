import { combineReducers } from 'redux';
import favorites from './favorites';
import cityWeather from './cityWeather';
import user from './user';

const allReducers = combineReducers({
    favorites: favorites,
    cityWeather: cityWeather,
    user: user,
});


export default allReducers;
