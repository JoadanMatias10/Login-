import React, { useEffect, useState } from "react";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native"; // Para obtener parámetros de la ruta
import { View, Text, Image, StyleSheet, ActivityIndicator, Button } from "react-native";

// Definir la interfaz para el tipo "Producto"
interface Producto {
  _id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  // Agrega otras propiedades según la respuesta de tu API
}

type RutaDetalleProductoParams = {
  DetalleProducto: { id: string };
};

const DetalleProducto = () => {
  const route = useRoute<RouteProp<RutaDetalleProductoParams, "DetalleProducto">>();
  const { id } = route.params;
  const [producto, setProducto] = useState<Producto | null>(null); // Estado tipado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado tipado

  // Función para obtener el detalle del producto
  const fetchProducto = async () => {
    try {
      const response = await axios.get(`https://server-seven-iota-59.vercel.app/productos/${id}`);
      setProducto(response.data);
      setLoading(false);
    } catch (err) {
      setError("Producto no encontrado");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Producto</Text>
      {producto && (
        <View style={styles.detalleProducto}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: producto.imagen }} style={styles.image} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <Text style={styles.text}><Text style={styles.label}>Categoría:</Text> {producto.categoria}</Text>
            <Text style={styles.text}><Text style={styles.label}>Descripción:</Text> {producto.descripcion}</Text>
            <Text style={styles.text}><Text style={styles.label}>Precio:</Text> ${producto.precio.toFixed(2)}</Text>
            <Text style={styles.text}><Text style={styles.label}>Stock:</Text> {producto.stock}</Text>
            <View style={styles.actions}>
              <Button title="Agregar al carrito" onPress={() => {}} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  detalleProducto: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    maxWidth: 600,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  actions: {
    marginTop: 20,
  },
});

export default DetalleProducto;