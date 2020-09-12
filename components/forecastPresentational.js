import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import moment from "moment";

const forecastPresentational = (props) => {
    var cityIcon = 'glass';

    if (props.cityWeather?.temp?.metric < 20) {
        cityIcon = 'umbrella';
    }
    else if (props.cityWeather?.isDayTime) {
        cityIcon = 'camera-retro';
    }

    let renderItem = ({ item }) => (
        <View key={item.date} style={{ margin: 5 }}>
            <Text style={[styles.text, { alignSelf: 'auto' }]}> {item.date && moment().format(item.date)}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>{
                    props.isTempUnitMetric ?
                        item.temp?.min.metric
                        :
                        item.temp?.min.imperial
                }</Text>
                <Text style={styles.text}> - </Text>
                <Text style={styles.text}>{
                    props.isTempUnitMetric ?
                        item.temp?.max.metric
                        :
                        item.temp?.max.imperial
                }</Text>
            </View>
        </View>
    );

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
                    <FlatList
                        data={props.cityWeather?.dailyForecasts}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                    />
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