import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationScreens from './src/NavigationScreens';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context/src';
import { ChatContextProvider } from './src/ChatContext';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
          <ChatContextProvider>
            <NavigationScreens />
          </ChatContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
