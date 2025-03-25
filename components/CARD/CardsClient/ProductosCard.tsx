import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Definir el tipo de las rutas
type RootStackParamList = {
  DetalleProducto: { id: string }; // Pantalla de detalles del producto
};

// Definir el tipo de las props de navegación
type ProductoCardNavigationProp = StackNavigationProp<RootStackParamList, "DetalleProducto">;

// Definir la interfaz para el tipo "Producto"
interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock?: number; // Opcional
}

// Definir las props del componente ProductoCard
interface ProductoCardProps {
  producto: Producto;
  onPress?: () => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto }) => {
  const navigation = useNavigation<ProductoCardNavigationProp>();

  // Asegurar que producto no es undefined y manejar valores faltantes
  if (!producto) {
    return (
      <View style={styles.cardError}>
        <Text>Producto no disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Imagen del producto */}
      <Image
        source={{ uri: producto.imagen || "https://via.placeholder.com/300" }} // Evita imágenes faltantes
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        {/* Nombre del producto */}
        <Text style={styles.cardTitle}>{producto.nombre || "Producto Desconocido"}</Text>
        {/* Precio y stock del producto */}
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Precio:</Text> $
          {producto.precio ? producto.precio.toFixed(2) : "No disponible"}
        </Text>
        {/* Botón de acción */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DetalleProducto", { id: producto._id })}
        >
          <Text style={styles.buttonText}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    width: "100%", // Ancho relativo
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Sombra en Android
  },
  cardImage: {
    width: "100%",
    height: 200,
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
    color: "#333",
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardError: {
    padding: 20,
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
});

export default ProductoCard;