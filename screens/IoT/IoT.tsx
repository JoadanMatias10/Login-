import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function IoT() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Bienvenido a Home</Text>
      <Text style={styles.text}>Esta es la pantalla de inicio.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default IoT;