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
} from './types';

import * as API from '../../API/accuweatherAPI';

import * as RootNavigation from '../../routes/rootNavigation';

export const addCity = (cityKey, cityName) => {
    return (dispatch) => {
        dispatch({ type: FAVORITES_ADD_CITY });

        try {
            addCitySuccess(dispatch, cityKey, cityName);
        } catch (error) {
            addCityFail(dispatch, error);
        }
    };
};

const addCitySuccess = (dispatch, cityKey, cityName) => {
    dispatch({
        type: FAVORITES_ADD_CITY_SUCCESS,
        payload: { key: cityKey, name: cityName }
    });
};

const addCityFail = (dispatch, err) => {
    dispatch({
        type: FAVORITES_ADD_CITY_FAIL,
        payload: err
    });
};

export const removeCity = (favorites, cityKey) => {
    return (dispatch) => {
        dispatch({ type: FAVORITES_REMOVE_CITY_FAVORITES });
        var newFavorites = [];

        try {
            favorites.forEach(item => {
                if (item.key !== cityKey)
                    newFavorites.push(item);
            })

            removeCitySuccess(dispatch, newFavorites);

        } catch (error) {
            removeCityFail(dispatch, error);
        }
    };
};

const removeCitySuccess = (dispatch, newFavorites) => {
    dispatch({
        type: FAVORITES_REMOVE_CITY_FAVORITES_SUCCESS,
        payload: newFavorites
    });
};

const removeCityFail = (dispatch, err) => {
    dispatch({
        type: FAVORITES_REMOVE_CITY_FAVORITES_FAIL,
        payload: err
    });
};

export const refreshFavoritesData = (favoritesItems) => {
    var updatedFavorites = [];
    var promises = [];

    // RootNavigation.navigate("Favorites");
    // return;

    return (dispatch) => {
        dispatch({ type: FAVORITES_REFRESH_DATA });
        try {
            favoritesItems.forEach((item) => {
                promises.push(API.getWeather(item.key)
                    .then(res => {
                        if (Array.isArray(res)) {
                            const { WeatherText, IsDayTime, Temperature } = res[0];
                            var currentWeather = {
                                ...item,
                                temp: {
                                    metric: Temperature.Metric.Value + " " + Temperature.Metric.Unit,
                                    imperial: Temperature.Imperial.Value + " " + Temperature.Imperial.Unit
                                },
                                weatherText: WeatherText,
                                isDayTime: IsDayTime,
                            }

                            updatedFavorites.push(currentWeather);
                        }
                        else {
                            throw new Error(res.Message);
                        }
                    }));
            })

            return Promise.all(promises)
                .then(() =>
                    refreshFavoritesDataSuccess(dispatch, updatedFavorites)
                )
                .catch((err) => refreshFavoritesDataFail(dispatch, err));
        } catch (error) {
            refreshFavoritesDataFail(dispatch, error)
        }
    };
};

const refreshFavoritesDataSuccess = (dispatch, updatedFavorites) => {
    dispatch({
        type: FAVORITES_REFRESH_DATA_SUCCESS,
        payload: updatedFavorites
    });
    RootNavigation.navigate("Favorites");
};

const refreshFavoritesDataFail = (dispatch, err) => {
    dispatch({
        type: FAVORITES_REFRESH_DATA_FAIL,
        payload: err
    });
    RootNavigation.navigate("Favorites");
};
