import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import ProductoCard from "../../../components/CARD/CardsClient/ProductosCard"; // Adjust the path as needed

// Definir la interfaz para el tipo "Producto"
interface Producto {
  _id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
}

const AllProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://server-seven-iota-59.vercel.app/productos");
      setProductos(response.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Producto }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("Ver detalles de:", item.nombre);
      }}
      style={styles.cardContainer}
    >
      <ProductoCard producto={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2} // For grid-like layout
        columnWrapperStyle={styles.row} // For grid spacing
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    width: '48%', // Approximately half width minus margin
  },
});

export default AllProducts;