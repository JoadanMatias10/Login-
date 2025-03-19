import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// Definir la interfaz para el objeto producto
interface Producto {
  imagen?: string;
  nombre: string;
  precio: number;
}

// Definir las props del componente ProductoCard
interface ProductoCardProps {
  producto: Producto;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: producto.imagen }}
        style={styles.cardImageTop}
        resizeMode="contain"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{producto.nombre}</Text>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Precio:</Text> ${producto.precio.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    width: "90%",
    maxWidth: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  cardImageTop: {
    width: "100%",
    height: 200,
  },
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default ProductoCard;