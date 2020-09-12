import React from "react";
import { FavoritesScreen, ForecastScreen } from '../components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { mainHeader } from './headerStyle';
import { connect } from 'react-redux';
import { refreshFavoritesData } from '../redux/actions/favoritesActions';

const mainNavigator = createMaterialTopTabNavigator();

const TabNavigator = (props) => {

    return (
        <mainNavigator.Navigator initialRouteName='Home' swipeEnabled={true}
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}>
            <mainNavigator.Screen name="Home" component={ForecastScreen} />
            <mainNavigator.Screen name="Favorites" component={FavoritesScreen}
                listeners={{//On every press -> reload favorites data
                    tabPress: e => {
                        e.preventDefault();
                        props.getFavoritesData(props.favorites.items);
                    },
                }}

            />
        </mainNavigator.Navigator>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        getFavoritesData: (favorites) => (dispatch(refreshFavoritesData(favorites))),
    };
};

const mapStateToProps = state => ({
    favorites: state.favorites,
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);