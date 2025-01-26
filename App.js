import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './i18n'; // Import the i18n configuration
import LanguageSwitcher from './components/LanguageSwitcher'; // Import the LanguageSwitcher
import Stats from './components/stats/Stats'; // Import the Stats component

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LanguageSwitcher />
        <Stack.Navigator>
          <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


