// components/CARD/CardsClient/CardContac.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Linking, StyleSheet, ActivityIndicator } from 'react-native';

// Definir la interfaz para los datos de contacto
interface Contacto {
  horario_atencion: string;
  email: string;
  whatsapp: string;
  telefono: string;
}

const CardContac = () => {
  const [contacto, setContacto] = useState<Contacto | null>(null);

  useEffect(() => {
    fetch('https://server-seven-iota-59.vercel.app/contacto')
      .then((res) => res.json())
      .then((data: Contacto) => setContacto(data))
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  if (!contacto) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contacto.email}`);
  };

  const handleWhatsAppPress = () => {
    Linking.openURL(`https://wa.me/${contacto.whatsapp.replace(/\s/g, '')}`);
  };

  return (
    <View style={styles.container}>
      {/* Card de Contacto */}
      <View style={styles.card}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Horario de Atención:</Text> {contacto.horario_atencion}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Email:</Text>{' '}
          <Text style={styles.link} onPress={handleEmailPress}>
            {contacto.email}
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>WhatsApp:</Text>{' '}
          <Text style={styles.link} onPress={handleWhatsAppPress}>
            {contacto.whatsapp}
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Teléfono:</Text> {contacto.telefono}
        </Text>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default CardContac;