import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

interface NosotrosData {
  mision: string;
  vision: string;
  valores: string;
}

const NosotrosCards = () => {
  const [nosotros, setNosotros] = useState<NosotrosData | null>(null);

  useEffect(() => {
    fetch("https://server-seven-iota-59.vercel.app/nosotros")
      .then((res) => res.json())
      .then((data: NosotrosData) => setNosotros(data))
      .catch((error) => console.error("Error al obtener los datos", error));
  }, []);

  if (!nosotros) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Card de Misión */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Misión</Text>
        <Text style={styles.text}>{nosotros.mision}</Text>
      </View>

      {/* Card de Visión */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Visión</Text>
        <Text style={styles.text}>{nosotros.vision}</Text>
      </View>

      {/* Card de Valores */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Valores</Text>
        <Text style={styles.text}>{nosotros.valores}</Text>
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
    color: "#666",
  },
});

export default NosotrosCards;