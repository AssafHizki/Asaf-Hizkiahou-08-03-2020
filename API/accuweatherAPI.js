import { API_KEY } from './config';

export const getLocation = (location) => {
    return fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`)
        .then(res => res.json())
}

export const getWeather = (locationKey) => {
    return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`)
        .then(res => res.json());
}

export const getCityForecast = (locationKey) => {
    return fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
        .then(res => res.json());
}

export const getAutoComplete = (text) => {
    return fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${text}`)
        .then(res => res.json());
}