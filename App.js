import React, {useEffect, useRef, useState} from 'react';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import 'react-native-gesture-handler';
import DrawerNavigation from './navigation/DrawerNavigation';
import HmsManager from '@100mslive/react-native-hms';

import {HMSProvider} from './components/HmsContext';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({config});

export default function App() {
  const [hmsInstanceLoaded, setHmsInstanceLoaded] = useState(false);
  const hmsInstance = useRef(null);

  useEffect(() => {
    HmsManager.build()
      .then(instance => {
        hmsInstance.current = instance;
        setHmsInstanceLoaded(true);
        console.log('HMS instance is loaded');
      })
      .catch(console.error);
  }, []);

  if (!hmsInstanceLoaded) {
    return null;
  }

  return (
    <HMSProvider value={hmsInstance.current}>
      <NativeBaseProvider theme={theme}>
        {hmsInstanceLoaded ? <DrawerNavigation /> : null}
        <StatusBar
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.dark ? '#000' : '#fff'}
        />
      </NativeBaseProvider>
    </HMSProvider>
  );
}

// Color Switch Component
{
  /* function ToggleDarkMode() {
   const { colorMode, toggleColorMode } = useColorMode();
   return (
     <HStack space={2} alignItems="center">
       <Text>Dark</Text>
       <Switch
         isChecked={colorMode === "light"}
         onToggle={toggleColorMode}
         aria-label={colorMode === "light" ? "switch to dark mode" : "switch to light mode"}
       />
       <Text>Light</Text>
     </HStack>
   );
   */
}
