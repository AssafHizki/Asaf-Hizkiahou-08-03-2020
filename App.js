import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './routes'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './routes/rootNavigation';
import { View } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react'
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  ScreenOrientation.unlockAsync();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        {/* Screen Top Color */}
        <View style={{ padding: 15, backgroundColor: '#fff' }} />

        <NavigationContainer ref={navigationRef}>
          <Navigator />
        </NavigationContainer >
      </PersistGate>
    </Provider>
  )
}