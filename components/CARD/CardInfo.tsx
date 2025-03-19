import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Definir la interfaz para las props
interface CardInfoProps {
  header: string; // El encabezado es un string
  title: string;  // El título es un string
  text: string;   // El texto es un string
  style?: object; // Estilos personalizados (opcional)
  className?: string; // Clase CSS (opcional)
}

const CardInfo: React.FC<CardInfoProps> = ({ header, title, text, style = {}, className = "primary" }) => {
  // Estilos dinámicos basados en la clase
  const cardStyles = [
    styles.card,
    className === "primary" ? styles.primaryBackground : styles.defaultBackground,
    style, // Estilos personalizados pasados como prop
  ];

  return (
    <View style={cardStyles}>
      {/* Encabezado de la tarjeta */}
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>{header}</Text>
      </View>

      {/* Cuerpo de la tarjeta */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{text}</Text>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    width: "90%", // Ancho relativo
    maxWidth: 800, // Ancho máximo
    borderRadius: 10, // Bordes redondeados
    shadowColor: "#000", // Sombra suave
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Sombra en Android
    margin: 10,
  },
  primaryBackground: {
    backgroundColor: "#007BFF", // Fondo de la tarjeta (azul)
  },
  defaultBackground: {
    backgroundColor: "#fff", // Fondo predeterminado
  },
  cardHeader: {
    padding: 15, // Padding para el encabezado
  },
  headerText: {
    fontSize: 24, // Tamaño del texto en el encabezado (2.5rem)
    fontWeight: "bold", // Texto en negrita
    color: "#fff", // Color del texto para el fondo oscuro
  },
  cardBody: {
    padding: 20, // Padding adicional para el cuerpo de la tarjeta
  },
  cardTitle: {
    fontSize: 24, // Tamaño del texto del título (2.5rem)
    fontWeight: "bold", // Texto en negrita
    marginBottom: 10, // Espacio debajo del título
    color: "#fff", // Color del texto para el fondo oscuro
  },
  cardText: {
    fontSize: 18, // Tamaño del texto del cuerpo (1.2rem)
    color: "#fff", // Color de texto
  },
});

export default CardInfo;