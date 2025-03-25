import React, { useEffect, useState } from "react";
import { View, Text, Linking, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

// Define el tipo para los datos de contacto
type ContactoData = {
  ubicacion: {
    ciudad: string;
    estado: string;
    pais: string;
    direccion: string;
  };
  horario_atencion: string;
  email: string;
  whatsapp: string;
  telefono: string;
};

const ContactoCards = () => {
  const [contacto, setContacto] = useState<ContactoData | null>(null);

  useEffect(() => {
    fetch("https://server-seven-iota-59.vercel.app/contacto")
      .then((res) => res.json())
      .then((data: ContactoData) => setContacto(data))
      .catch((error) => console.error("Error al obtener los datos", error));
  }, []);

  if (!contacto) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Card de Ubicación */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ubicación</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Ciudad:</Text> {contacto.ubicacion.ciudad}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Estado:</Text> {contacto.ubicacion.estado}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>País:</Text> {contacto.ubicacion.pais}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Dirección:</Text> {contacto.ubicacion.direccion}
        </Text>
      </View>

      {/* Card de Contacto */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contacto</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Horario de Atención:</Text> {contacto.horario_atencion}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Email:</Text>{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(`mailto:${contacto.email}`)}
          >
            {contacto.email}
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>WhatsApp:</Text>{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(`https://wa.me/${contacto.whatsapp.replace(/\s/g, "")}`)
            }
          >
            {contacto.whatsapp}
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>Teléfono:</Text> {contacto.telefono}
        </Text>
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default ContactoCards;