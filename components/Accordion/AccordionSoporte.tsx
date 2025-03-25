// components/Accordion/AccordionSoporte.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Definir interfaces para los datos
interface Pregunta {
  pregunta: string;
  respuesta: string;
}

interface SoporteItem {
  _id: string;
  categoria: string;
  preguntas: Pregunta[];
}

const SoporteAcordeon = () => {
  // Especificar el tipo del estado soporte
  const [soporte, setSoporte] = useState<SoporteItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch('https://server-seven-iota-59.vercel.app/soporte')
      .then((res) => res.json())
      .then((data: SoporteItem[]) => setSoporte(data)) // Especificar el tipo de data
      .catch((error) => console.error('Error al obtener los datos', error));
  }, []);

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [`${categoryIndex}-${questionIndex}`]: !prev[`${categoryIndex}-${questionIndex}`],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preguntas Frecuentes</Text>
      {soporte.map((item, index) => (
        <View key={item._id} style={styles.accordionItem}>
          {/* Encabezado de la categoría */}
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleCategory(index)}
          >
            <Text style={styles.accordionHeaderText}>{item.categoria}</Text>
          </TouchableOpacity>

          {/* Contenido de la categoría (preguntas) */}
          {expandedCategories[index] && (
            <View style={styles.accordionBody}>
              {item.preguntas.map((pregunta, idx) => (
                <View key={idx} style={styles.questionItem}>
                  {/* Encabezado de la pregunta */}
                  <TouchableOpacity
                    style={styles.questionHeader}
                    onPress={() => toggleQuestion(index, idx)}
                  >
                    <Text style={styles.questionHeaderText}>{pregunta.pregunta}</Text>
                  </TouchableOpacity>

                  {/* Contenido de la pregunta (respuesta) */}
                  {expandedQuestions[`${index}-${idx}`] && (
                    <View style={styles.questionBody}>
                      <Text>{pregunta.respuesta}</Text>
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
  questionItem: {
    marginBottom: 10,
  },
  questionHeader: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  questionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  questionBody: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default SoporteAcordeon;