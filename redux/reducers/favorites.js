import {
    FAVORITES_ADD_CITY,
    FAVORITES_ADD_CITY_FAIL,
    FAVORITES_ADD_CITY_SUCCESS,
    FAVORITES_REMOVE_CITY_FAVORITES,
    FAVORITES_REMOVE_CITY_FAVORITES_FAIL,
    FAVORITES_REMOVE_CITY_FAVORITES_SUCCESS,
    FAVORITES_REFRESH_DATA,
    FAVORITES_REFRESH_DATA_FAIL,
    FAVORITES_REFRESH_DATA_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    items: [],
    err: '',
    loading: false
};


export const favorites = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //  ADD to FAVORITES
        case FAVORITES_ADD_CITY:
            return { ...state, err: INITIAL_STATE.err, loading: true };

        case FAVORITES_ADD_CITY_SUCCESS:
            return { ...state, items: [...state.items, action.payload], loading: false, };

        case FAVORITES_ADD_CITY_FAIL:
            return { ...state, err: action.payload, loading: false, };

        // REMOVE from FAVORITES
        case FAVORITES_REMOVE_CITY_FAVORITES:
            return { ...state, err: INITIAL_STATE.err, loading: true };

        case FAVORITES_REMOVE_CITY_FAVORITES_SUCCESS:
            return { ...state, items: action.payload, loading: false, };

        case FAVORITES_REMOVE_CITY_FAVORITES_FAIL:
            return { ...state, err: action.payload, loading: false, };

        // REFRESH FAVORITES
        case FAVORITES_REFRESH_DATA:
            return { ...state, err: INITIAL_STATE.err, loading: true };

        case FAVORITES_REFRESH_DATA_SUCCESS:
            return { ...state, items: action.payload, loading: false, };

        case FAVORITES_REFRESH_DATA_FAIL:
            return { ...state, err: action.payload, loading: false, };

        default:
            return state;
    }
};

export default favorites;