import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import ProductoCard from "../../../components/CARD/ProductosCard"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Definir la interfaz para el tipo "Producto"
interface Producto {
  _id: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  // Agrega otras propiedades según la respuesta de tu API
}

// Definir el tipo de las rutas
type RootStackParamList = {
  ProductosCategoria: { categoria: string }; // La pantalla "ProductosCategoria" recibe un parámetro "categoria"
  // Otras pantallas...
};

// Definir el tipo de las props de navegación
type ProductosScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProductosCategoria">;

const TodosLosProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]); // Estado tipado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<ProductosScreenNavigationProp>(); // Navegación tipada

  // Función para obtener todos los productos
  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://server-seven-iota-59.vercel.app/productos");
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
    fetchProductos();
  }, []);

  if (loading) {
    return <Text>Cargando productos...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Agrupar los productos por categoría
  const productosPorCategoria: { [key: string]: Producto[] } = productos.reduce((acc, producto) => {
    const categoria = producto.categoria;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {} as { [key: string]: Producto[] });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.productosCategorias}>
        {Object.keys(productosPorCategoria).map((categoria) => (
          <View key={categoria} style={styles.categoria}>
            <Text style={styles.categoriaTitle}>{categoria}</Text>
            <View style={styles.productosGrid}>
              {productosPorCategoria[categoria].slice(0, 3).map((producto) => (
                <ProductoCard key={producto._id} producto={producto} />
              ))}
            </View>
            <TouchableOpacity
              style={styles.verMasBtn}
              onPress={() => navigation.navigate("ProductosCategoria", { categoria: categoria.toLowerCase() })}
            >
              <Text style={styles.verMasBtnText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  productosCategorias: {
    flexDirection: "column",
    gap: 30,
  },
  categoria: {
    marginBottom: 20,
  },
  categoriaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  verMasBtn: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 25,
    alignItems: "center",
  },
  verMasBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TodosLosProductos;