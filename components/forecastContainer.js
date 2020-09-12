import React, { useEffect, useState } from 'react';
import { searchCity, getAutoCompleteByText, getCity } from "../redux/actions/cityWeatherActions";
import { addCity, removeCity } from "../redux/actions/favoritesActions";
import { connect } from 'react-redux';
import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import ForecastPresentational from './forecastPresentational'
import Autocomplete from 'react-native-autocomplete-input';

const Home = (props) => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    var backgroundColor = props.user.isThemeDark ? '#00008b' : '#87ceeb';
    var isFavorite = false;

    if (props.favorites.items.length > 0) {
        isFavorite = props.favorites.items.find(favorite => favorite.key == props.cityWeather.key);
    }

    useEffect(() => {
        if (props.cityWeather?.key === "") {
            props.favorites.items.length > 0 ?
                props.getCity(props.favorites.items[0])
                :
                props.searchCity("Tel Aviv")
        }
    }, []);

    let checkInput = (text) => {
        const condition = new RegExp(/^[a-zA-Z ]+$/);

        if (text) {
            if (condition.test(text)) {
                setSearch(text);
                props.getAutoComplete(text);
                setError(null);
            }
            else {
                setError("Input should be in English letters only!");
            }
        }
    }

    let renderView = () => {
        if (props.cityWeather.loading)
            return <ActivityIndicator />;

        if (error) {
            return <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>
        }

        if (props.cityWeather.err) {
            return <Text style={{ color: 'red', alignSelf: 'center' }}>{props.cityWeather.err}</Text>
        }

        return (
            <ForecastPresentational isFavorite={isFavorite} cityWeather={props.cityWeather}
                isTempUnitMetric={props.user.isTempUnitMetric} backgroundColor={backgroundColor}
                removeFromFavorites={() => props.removeCityFromFavorites(props.favorites.items, props.cityWeather.key)}
                addToFavorites={() => props.addCityToFavorites(props.cityWeather.key, props.cityWeather.name)}
            />)
    }

    return (
        <View style={{ backgroundColor: backgroundColor, height: '100%' }}>
            <Autocomplete
                data={props.cityWeather.autocompleteOptions}
                defaultValue={search}
                placeholder={'Search a city'}
                containerStyle={{
                    flex: 1, left: 0, position: 'absolute',
                    right: 0, top: 0, zIndex: 1
                }}
                onChangeText={(text) => checkInput(text)}
                renderItem={({ item, i }) => (

                    <TouchableOpacity key={item.key} onPress={() => props.getCity(item)}
                        style={{ padding: 5 }}
                    >
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{ marginTop: 45 }} />

            {renderView()}
        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        searchCity: (city) => (dispatch(searchCity(city))),
        getCity: (city) => (dispatch(getCity(city))),
        addCityToFavorites: (cityKey, cityName) => (dispatch(addCity(cityKey, cityName))),
        removeCityFromFavorites: (favorites, cityKey) => (dispatch(removeCity(favorites, cityKey))),
        getAutoComplete: (text) => (dispatch(getAutoCompleteByText(text))),
    };
};

const mapStateToProps = state => ({
    favorites: state.favorites,
    cityWeather: state.cityWeather,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);