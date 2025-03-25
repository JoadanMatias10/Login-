import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importación de Componentes
import NavBar from './components/NavBar/Nav';


// Importación de pantallas
import Nosotros from './screens/Nosotros/Nosotros';
import Login from './screens/Login/Login';
import Cloudi from './screens/Cloudinary/Cloudinary';
import AllProducts from './screens/Productos/All/AllProducts';
import Alimentos from './screens/Productos/Categorias/ProdcutosCate';
import TodosLosProductos from './screens/Productos/Todos/TodosLosProductos';
import PecesView from './screens/Peces/PecesView';
import DetalleProducto from './screens/Productos/Detalle/DetalleProducto';
import RegistroForm from './screens/Registro/Registro';
import Home from './screens/Home/home';
import Soporte from './screens/Soporte/Soporte';
import Dispositivos from './screens/Dispositivos/DispositivosScreen';
import Pecera from './screens/Esp32Dashboard/Esp32Dashboard';

import { useAuth } from './components/contexts/AuthContext';

import Header from './components/HeaderF/Header';
import Footer from './components/Footer/Footer';
import NavBarClient from './components/NavBar/NavCliente';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainContent = () => {
  const { role } = useAuth();  // Obtener el rol desde el contexto de autenticación

  const PublicStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Nosotros" component={Nosotros} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registro" component={RegistroForm} />
      <Stack.Screen name="Cloudi" component={Cloudi} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen name="TodosLosProductos" component={TodosLosProductos} />
      <Stack.Screen name="PecesView" component={PecesView} />
      <Stack.Screen name="DetalleProducto" component={DetalleProducto} />
      <Stack.Screen name="Alimentos" component={Alimentos} />
      <Stack.Screen name="Soporte" component={Soporte} />
    </Stack.Navigator>
  );

  const ClientStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Nosotros" component={Nosotros} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registro" component={RegistroForm} />
      <Stack.Screen name="Cloudi" component={Cloudi} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen name="TodosLosProductos" component={TodosLosProductos} />
      <Stack.Screen name="PecesView" component={PecesView} />
      <Stack.Screen name="DetalleProducto" component={DetalleProducto} />
      <Stack.Screen name="Alimentos" component={Alimentos} />
      <Stack.Screen name="Soporte" component={Soporte} />
      <Stack.Screen name="Dispositivos" component={Dispositivos} />
      <Stack.Screen name="Pecera" component={Pecera} />
    </Stack.Navigator>
  );

  return (
    <View style={styles.container}>
      <Header titulo="FishCare" imagen="https://res.cloudinary.com/dn3yputmz/image/upload/v1741654718/Pagina/ol74oiubojbytdyhijhc.png" />
      <View style={styles.content}>
        {role === 'publico' && <NavBar />}
        {role === 'Cliente' && <NavBarClient />}

        {role === 'publico' && <PublicStack />}
        {role === 'Cliente' && <ClientStack />}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // El contenido principal ocupa todo el espacio disponible
  },
});

export default MainContent;