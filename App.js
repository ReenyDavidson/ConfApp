import React from 'react';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import 'react-native-gesture-handler';
import DrawerNavigation from './navigation/DrawerNavigation';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
export const theme = extendTheme({config});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <DrawerNavigation />
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.dark ? '#000' : '#fff'}
      />
    </NativeBaseProvider>
  );
}
