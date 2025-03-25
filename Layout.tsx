import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Header from './components/HeaderF/Header';
import Footer from './components/Footer/Footer';

// Definir el tipo de las props
interface LayoutProps {
  children: ReactNode; // children es de tipo ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Header titulo="FishCare" imagen="https://res.cloudinary.com/dn3yputmz/image/upload/v1741654718/Pagina/ol74oiubojbytdyhijhc.png" />
      <View style={{ flex: 1 }}>{children}</View>
      <Footer />
    </View>
  );
};

export default Layout;