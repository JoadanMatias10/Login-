import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import Encabezado from "../components/header";
import PiePagina from "../components/footer";
import Boton from "../components/boton";

const FormularioRegistro = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    clave: "",
    confirmarClave: "",
  });
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const validarFormulario = () => {
    let erroresTemp: { [key: string]: string } = {};

    if (!formulario.nombre.trim()) erroresTemp.nombre = "El nombre es obligatorio";
    if (!formulario.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) erroresTemp.correo = "Correo inválido";
    if (formulario.clave.length < 6) erroresTemp.clave = "Mínimo 6 caracteres";
    if (formulario.clave !== formulario.confirmarClave) erroresTemp.confirmarClave = "Las contraseñas no coinciden";

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleChange = (campo: string, valor: string) => {
    setFormulario({ ...formulario, [campo]: valor });
  };

  const handleSubmit = () => {
    if (validarFormulario()) {
      Alert.alert("Registro exitoso");
      setFormulario({ nombre: "", correo: "", clave: "", confirmarClave: "" });
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Encabezado title="Pecera inteligente" />
      <View style={estilos.contenido}>
        <Text style={estilos.titulo}>Crea una cuenta</Text>
        <View style={estilos.cajaFormulario}>
          <TextInput
            placeholder="Nombre"
            value={formulario.nombre}
            onChangeText={(valor) => handleChange("nombre", valor)}
            style={estilos.entrada}
          />
          {errores.nombre && <Text style={estilos.error}>{errores.nombre}</Text>}

          <TextInput
            placeholder="Correo"
            value={formulario.correo}
            onChangeText={(valor) => handleChange("correo", valor)}
            style={estilos.entrada}
            keyboardType="email-address"
          />
          {errores.correo && <Text style={estilos.error}>{errores.correo}</Text>}

          <TextInput
            placeholder="Contraseña"
            value={formulario.clave}
            onChangeText={(valor) => handleChange("clave", valor)}
            style={estilos.entrada}
            secureTextEntry
          />
          {errores.clave && <Text style={estilos.error}>{errores.clave}</Text>}

          <TextInput
            placeholder="Confirmar Contraseña"
            value={formulario.confirmarClave}
            onChangeText={(valor) => handleChange("confirmarClave", valor)}
            style={estilos.entrada}
            secureTextEntry
          />
          {errores.confirmarClave && <Text style={estilos.error}>{errores.confirmarClave}</Text>}
        </View>

        <Boton onPress={handleSubmit} title="Registrarse" />
      </View>
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
  },
  contenido: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  cajaFormulario: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  entrada: {
    borderWidth: 2,
    borderColor: "#B3E5FC",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#FFF",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default FormularioRegistro;