import React, {useEffect, useRef, useState} from 'react';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import 'react-native-gesture-handler';
import DrawerNavigation from './navigation/DrawerNavigation';
import {HMSProvider} from './components/HmsContext';
import {setupBuild} from './100ms/100ms';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({config});

export default function App() {
  const hmsInstance = useRef(null);
  const [hmsInstanceLoaded, setHmsInstanceLoaded] = useState(false);

  useEffect(() => {
    setupBuild().then(build => {
      hmsInstance.current = build;
      setHmsInstanceLoaded(true);
    });
  }, []);

  if (!hmsInstanceLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      {hmsInstanceLoaded ? <DrawerNavigation /> : null}
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.dark ? '#000' : '#fff'}
      />
    </NativeBaseProvider>
  );
}
