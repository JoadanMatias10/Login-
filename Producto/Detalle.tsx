import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Encabezado from "../components/header";
import PieDePagina from "../components/footer";

// Importar imágenes locales
const peceraImg = require("../img/pecera.png");

const DetalleDelProducto = () => {
  return (
    <View style={styles.contenedor}>
      <Encabezado title="Detalle del Producto" />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.detalleProducto}>
          <Image source={peceraImg} style={styles.imagenProducto} />
          <View style={styles.infoProducto}>
            <Text style={styles.nombreProducto}>Pecera 300L</Text>
            <Text style={styles.descripcionProducto}>
              Pecera con sistema automatizado de monitoreo y control de parámetros acuáticos. Con capacidad para 300L de agua y un diseño elegante, permite controlar la temperatura, el pH, el oxígeno disuelto y otros parámetros importantes para el bienestar de los peces.
            </Text>
            <Text style={styles.precioProducto}>$299.99</Text>
          </View>
        </View>
        <View style={styles.seccionCaracteristicas}>
          <Text style={styles.tituloCaracteristicas}>Características</Text>
          <Text style={styles.descripcionCaracteristicas}>
            - Capacidad de 300L
            {"\n"}- Monitoreo remoto a través de app
            {"\n"}- Control automático de iluminación y temperatura
            {"\n"}- Sistema de filtración avanzado
            {"\n"}- Materiales ecológicos y duraderos
            {"\n"}- Consumo energético eficiente
          </Text>
        </View>

        {/* Sección para accesorios adicionales */}
        <View style={styles.seccionAccesorios}>
          <Text style={styles.tituloAccesorios}>Accesorios Adicionales</Text>

          <View style={styles.itemAccesorio}>
            <Image
              source={require("../img/dispensador.jpg")} // Imagen del dispensador de comida
              style={styles.imagenAccesorio}
            />
            <View style={styles.infoAccesorio}>
              <Text style={styles.nombreAccesorio}>Dispensador de Comida</Text>
              <Text style={styles.descripcionAccesorio}>
                Dispensador automático que garantiza la alimentación regular de los peces. Se puede programar para liberar la cantidad adecuada de comida en intervalos regulares.
              </Text>
              <Text style={styles.precioAccesorio}>$100.99</Text>
            </View>
          </View>

          <View style={styles.itemAccesorio}>
            <Image
              source={require("../img/bombaoxigena.jpg")} // Imagen de la bomba de oxígeno
              style={styles.imagenAccesorio}
            />
            <View style={styles.infoAccesorio}>
              <Text style={styles.nombreAccesorio}>Bomba de Oxígenacion</Text>
              <Text style={styles.descripcionAccesorio}>
                Bomba de oxígeno de alto rendimiento que asegura niveles adecuados de oxígeno en el agua para el bienestar de los peces.
              </Text>
              <Text style={styles.precioAccesorio}>$79.99</Text>
            </View>
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
  detalleProducto: {
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
  imagenProducto: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  infoProducto: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  descripcionProducto: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  precioProducto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0288D1",
    marginBottom: 20,
  },
  seccionCaracteristicas: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B3E5FC",
    marginBottom: 20,
  },
  tituloCaracteristicas: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  descripcionCaracteristicas: {
    fontSize: 14,
    color: "#555",
  },
  seccionAccesorios: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B3E5FC",
    marginBottom: 20,
  },
  tituloAccesorios: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  itemAccesorio: {
    flexDirection: "row",
    marginBottom: 15,
  },
  imagenAccesorio: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  infoAccesorio: {
    flex: 1,
  },
  nombreAccesorio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  descripcionAccesorio: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  precioAccesorio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0288D1",
  },
});

export default DetalleDelProducto;
