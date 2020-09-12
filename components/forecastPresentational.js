import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const forecastPresentational = (props) => {
    var cityIcon = 'glass';

    if (props.cityWeather?.temp?.metric < 20) {
        cityIcon = 'umbrella';
    }
    else if (props.cityWeather?.isDayTime) {
        cityIcon = 'camera-retro';
    }

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: props.backgroundColor }}>
                <View style={{ margin: 10 }}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name={cityIcon} size={40} color="#fff" />
                            <View style={{ marginHorizontal: 4 }}>
                                <Text style={styles.text}>{props.cityWeather?.name}</Text>
                                <Text style={styles.text}>{props.isTempUnitMetric ?
                                    props.cityWeather?.temp?.metric
                                    :
                                    props.cityWeather?.temp?.imperial}
                                </Text>
                            </View>
                        </View>
                        <View>
                            {
                                props.isFavorite ?
                                    <TouchableOpacity onPress={() => { props.removeFromFavorites() }}>
                                        <Icon name="heart" size={40} color="green" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { props.addToFavorites() }}>
                                        <Icon name="heart-o" size={40} color="green" />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.text, { fontSize: 25, marginVertical: 10 }]}>{props.cityWeather?.weatherText}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {props.cityWeather?.dailyForecasts.map((day) => {
                            return (
                                <View key={day.date}>
                                    <Text style={styles.text}> {day.date?.toLocaleString('en-us', { weekday: 'long' })}</Text>
                                    <Text style={styles.text}>{
                                        props.isTempUnitMetric ?
                                            day.temp?.max.metric
                                            :
                                            day.temp?.max.imperial
                                    }</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

forecastPresentational.propTypes = {
    backgroundColor: PropTypes.string,
    isTempUnitMetric: PropTypes.bool,
    isFavorite: PropTypes.bool,
    cityWeather: PropTypes.object.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18
    },
    header: {
        flexDirection: 'row',
        alignItems: "stretch",
        paddingHorizontal: 15,
        justifyContent: "space-between"
    },
})

export default forecastPresentational;