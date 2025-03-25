// components/Accordion/GuiaAcordeon.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Definir interfaces para los datos
interface Seccion {
  titulo: string;
  contenido: string[];
}

interface GuiaUsuario {
  guia_usuario: {
    secciones: Seccion[];
  };
}

const GuiaAcordeon = () => {
  const [guia, setGuia] = useState<GuiaUsuario | null>(null);
  const [expandedSecciones, setExpandedSecciones] = useState<{ [key: number]: boolean }>({});
  const [expandedPasos, setExpandedPasos] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch('https://server-seven-iota-59.vercel.app/guia')
      .then((res) => res.json())
      .then((data: GuiaUsuario) => setGuia(data))
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  const toggleSeccion = (index: number) => {
    setExpandedSecciones((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const togglePaso = (seccionIndex: number, pasoIndex: number) => {
    setExpandedPasos((prev) => ({
      ...prev,
      [`${seccionIndex}-${pasoIndex}`]: !prev[`${seccionIndex}-${pasoIndex}`],
    }));
  };

  if (!guia) {
    return <Text>Cargando guía...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Guía de Usuario - Dispositivo IoT para Peceras</Text>
      {guia.guia_usuario.secciones.map((seccion, index) => (
        <View key={index} style={styles.accordionItem}>
          {/* Encabezado de la sección */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSeccion(index)}
          >
            <Text style={styles.accordionHeaderText}>{seccion.titulo}</Text>
          </TouchableOpacity>

          {/* Contenido de la sección (pasos) */}
          {expandedSecciones[index] && (
            <View style={styles.accordionBody}>
              {seccion.contenido.map((paso, idx) => (
                <View key={idx} style={styles.pasoItem}>
                  {/* Encabezado del paso */}
                  <TouchableOpacity
                    style={styles.pasoHeader}
                    onPress={() => togglePaso(index, idx)}
                  >
                    <Text style={styles.pasoHeaderText}>Paso {idx + 1}</Text>
                  </TouchableOpacity>

                  {/* Contenido del paso */}
                  {expandedPasos[`${index}-${idx}`] && (
                    <View style={styles.pasoBody}>
                      <Text>{paso}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  accordionItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  accordionHeader: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accordionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionBody: {
    padding: 10,
  },
  pasoItem: {
    marginBottom: 10,
  },
  pasoHeader: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  pasoHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pasoBody: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default GuiaAcordeon;