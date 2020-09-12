import React from 'react';
import { getCity } from "../redux/actions/cityWeatherActions";
import { connect } from 'react-redux';
import { View, ActivityIndicator, Text } from "react-native";
import FavoritesPresentational from './favoritesPresentational';

const FavoritesContainer = (props) => {
    var backgroundColor = props.user.isThemeDark ? '#00008b' : '#87ceeb';

    let renderView = () => {
        if (props.favorites.loading)
            return <ActivityIndicator />;

        if (props.favorites.err) {
            return <Text style={{ color: 'red', alignSelf: 'center' }}>{props.favorites.err}</Text>
        }

        return (
            <FavoritesPresentational favoritesItems={props.favorites.items}
                getCity={(city) => props.getCity(city)} isTempUnitMetric={props.user.isTempUnitMetric}
            />
        );
    }

    return (
        <View style={{ backgroundColor: backgroundColor, height: '100%' }}>
            {renderView()}
        </View>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getCity: (cityObj) => (dispatch(getCity(cityObj))),
    };
};

const mapStateToProps = state => ({
    favorites: state.favorites,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);