import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Details from './src/pages/Details';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontSize: 20, // ✅ Evita o erro
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="COTACOM" component={Home} />
        <Stack.Screen name="Detalhes" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
