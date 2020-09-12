import HeaderLeftButton from './headerLeftButton';
import HeaderRightButton from './headerRightButton';
import React from 'react';

export const mainHeader = {
    title: 'Weather App',
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: '#0d98ba',
    },
    headerTintColor: '#fff',
    headerStatusBarHeight: -5,
    headerLeft: ({ }) => <HeaderLeftButton />,
    headerRight: ({ }) => <HeaderRightButton />,
};