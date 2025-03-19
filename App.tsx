// App.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Importación de Componentes
import Header from './components/HeaderF/Header';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/Nav';

// Importar navegación
import AppNavigator from './navigation/AppNavigator';

// Importar el AuthProvider
import { AuthProvider } from './components/contexts/AuthContext';
import MainContent from './MainContent';

const App = () => {
  return (
    <AuthProvider>
      <View style={styles.container}>
        {/* Header */}
        <Header
          titulo="FishCare"
          imagen="https://res.cloudinary.com/dn3yputmz/image/upload/v1741654718/Pagina/ol74oiubojbytdyhijhc.png"
        />
        
        {/* Navegación */}
        <AppNavigator />
        <MainContent/>
        {/* Footer */}
        <Footer />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;