import React from "react";
import tabNavigator from './tabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { mainHeader } from './headerStyle';
import ErrorBoundary from '../components/errorBoundary';

const stackNavigator = createStackNavigator();

const DefaultNavigator = () => {
    return (
        <ErrorBoundary>
            <stackNavigator.Navigator screenOptions={mainHeader}>
                <stackNavigator.Screen name="Home" component={tabNavigator} />
            </stackNavigator.Navigator>
        </ErrorBoundary>
    );
}

export default (DefaultNavigator);