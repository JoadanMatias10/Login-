import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import Encabezado from "../components/header";
import PiePagina from "../components/footer";
import Boton from "../components/boton";

const FormularioLogin = () => {
  const [datos, setDatos] = useState({ correo: "", contraseña: "" });
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const validarFormulario = () => {
    let erroresTemp: { [key: string]: string } = {};

    if (!datos.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) erroresTemp.correo = "Correo inválido";
    if (datos.contraseña.length < 6) erroresTemp.contraseña = "Mínimo 6 caracteres";

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const manejarCambio = (campo: string, valor: string) => {
    setDatos({ ...datos, [campo]: valor });
  };

  const manejarEnvio = () => {
    if (validarFormulario()) {
      Alert.alert("Inicio de sesión exitoso");
      setDatos({ correo: "", contraseña: "" });
    }
  };

  return (
    <View style={estilos.contenedor}>
      {/* Encabezado */}
      <Encabezado title="pecera inteligente" />

      <View style={estilos.contenido}>
        {/* Texto adicional "Iniciar Sesión" */}
        <Text style={estilos.titulo}>Iniciar Sesión</Text>

        {/* Caja de entradas de texto */}
        <View style={estilos.cajaInputs}>
          <TextInput
            placeholder="Correo Electrónico"
            value={datos.correo}
            onChangeText={(valor) => manejarCambio("correo", valor)}
            style={estilos.input}
            keyboardType="email-address"
          />
          {errores.correo && <Text style={estilos.mensajeError}>{errores.correo}</Text>}

          <TextInput
            placeholder="Contraseña"
            value={datos.contraseña}
            onChangeText={(valor) => manejarCambio("contraseña", valor)}
            style={estilos.input}
            secureTextEntry
          />
          {errores.contraseña && <Text style={estilos.mensajeError}>{errores.contraseña}</Text>}
        </View>

        {/* Botón para ingresar */}
        <Boton onPress={manejarEnvio} title="Ingresar" />
      </View>

      {/* Pie de Página */}
      <PiePagina />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "space-between", 
    padding: 0,
    backgroundColor: "#E1F5FE",
    paddingTop: 0,
  },
  contenido: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  cajaInputs: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, // Sombra en Android
    marginBottom: 20, // Espaciado entre inputs y botón
  },
  input: {
    borderWidth: 2,
    borderColor: "#B3E5FC",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#FFF",
  },
  mensajeError: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default FormularioLogin;
