import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Encabezado from "../components/header";
import PieDePagina from "../components/footer";

// Importar imágenes locales
const peceraImg = require("../img/pecera.png");
const alimentadorImg = require("../img/dispensador.jpg");
const iluminacionImg = require("../img/bombaoxigena.jpg");

const CatalogoProducto = () => {
  return (
    <View style={styles.contenedor}>
      <Encabezado title="Catálogo de Productos" />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.producto}>
          <Image source={peceraImg} style={styles.imagen} />
          <View style={styles.info}>
            <Text style={styles.nombre}>Pecera 300L</Text>
            <Text style={styles.descripcion}>
              Pecera con sistema automatizado de monitoreo y control de parámetros acuáticos.
            </Text>
            <Text style={styles.precio}>$299.99</Text>
          </View>
        </View>
        <View style={styles.producto}>
          <Image source={alimentadorImg} style={styles.imagen} />
          <View style={styles.info}>
            <Text style={styles.nombre}>Dispensador de comida</Text>
            <Text style={styles.descripcion}>
              Dispensador de comida automatizado con control remoto.
            </Text>
            <Text style={styles.precio}>$100.99</Text>
          </View>
        </View>
        <View style={styles.producto}>
          <Image source={iluminacionImg} style={styles.imagen} />
          <View style={styles.info}>
            <Text style={styles.nombre}>Bomba de Oxigenacion</Text>
            <Text style={styles.descripcion}>
              Sistema de iluminación LED para acuarios con colores ajustables.
            </Text>
            <Text style={styles.precio}>$79.99</Text>
          </View>
        </View>
      </ScrollView>
      <PieDePagina />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#E1F5FE",
  },
  contenido: {
    padding: 20,
  },
  producto: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B3E5FC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0288D1",
  },
});

export default CatalogoProducto;
