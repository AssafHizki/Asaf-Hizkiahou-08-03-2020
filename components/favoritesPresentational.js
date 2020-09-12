import React from 'react';
import { Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const noFavoritesText = "Looks like you don't have any favorites... Search a city and mark it as favorite!";

const favoritesPresentational = (props) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ marginVertical: 10, borderColor: 'black', borderWidth: 1 }}
            onPress={() => props.getCity(item)} >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{
                props.isTempUnitMetric ?
                    item.temp?.metric
                    :
                    item.temp?.imperial}
            </Text>
            <Text style={[styles.text, { fontSize: 16 }]}>{item.weatherText}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            {
                props.favoritesItems.length === 0 ?
                    <Text style={styles.text}>{noFavoritesText}</Text>
                    :
                    <FlatList
                        data={props.favoritesItems}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                    />
            }
        </SafeAreaView>
    );
}

favoritesPresentational.propTypes = {
    isTempUnitMetric: PropTypes.bool,
    favoritesItems: PropTypes.array.isRequired,
    getCity: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18
    },
})

export default favoritesPresentational;