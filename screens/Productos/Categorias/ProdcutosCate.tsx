import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import ProductoCard from "../../../components/CARD/ProductosCard"; // Asegúrate de que la ruta sea correcta
import { RouteProp, useRoute } from "@react-navigation/native"; // Para obtener parámetros de la ruta

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

type RutaAllProductsParams = {
  AllProducts: { categoria: string };
};

const AllProducts = () => {
  const route = useRoute<RouteProp<RutaAllProductsParams, "AllProducts">>();
  const { categoria } = route.params;
  const [productos, setProductos] = useState<Producto[]>([]); // Estado tipado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado tipado

  // Función para obtener productos de la categoría seleccionada
  const fetchProductos = async () => {
    try {
      const response = await axios.get(`https://server-seven-iota-59.vercel.app/productos/${categoria}`);
      setProductos(response.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Guardar el mensaje de error
      } else {
        setError("Ocurrió un error desconocido"); // Manejar otros tipos de errores
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoria) {
      fetchProductos();
    }
  }, [categoria]); // Dependemos de la categoría para hacer la nueva petición

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.allProductsContainer}>
      <Text style={styles.title}>
        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item._id}
        numColumns={2} // Muestra 2 columnas
        columnWrapperStyle={styles.productosGrid}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductoCard producto={item} />
          </View>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  allProductsContainer: {
    padding: 10, // Espacio a los lados
    margin: 0,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  productosGrid: {
    justifyContent: "space-between", // Distribuye el espacio entre las tarjetas
  },
  cardContainer: {
    flex: 1, // Ocupa el espacio disponible
    maxWidth: "48%", // Asegura que no exceda el 48% del ancho (2 columnas)
    margin: 5, // Margen adicional para separación
  },
});

export default AllProducts;