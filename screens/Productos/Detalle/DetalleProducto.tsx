import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRoute, RouteProp } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useAuth } from "../../../components/contexts/AuthContext";

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

// Definir la interfaz para los dispositivos
interface Dispositivo {
  producto_id: string;
  estado: string;
}

// Tipado para la ruta
type RutaDetalleProductoParams = {
  DetalleProducto: { id: string };
};

const DetalleProducto = () => {
  const route = useRoute<RouteProp<RutaDetalleProductoParams, "DetalleProducto">>();
  const { id } = route.params;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { role, userId } = useAuth();
  const [yaAgregado, setYaAgregado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Obtener detalles del producto
  const fetchProducto = async () => {
    try {
      const response = await axios.get<Producto>(`https://server-seven-iota-59.vercel.app/productos/${id}`);
      setProducto(response.data);
      setLoading(false);
    } catch (err) {
      setError("Producto no encontrado");
      setLoading(false);
    }
  };

  // Verificar si el producto ya está agregado
  useEffect(() => {
    const verificarSiYaAgregado = async () => {
      if (userId && id) {
        try {
          const response = await axios.get<Dispositivo[]>(`https://server-seven-iota-59.vercel.app/dispositivos/${userId}`);
          const dispositivosActivos = response.data.filter((d: Dispositivo) => d.estado === "activo");
          const yaAgregado = dispositivosActivos.some((d) => d.producto_id === id);
          setYaAgregado(yaAgregado);
        } catch (error) {
          console.error("Error al verificar si el producto ya está agregado:", error);
        }
      }
    };

    verificarSiYaAgregado();
  }, [userId, id]);

  // Agregar producto a dispositivos del usuario
  const handleAgregar = async () => {
    if (!userId || !id) {
      setMensaje("Debes iniciar sesión para agregar productos.");
      return;
    }

    try {
      await axios.post("https://server-seven-iota-59.vercel.app/dispositivos/agregar", {
        usuario_id: userId,
        producto_id: id,
      });
      setMensaje("Producto agregado con éxito.");
      setYaAgregado(true);
    } catch (error) {
      setMensaje("Error al agregar el producto.");
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;
  if (!producto) return <Text>No se encontró el producto.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Producto</Text>
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
            {role === "publico" && <Text>Inicia sesión para agregar</Text>}
            {role === "Cliente" && (
              <Button title={yaAgregado ? "Agregado ✅" : "Agregar"} onPress={handleAgregar} disabled={yaAgregado} />
            )}
            {mensaje && <Text style={styles.mensaje}>{mensaje}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

// Estilos
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
  mensaje: {
    marginTop: 10,
    fontSize: 14,
    color: "green",
  },
});

export default DetalleProducto;
