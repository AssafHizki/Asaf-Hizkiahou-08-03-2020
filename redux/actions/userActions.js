import {
    USER_SET_TEMP_UNIT,
    USER_SET_THEME
} from './types';

export const setTempUnit = (isMetric) => {
    return (dispatch) => {
        dispatch({ type: USER_SET_TEMP_UNIT, payload: isMetric });
    };
};

export const setTheme = (isDark) => {
    return (dispatch) => {
        dispatch({ type: USER_SET_THEME, payload: isDark });
    };
};
