/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NativeBaseProvider, extendTheme, StatusBar} from 'native-base';
import 'react-native-gesture-handler';
import DrawerNavigation from './navigation/DrawerNavigation';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({config});

export default function App() {
  return (
    <NativeBaseProvider>
      <DrawerNavigation />
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.dark ? '#000' : '#fff'}
      />
    </NativeBaseProvider>
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
