import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useAuth } from "../../components/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons"; // Íconos compatibles con React Native
import * as Animatable from "react-native-animatable"; // Para animaciones

const App = () => {
  const { userId } = useAuth();
  const [temperatura, setTemperatura] = useState(0);
  const [nivelAgua, setNivelAgua] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [ip, setIp] = useState<string | null>(null);
  const [bombaEncendida, setBombaEncendida] = useState(false);

  useEffect(() => {
    const obtenerIP = async () => {
      try {
        const productoFijo = "67d77b9943241186428efbf2";
        const url = `https://server-seven-iota-59.vercel.app/dispositivos/${userId}/${productoFijo}`;
        const respuesta = await axios.get(url);

        if (respuesta.data && respuesta.data.ip) {
          setIp(respuesta.data.ip);
        } else {
          console.error("No se encontró la IP del dispositivo.");
        }
      } catch (error) {
        console.error("Error al obtener la IP del dispositivo", error);
      }
    };

    if (userId) {
      obtenerIP();
    }
  }, [userId]);

  useEffect(() => {
    if (!ip) return;

    const wsUrl = `ws://${ip}:81/ws`;
    const socket = new WebSocket(wsUrl);
    setWs(socket);

    socket.onopen = () => {
      console.log("Conexión WebSocket abierta");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.temperatura !== undefined) setTemperatura(data.temperatura);
        if (data.nivelAgua !== undefined) setNivelAgua(data.nivelAgua);
        if (data.distancia !== undefined) setDistancia(data.distancia);
      } catch (error) {
        console.warn("Mensaje no JSON recibido:", event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    return () => {
      socket.close();
    };
  }, [ip]);

  const activarServo = () => {
    if (ws) ws.send("activar_dispensador");
  };

  const toggleBomba = () => {
    if (ws) {
      ws.send("toggle_bomba");
      setBombaEncendida((prevState) => !prevState);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Widget de Temperatura - Termómetro */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Temperatura</Text>
        <View style={styles.thermometer}>
          <View style={styles.thermometerBulb} />
          <View style={[styles.thermometerLevel, { height: `${temperatura}%` }]} />
        </View>
        <Text style={styles.valueText}>{temperatura}°C</Text>
      </View>

      {/* Widget de Nivel de Agua - Tanque */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nivel de Agua</Text>
        <View style={styles.tank}>
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            style={[styles.waterLevel, { height: `${(nivelAgua / 4095) * 100}%` }]}
          />
        </View>
        <Text style={styles.valueText}>Nivel: {nivelAgua === 0? "Vacio" : nivelAgua > 0 && nivelAgua <= 1700 ? "Nivel normal" : "LLeno"} </Text>
      </View>

      {/* Widget del Dispensador de Alimento */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dispensador de Alimento</Text>
        <View style={styles.foodContainer}>
          <View style={[styles.foodLevel, { height: `${(4.23 - distancia) / 4.23 * 100}%` }]} />
        </View>
        <Text style={styles.valueText}>Nivel: {distancia > 3 ? "Vacío" : distancia > 1 ? "Mitad" : "Lleno"}</Text>
      </View>

      {/* Widget de la Bomba de Agua */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bomba</Text>
        <FontAwesome
          name="power-off"
          size={50}
          color={bombaEncendida ? "green" : "red"}
          style={{ alignSelf: "center", marginBottom: 10 }}
        />
        <Text style={styles.valueText}>{bombaEncendida ? "Encendida" : "Apagada"}</Text>
        <TouchableOpacity
          style={[styles.button, bombaEncendida ? styles.buttonDanger : styles.buttonSuccess]}
          onPress={toggleBomba}
        >
          <Text style={styles.buttonText}>
            {bombaEncendida ? "Apagar Bomba" : "Encender Bomba"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón del Dispensador */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dispensador</Text>
        <TouchableOpacity style={styles.button} onPress={activarServo}>
          <Text style={styles.buttonText}>Activar Dispensador</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  thermometer: {
    width: 40,
    height: 150,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  thermometerBulb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
  },
  thermometerLevel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "red",
  },
  tank: {
    width: 80,
    height: 150,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    overflow: "hidden",
  },
  waterLevel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#007bff",
  },
  foodContainer: {
    width: 80,
    height: 120,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#f8e8a0",
    borderRadius: 5,
    overflow: "hidden",
  },
  foodLevel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#d4a017",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonSuccess: { backgroundColor: "#28a745" },
  buttonDanger: { backgroundColor: "#dc3545" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default App;
