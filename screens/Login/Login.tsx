import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../components/contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

// Definir los tipos de las rutas
type RootStackParamList = {
  Home: undefined;
};

// Definir el tipo de las props de navegación
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth(); // Usar la función login desde el contexto

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post(
        "https://server-seven-iota-59.vercel.app/usuarios/login",
        {
          email,
          contraseña: password,
        }
      );

      if (!response.data || !response.data.usuario) {
        setError("Respuesta inválida del servidor. Intenta de nuevo.");
        return;
      }

      const { usuario } = response.data;
      const rol = usuario.rol || "Cliente";
      const userId = usuario._id;

      // Guardar en AsyncStorage
      await AsyncStorage.setItem("userName", usuario.nombre);
      await AsyncStorage.setItem("userRole", rol);
      await AsyncStorage.setItem("userId", userId);

      // Actualizar el contexto con la información del usuario
      login(usuario.nombre, "", rol, userId); // Pasar la imagen si está disponible

      Alert.alert("¡Inicio de sesión exitoso!");

      setEmail("");
      setPassword("");
      setError("");

      navigation.navigate("Home");
    } catch (err) {
      console.error("Error en el login:", err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Hubo un error al iniciar sesión.");
      } else {
        setError("Hubo un error desconocido al iniciar sesión.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.title}>Iniciar sesión</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Estilos (igual que antes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardBody: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Login;