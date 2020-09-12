import {
    CITY_WEATHER_GET_CITY_WEATHER,
    CITY_WEATHER_GET_CITY_WEATHER_FAIL,
    CITY_WEATHER_GET_CITY_WEATHER_SUCCESS,
    CITY_WEATHER_GET_AUTO_COMPLETE,
    CITY_WEATHER_GET_AUTO_COMPLETE_FAIL,
    CITY_WEATHER_GET_AUTO_COMPLETE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    temp: '',
    weatherText: '',
    isDayTime: false,
    geo: '',
    state: '',
    key: '',
    dailyForecasts: [],
    err: '',
    loading: false,
    autocompleteOptions: [],
};

const cityWeather = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CITY_WEATHER_GET_CITY_WEATHER:
            return { ...state, ...INITIAL_STATE, loading: true, name: action.payload };
        case CITY_WEATHER_GET_CITY_WEATHER_FAIL:
            return { ...state, err: action.payload, loading: false };
        case CITY_WEATHER_GET_CITY_WEATHER_SUCCESS:
            return { ...state, loading: false, err: INITIAL_STATE.err, ...action.payload };

        case CITY_WEATHER_GET_AUTO_COMPLETE:
            return { ...state, err: INITIAL_STATE.err, loading: true };
        case CITY_WEATHER_GET_AUTO_COMPLETE_FAIL:
            return { ...state, err: action.payload, loading: false };
        case CITY_WEATHER_GET_AUTO_COMPLETE_SUCCESS:
            return { ...state, loading: false, err: INITIAL_STATE.err, autocompleteOptions: action.payload };

        default:
            return state;
    }
};

export default cityWeather;