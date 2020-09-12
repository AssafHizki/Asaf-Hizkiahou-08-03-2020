import {
    CITY_WEATHER_GET_CITY_WEATHER,
    CITY_WEATHER_GET_CITY_WEATHER_FAIL,
    CITY_WEATHER_GET_CITY_WEATHER_SUCCESS,
    CITY_WEATHER_GET_AUTO_COMPLETE,
    CITY_WEATHER_GET_AUTO_COMPLETE_FAIL,
    CITY_WEATHER_GET_AUTO_COMPLETE_SUCCESS
} from './types';

import * as API from '../../API/accuweatherAPI';

import * as RootNavigation from '../../routes/rootNavigation';

export const searchCity = (city) => {
    return (dispatch) => {
        dispatch({ type: CITY_WEATHER_GET_CITY_WEATHER, payload: city });

        // var currentWeather = {
        //     name: "Tel Aviv",
        //     key: "2214124",
        //     temp: {
        //         metric: '30 C',
        //         imperial: '60 F',
        //     },
        //     weatherText: "Sunny",
        //     isDayTime: true,
        //     dailyForecasts: [
        //         { date: '2020-09-12', temp: { min: { metric: "40 C", imperial: "80 F" }, max: { metric: "40 C", imperial: "80 F" } } },
        //         { date: '2020-09-13', temp: { min: { metric: "40 C", imperial: "80 F" }, max: { metric: "40 C", imperial: "80 F" } } },
        //         { date: '2020-09-14', temp: { min: { metric: "40 C", imperial: "80 F" }, max: { metric: "40 C", imperial: "80 F" } } },
        //         { date: '2020-09-15', temp: { min: { metric: "40 C", imperial: "80 F" }, max: { metric: "40 C", imperial: "80 F" } } },
        //         { date: '2020-09-16', temp: { min: { metric: "40 C", imperial: "80 F" }, max: { metric: "40 C", imperial: "80 F" } } }
        //     ]
        // }
        // searchCitySuccess(dispatch, currentWeather);

        API.getLocation(city)
            .then((res) => {
                if (Array.isArray(res)) {
                    const { Key, LocalizedName, AdministrativeArea, GeoPosition } = res[0];
                    var currentWeather = {
                        name: LocalizedName,
                        geo: GeoPosition,
                        state: AdministrativeArea.ID,
                        key: Key,
                    }
                    getCityByKey(currentWeather)
                        .then(cityWeather => searchCitySuccess(dispatch, cityWeather))
                        .catch((err) => searchCityFail(dispatch, err));
                }
                else {
                    searchCityFail(dispatch, (res.Message));
                }
            })
            .catch((err) => searchCityFail(dispatch, err));
    };
};

const searchCitySuccess = (dispatch, cityWeather) => {
    dispatch({
        type: CITY_WEATHER_GET_CITY_WEATHER_SUCCESS,
        payload: { ...cityWeather }
    });
};

const searchCityFail = (dispatch, err) => {
    dispatch({
        type: CITY_WEATHER_GET_CITY_WEATHER_FAIL,
        payload: err
    });
};

export const getCity = (cityObj) => {
    return (dispatch) => {
        dispatch({ type: CITY_WEATHER_GET_CITY_WEATHER, payload: cityObj.name });

        // RootNavigation.navigate('Home');
        // return;

        try {
            getCityByKey(cityObj)
                .then(cityWeather => getCitySuccess(dispatch, cityWeather))
        } catch (error) {
            getCityFail(dispatch, error)
        }
    }
}

const getCitySuccess = (dispatch, cityWeather) => {
    dispatch({
        type: CITY_WEATHER_GET_CITY_WEATHER_SUCCESS,
        payload: { ...cityWeather }
    });

    RootNavigation.navigate('Home');
};

const getCityFail = (dispatch, err) => {
    dispatch({
        type: CITY_WEATHER_GET_CITY_WEATHER_FAIL,
        payload: err
    });

    RootNavigation.navigate('Home');
};

const getCityByKey = (cityObj) => {
    return API.getWeather(cityObj.key)
        .then((res) => {
            if (Array.isArray(res)) {
                const { WeatherText, IsDayTime, Temperature } = res[0];
                var currentWeather = {
                    ...cityObj,
                    temp: {
                        metric: Temperature.Metric.Value + " " + Temperature.Metric.Unit,
                        imperial: Temperature.Imperial.Value + " " + Temperature.Imperial.Unit
                    },
                    weatherText: WeatherText,
                    isDayTime: IsDayTime,
                }
                return API.getCityForecast(currentWeather.key)
                    .then((json) => {
                        if (json.DailyForecasts) {
                            var dailyForecasts = [];
                            json.DailyForecasts.forEach(day => {
                                var temp = {
                                    min: {
                                        metric: (((day.Temperature.Minimum.Value - 32) * 5 / 9).toFixed(2)) + " C",
                                        imperial: day.Temperature.Minimum.Value + " " + day.Temperature.Minimum.Unit
                                    },
                                    max: {
                                        metric: ((day.Temperature.Maximum.Value - 32) * 5 / 9).toFixed(2) + " C",
                                        imperial: day.Temperature.Maximum.Value + " " + day.Temperature.Maximum.Unit
                                    }
                                }
                                var date = new Date(day.Date)
                                dailyForecasts.push({ date, temp });
                            });
                            currentWeather["dailyForecasts"] = dailyForecasts;
                            return currentWeather;
                        }
                        else {
                            throw new Error(json.Message);
                        }
                    })
            }
            else {
                throw new Error(res.Message);
            }
        })
}

export const getAutoCompleteByText = (text) => {
    return (dispatch) => {
        dispatch({ type: CITY_WEATHER_GET_AUTO_COMPLETE });

        API.getAutoComplete(text)
            .then(result => {
                if (Array.isArray(result)) {
                    var leanerTextOptions = [];

                    result.forEach(option => {
                        leanerTextOptions.push({ key: option.Key, name: option.LocalizedName })
                    });

                    getAutoCompleteByTextSuccess(dispatch, leanerTextOptions);
                }

                else {
                    getAutoCompleteByTextFail(dispatch, result.Message);
                }
            })
            .catch((err) => getAutoCompleteByTextFail(dispatch, err));
    }
}

const getAutoCompleteByTextSuccess = (dispatch, textOptions) => {
    dispatch({
        type: CITY_WEATHER_GET_AUTO_COMPLETE_SUCCESS,
        payload: textOptions
    });

};

const getAutoCompleteByTextFail = (dispatch, err) => {
    dispatch({
        type: CITY_WEATHER_GET_AUTO_COMPLETE_FAIL,
        payload: err
    });
};