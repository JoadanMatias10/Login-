import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu'; // Importar MenuProvider

// Cloudinary
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

// Importación de Componentes
import Header from './components/HeaderF/Header';
import Footer from './components/Footer/Footer';

// Importar el AuthProvider
import { AuthProvider } from './components/contexts/AuthContext';
import MainContent from './MainContent'; // Importar el nuevo componente

const App = () => {
  // Configuración de Cloudinary
  const cld = new Cloudinary({ cloud: { cloudName: 'dn3yputmz' } });

  // Uso de una imagen de muestra de Cloudinary
  const img = cld
    .image('cld-sample-5')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  return (
    <MenuProvider> {/* Envuelve todo con MenuProvider */}
      <AuthProvider>
        <NavigationContainer>
          <MainContent />
        </NavigationContainer>
      </AuthProvider>
    </MenuProvider>
  );
};

export default App;