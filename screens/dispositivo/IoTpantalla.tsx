import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const WEBSOCKET_URL = "ws://192.168.43.106:81"; // Reemplaza con la IP de tu ESP32

const PeceraControlScreen = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null); // Define el tipo de socket
  const [data, setData] = useState({ temperatura: 0, nivelAgua: 0, distancia: 0 });

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => console.log("Conectado al WebSocket");
    ws.onmessage = (event) => {
      try {
        const jsonData = JSON.parse(event.data);
        setData(jsonData);
      } catch (error) {
        console.error("Error al parsear mensaje: ", error);
      }
    };
    ws.onerror = (error) => console.error("Error en WebSocket: ", error);
    ws.onclose = () => console.log("WebSocket cerrado");

    setSocket(ws); // Ahora esto es válido porque el tipo coincide

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const enviarComando = (comando: string) => { // Define el tipo de comando
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(comando);
    } else {
      console.error("WebSocket no está conectado");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Control de Pecera</Text>
      <Text>Temperatura: {data.temperatura}°C</Text>
      <Text>Nivel de Agua: {data.nivelAgua}</Text>
      <Text>Distancia: {data.distancia} cm</Text>
      <Button title="Activar Dispensador" onPress={() => enviarComando("activar_dispensador")} />
      <Button title="Encender/Apagar Bomba" onPress={() => enviarComando("toggle_bomba")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PeceraControlScreen;