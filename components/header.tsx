import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Header1 {
  title: string;
}

const Header: React.FC<Header1> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0288D1',
    height: 80,
    justifyContent: "center", // Centra verticalmente el texto
    alignItems: "center",
    paddingTop: 10, // Agregamos espacio extra arriba
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;