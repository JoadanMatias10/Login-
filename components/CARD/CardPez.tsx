import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Definir la interfaz para el objeto pez
interface Pez {
  imagen: string;
  nombre: string;
  temperatura: string;
  ph: string;
  caracteristicas?: string;
  comida: string;
}

// Definir las props del componente CardPez
interface CardPezProps {
  pez: Pez;
}

const CardPez: React.FC<CardPezProps> = ({ pez }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: pez.imagen }}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{pez.nombre}</Text>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Temperatura:</Text> {pez.temperatura}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>pH:</Text> {pez.ph}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Características:</Text> {pez.caracteristicas}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Comida:</Text> {pez.comida}
        </Text>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default CardPez;