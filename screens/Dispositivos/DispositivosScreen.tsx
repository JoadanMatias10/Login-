import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext';
import DispositivoCard from '../../components/CARD/CardsClient/DispositivoCard';

// Define el tipo para los productos
interface Producto {
  producto_id: {
    _id: string;
    nombre?: string;
    descripcion?: string;
    imagen?: string;
    ip?: string;
  };
}

const DispositivosScreen = () => {
  const { userId } = useAuth(); // Obtienes el userId del contexto
  const [productos, setProductos] = useState<Producto[]>([]); // Especifica el tipo de productos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos del usuario
  const fetchProductos = () => {
    if (!userId) {
      setError('Usuario no autenticado.');
      setLoading(false);
      return;
    }

    axios
      .get(`https://server-seven-iota-59.vercel.app/dispositivos/${userId}`)
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener dispositivos');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchProductos();
    }
  }, [userId]);

  // Eliminar producto
  const eliminarProducto = (producto_id: string) => {
    axios
      .delete(`https://server-seven-iota-59.vercel.app/dispositivos/eliminar/${userId}/${producto_id}`)
      .then(() => {
        setProductos((prevProductos) =>
          prevProductos.filter((p) => p.producto_id._id !== producto_id) // Elimina solo el producto con ese id
        );
      })
      .catch(() => setError('Error al eliminar producto'));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando dispositivos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis Dispositivos</Text>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.productosContainer}>
        {productos.length > 0 ? (
          productos.map((item) => (
            <DispositivoCard
              key={item.producto_id._id}
              producto={item.producto_id}
              usuario_id={userId} // 🔹 Ahora pasamos usuario_id
              eliminarProducto={eliminarProducto} // 🔹 Pasa la propiedad
            />
          ))
        ) : (
          <Text>No tienes dispositivos agregados.</Text>
        )}
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  productosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default DispositivosScreen;