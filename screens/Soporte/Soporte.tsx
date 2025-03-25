// screens/Soporte/Soporte.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SoporteAcordeon from '../../components/Accordion/AccordionSoporte';
import GuiaAcordeon from '../../components/Accordion/GuiaAcordeon';
import CardContac from '../../components/CARD/CardsClient/CardContac';

const Soporte = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Título de Soporte */}
      <Text style={styles.title}>Soporte</Text>
      <SoporteAcordeon />

      {/* Título de Guía de Usuario */}
      <Text style={styles.title}>Guía de Usuario</Text>
      <GuiaAcordeon />

      {/* Título de Contáctanos */}
      <Text style={styles.title}>Contáctanos</Text>
      <CardContac />
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

export default Soporte;