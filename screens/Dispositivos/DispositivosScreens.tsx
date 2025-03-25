import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useAuth } from "../../components/contexts/AuthContext";
import DispositivoCard from "../../components/CARD/CardsClient/DispositivoCard";
import { ActivityIndicator } from "react-native";

const DispositivosScreen = () => {
  const { userId } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos del usuario
  const fetchProductos = () => {
    if (!userId) {
      setError("Usuario no autenticado.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://server-seven-iota-59.vercel.app/dispositivos/${userId}`)
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener dispositivos");
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
          prevProductos.filter((p: any) => p.producto_id._id !== producto_id)
        );
      })
      .catch(() => {
        Alert.alert("Error", "Error al eliminar producto");
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#0000ff" size="large" />
        <Text style={styles.loadingText}>Cargando dispositivos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mis Dispositivos</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {productos.length > 0 ? (
        <View style={styles.cardsContainer}>
          {productos.map((item: any) => (
            <DispositivoCard
              key={item.producto_id._id}
              producto={item.producto_id}
              usuario_id={userId}
              eliminarProducto={eliminarProducto}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.noDevicesText}>No tienes dispositivos agregados.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noDevicesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 20,
  },
});

export default DispositivosScreen;