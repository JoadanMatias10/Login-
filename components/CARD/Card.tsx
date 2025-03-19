import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CardV = () => {
  return (
    <View style={styles.card}>
      {/* Imagen de la tarjeta */}
      <Image
        source={{ uri: "https://via.placeholder.com/150" }} // URL de la imagen
        style={styles.cardImage}
        resizeMode="cover"
      />

      {/* Cuerpo de la tarjeta */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>Card title</Text>
        <Text style={styles.cardText}>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </Text>

        {/* Botón de acción */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go somewhere</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    width: "80%", // Ancho relativo
    maxWidth: 300, // Ancho máximo
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
    margin: 10,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 15,
    color: "#555",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardV;