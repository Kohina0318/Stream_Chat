import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationScreens from './src/NavigationScreens';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context/src';
import { ChatContextProvider } from './src/ChatContext';
import { AppProvider } from './src/AppContext';


export default function App() {
  return (
    <AppProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
          {/* <ChatContextProvider> */}
            <NavigationScreens />
          {/* </ChatContextProvider> */}
      </SafeAreaView>
    </GestureHandlerRootView>
    </AppProvider>
  );
}
