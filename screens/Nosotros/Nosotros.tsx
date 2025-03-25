import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import CardInfo from "../../components/CARD/CardInfo"; // Asegúrate de que este componente esté adaptado a React Native
import CardInfoS from "../../components/CARD/CardInfoSec"; // Asegúrate de que este componente esté adaptado a React Native
import '../Nosotros/Nosotros.css';

// Definir la interfaz para el tipo "Nosotros"
interface NosotrosData {
  mision: string;
  vision: string;
  valores: string;
}

const Nosotros = () => {
  const [nosotros, setNosotros] = useState<NosotrosData | null>(null); // Estado para almacenar los datos de "Nosotros"
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para obtener los datos de "Nosotros"
  const fetchNosotros = async () => {
    try {
      const response = await axios.get("https://server-seven-iota-59.vercel.app/nosotros"); // Ajusta la URL según tu backend
      setNosotros(response.data); // Guardar los datos en el estado
      setLoading(false); // Indicar que la carga ha terminado
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Guardar el mensaje de error
      } else {
        setError("Ocurrió un error desconocido"); // Manejar otros tipos de errores
      }
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  // Ejecutar la función al montar el componente
  useEffect(() => {
    fetchNosotros();
  }, []);

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingMessage}>Cargando información de Nosotros...</Text>
      </View>
    );
  }

  // Mostrar un mensaje de error si algo sale mal
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
      </View>
    );
  }

  // Renderizar la información de "Nosotros"
  return (
    <ScrollView contentContainerStyle={styles.nosotrosContainer}>
      <Text style={styles.nosotrosTitle}>Nosotros</Text>

      {nosotros ? ( // Verificar si "nosotros" no es null
        <View style={styles.nosotrosGrid}>
          {/* Misión */}
          <View style={styles.cardWrapper}>
            <CardInfo
              header="Misión"
              title="Nuestra Misión"
              text={nosotros.mision} // Usar la misión de "Nosotros"
            />
          </View>

          {/* Visión */}
          <View style={styles.cardWrapper}>
            <CardInfo
              header="Visión"
              title="Nuestra Visión"
              text={nosotros.vision} // Usar la visión de "Nosotros"
            />
          </View>

          {/* Valores */}
          <View style={[styles.cardWrapper, styles.fullWidth]}>
            <CardInfoS
              header="Valores"
              title="Nuestros Valores"
              text={nosotros.valores} // Usar los valores de "Nosotros"
            />
          </View>
        </View>
      ) : (
        <Text>No se encontraron datos.</Text> // Mensaje si "nosotros" es null
      )}
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  nosotrosContainer: {
    padding: 20,
    maxWidth: 4000,
    margin: 0,
    alignItems: "center",
  },
  nosotrosTitle: {
    fontSize: 24,
    color: "#333",
    marginBottom: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  nosotrosGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 30,
  },
  cardWrapper: {
    width: "100%", // Dos columnas con un pequeño espacio entre ellas
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%", // Ocupa el ancho completo
    maxWidth: 800, // Limitar el ancho máximo
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMessage: {
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 18,
    color: "#ff0000",
  },
});

export default Nosotros;