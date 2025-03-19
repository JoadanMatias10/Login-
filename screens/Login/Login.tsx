import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Para navegación
import { StackNavigationProp } from "@react-navigation/stack"; // Para tipado de navegación
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para almacenamiento
import { useAuth } from "../../components/contexts/AuthContext"; // Importar el contexto

// Definir el tipo de las rutas
type RootStackParamList = {
  Peces: undefined; // La pantalla "Peces" no recibe parámetros
  // Otras pantallas...
};

// Definir el tipo de las props de navegación
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Peces">;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Navegación tipada
  const { login } = useAuth(); // Usar la función login desde el contexto

  const handleSubmit = async () => {
    // Validar si los campos están vacíos
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud POST al backend para verificar el login
      const response = await axios.post("https://server-seven-iota-59.vercel.app/usuarios/login", {
        email,
        contraseña: password,
      });

      // Acceder al nombre del usuario y token desde la respuesta
      const { usuario } = response.data;
      const token = response.data.token;

      // Si el login es exitoso, guardamos el nombre y el token en AsyncStorage
      await AsyncStorage.setItem("userName", usuario.nombre);
      await AsyncStorage.setItem("authToken", token);

      // Usamos la función login del contexto para actualizar el estado global
      login(usuario.nombre, token);

      // Mostrar alerta de éxito
      Alert.alert("¡Inicio de sesión exitoso!");

      // Limpiar el formulario
      setEmail("");
      setPassword("");
      setError(""); // Limpiar el mensaje de error

      // Redirigir a la página /peces después del login exitoso
      navigation.navigate("Peces"); // Navegación tipada

    } catch (err) {
      // Manejar errores si el login falla (por ejemplo, credenciales incorrectas)
      if (err instanceof Error) {
        setError(err.message); // Guardar el mensaje de error
      } else {
        setError("Hubo un error al iniciar sesión. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>

        {/* Mostrar mensaje de error */}
        {error ? (
          <View style={styles.alertDanger}>
            <Text>{error}</Text>
          </View>
        ) : null}

        {/* Campo de correo electrónico */}
        <Text style={styles.formLabel}>Correo electrónico</Text>
        <TextInput
          style={styles.formControl}
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Campo de contraseña */}
        <Text style={styles.formLabel}>Contraseña</Text>
        <TextInput
          style={styles.formControl}
          placeholder="Ingrese su contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Botón de inicio de sesión */}
        <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit}>
          <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  alertDanger: {
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  formLabel: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  formControl: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;