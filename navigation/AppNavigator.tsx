// navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de Pantallas (mantén las mismas importaciones)
import IoT from '../screens/IoT/IoT';
// ... resto de importaciones

const Stack = createStackNavigator();

// Nota: Ya NO incluimos NavigationContainer aquí
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Registro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IoT" component={IoT} />
      {/* ... resto de tus pantallas */}
    </Stack.Navigator>
  );
};

export default AppNavigator;