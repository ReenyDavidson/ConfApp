import React, {useEffect} from 'react';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import 'react-native-gesture-handler';
import DrawerNavigation from './navigation/DrawerNavigation';
import {setupBuild} from './100ms/100ms';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

// extend the theme
export const theme = extendTheme({config});

export default function App() {
  useEffect(() => {
    setupBuild()
      .then(build => {
        build;
      })
      .catch(error => {
        console.log(error, 'error');
      });
  }, []);

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
