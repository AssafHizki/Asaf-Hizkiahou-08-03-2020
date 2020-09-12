import {
    USER_SET_TEMP_UNIT,
    USER_SET_THEME,
} from '../actions/types';

const INITIAL_STATE = {
    isThemeDark: false,
    isTempUnitMetric: true,
};


export const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case USER_SET_TEMP_UNIT:
            return { ...state, isTempUnitMetric: action.payload };

        case USER_SET_THEME:
            return { ...state, isThemeDark: action.payload };

        default:
            return state;
    }
};

export default user;