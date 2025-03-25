import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CardPez from '../../components/CARD/CardsClient/CardPez'; // Asegúrate de que la ruta sea correcta

// Definir la interfaz para el tipo "Pez"
interface Pez {
  _id: string;
  nombre: string;
  descripcion: string;
  imagen: string; // Asegúrate de que esta propiedad esté definida
  temperatura: string; // Asegúrate de que esta propiedad esté definida
  ph: string; // Asegúrate de que esta propiedad esté definida
  características: string; // Asegúrate de que esta propiedad esté definida
  comida: string; // Asegúrate de que esta propiedad esté definida
}

const PecesView = () => {
  const [peces, setPeces] = useState<Pez[]>([]); // Estado tipado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos de los peces
  const fetchPeces = async () => {
    try {
      const response = await axios.get('https://server-seven-iota-59.vercel.app/peces');  // Aquí pones la URL correcta de tu API
      setPeces(response.data);  // Guardar los datos en el estado
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);  // Capturar el error en caso de fallar
      } else {
        setError("Ocurrió un error desconocido"); // Manejar otros tipos de errores
      }
      setLoading(false);
    }
  };

  // Cargar los peces al montar el componente
  useEffect(() => {
    fetchPeces();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;  // Indicador de carga
  }

  if (error) {
    return <Text>Error: {error}</Text>;  // Mostrar el error si ocurre
  }

  return (
    <View style={styles.pecesViewContainer}>
      <Text style={styles.title}>Todos los Peces</Text>
      <FlatList
        data={peces}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <CardPez pez={item} />}
        contentContainerStyle={styles.pecesGrid}
        showsVerticalScrollIndicator={true} // Mostrar la barra de desplazamiento vertical
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pecesViewContainer: {
    padding: 20,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  pecesGrid: {
    gap: 20,
    paddingBottom: 100, // Añade un poco de padding para evitar que los elementos se toquen con la barra de desplazamiento
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default PecesView;
