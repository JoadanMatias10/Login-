// screens/Home/home.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProductoCard from '../../components/CARD/CardsClient/ProductosCard';
import CardPez from '../../components/CARD/CardsClient/CardPez';

// Definir interfaces para los datos
interface Producto {
  _id: string;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
}

interface Pez {
  _id: string;
  nombre: string;
  imagen: string;
  temperatura: string;
  ph: string;
  comida: string;
  caracteristicas?: string;
}

// Definir los tipos de las rutas
type RootStackParamList = {
  Home: undefined;
  DetalleProducto: { id: string };
  // Otras pantallas...
};

// Tipo para la navegación
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoEstrella, setProductoEstrella] = useState<Producto | null>(null);
  const [peces, setPeces] = useState<Pez[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEstrella, setLoadingEstrella] = useState(true);
  const [loadingPeces, setLoadingPeces] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorEstrella, setErrorEstrella] = useState<string | null>(null);
  const [errorPeces, setErrorPeces] = useState<string | null>(null);

  const productoEstrellaId = '67ca1ee6b2073e232e16a439'; // Sustituye con el id real del producto estrella
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    // Obtener todos los productos
    const fetchProductos = async () => {
      try {
        const response = await axios.get<Producto[]>('https://server-seven-iota-59.vercel.app/productos');
        setProductos(response.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido al obtener los productos.');
        }
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    // Obtener el producto estrella
    const fetchProductoEstrella = async () => {
      try {
        const response = await axios.get<Producto>(`https://server-seven-iota-59.vercel.app/productos/${productoEstrellaId}`);
        setProductoEstrella(response.data);
        setLoadingEstrella(false);
      } catch (err) {
        if (err instanceof Error) {
          setErrorEstrella(err.message);
        } else {
          setErrorEstrella('Ocurrió un error desconocido al obtener el producto estrella.');
        }
        setLoadingEstrella(false);
      }
    };

    fetchProductoEstrella();
  }, [productoEstrellaId]);

  useEffect(() => {
    // Obtener los peces
    const fetchPeces = async () => {
      try {
        const response = await axios.get<Pez[]>('https://server-seven-iota-59.vercel.app/peces');
        setPeces(response.data);
        setLoadingPeces(false);
      } catch (err) {
        if (err instanceof Error) {
          setErrorPeces(err.message);
        } else {
          setErrorPeces('Ocurrió un error desconocido al obtener los peces.');
        }
        setLoadingPeces(false);
      }
    };

    fetchPeces();
  }, []);

  const productosDestacados = productos.slice(0, 5); // Solo mostramos 5 productos

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorMessage}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Sección de bienvenida */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>¡Bienvenido a FishCare!</Text>
        <Text style={styles.welcomeText}>
          Encuentra los mejores productos para tu acuario y cuida de tus peces con nuestra ayuda.
        </Text>
      </View>

      {/* Carrusel de productos relevantes */}
      <View style={styles.carouselSection}>
        <Text style={styles.sectionTitle}>Productos Relevantes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productosDestacados.map((producto) => (
            <TouchableOpacity
              key={producto._id}
              style={styles.carouselItem}
              onPress={() => navigation.navigate('DetalleProducto', { id: producto._id })}
            >
              <Image source={{ uri: producto.imagen }} style={styles.carouselImage} />
              <View style={styles.carouselCaption}>
                <Text style={styles.carouselCaptionText}>{producto.nombre}</Text>
                <Text style={styles.carouselCaptionText}>${producto.precio}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Información sobre peces */}
      {loadingPeces ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : errorPeces ? (
        <Text style={styles.errorMessage}>{errorPeces}</Text>
      ) : (
        <View style={styles.fishInfoSection}>
          <Text style={styles.sectionTitle}>Información sobre Peces</Text>
          <View style={styles.fishCardContainer}>
            {peces.slice(0, 3).map((pez) => (
              <CardPez key={pez._id} pez={pez} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

// Estilos (igual que antes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  carouselSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  carouselItem: {
    width: 200,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  carouselImage: {
    width: '100%',
    height: 150,
  },
  carouselCaption: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  carouselCaptionText: {
    color: '#fff',
    textAlign: 'center',
  },
  featureProductSection: {
    marginBottom: 30,
  },
  fishInfoSection: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 10,
  },
  fishCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 15,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Home;