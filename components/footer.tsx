import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Mi Aplicación</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0288D1',
    padding: 15,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
  },
});

export default Footer;
