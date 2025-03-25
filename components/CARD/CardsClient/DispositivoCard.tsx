import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Definimos los tipos para la navegación
type RootStackParamList = {
  ConfigurarGeneral: { dispositivoId: string; usuarioId: string };
  Pecera: { dispositivoId: string; usuarioId: string };
  AdministrarLed: { dispositivoId: string; usuarioId: string };
};

// Definimos las propiedades del componente
interface DispositivoCardProps {
  producto: {
    _id: string;
    nombre?: string;
    descripcion?: string;
    imagen?: string;
    ip?: string;
  };
  usuario_id: string;
  eliminarProducto: (producto_id: string) => void; // 🔹 Agrega esta propiedad
}

const DispositivoCard: React.FC<DispositivoCardProps> = ({
  producto,
  usuario_id,
  eliminarProducto, // 🔹 Recibe la propiedad
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [ip, setIp] = useState(producto?.ip || "");

  const abrirFormulario = () => setShowModal(true);
  const cerrarFormulario = () => setShowModal(false);

  useEffect(() => {
    if (showModal && producto) {
      const obtenerDatosDispositivo = async () => {
        try {
          const response = await axios.get(
            `https://server-seven-iota-59.vercel.app/dispositivos/${usuario_id}/${producto._id}`
          );
          const { nombre, ip } = response.data;
          setNombre(nombre);
          setIp(ip);
        } catch (error) {
          console.error("Error al obtener los datos del dispositivo", error);
        }
      };

      obtenerDatosDispositivo();
    }
  }, [showModal, producto, usuario_id]);

  const guardarCambios = async () => {
    try {
      const url = `https://server-seven-iota-59.vercel.app/dispositivos/actualizar/${usuario_id}/${producto._id}`;
      await axios.put(url, { nombre, ip });
      Alert.alert("Éxito", "Dispositivo actualizado con éxito");
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el dispositivo", error);
      Alert.alert("Error", "Hubo un error al guardar los cambios");
    }
  };

  const manejarAdministracion = () => {
    let ruta: keyof RootStackParamList = "ConfigurarGeneral";
  
    switch (producto.nombre) {
      case "Pecera Inteligente":
        ruta = "Pecera";
        break;
      case "IoT led":
        ruta = "AdministrarLed";
        break;
    }
  
    navigation.navigate(ruta, { dispositivoId: producto._id, usuarioId: usuario_id });
  };
  

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: producto.imagen || "https://via.placeholder.com/300" }}
        style={styles.cardImage}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{producto.nombre || "Dispositivo Desconocido"}</Text>
        <Text style={styles.cardText}>{producto.descripcion || "Descripción no disponible"}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWarning} onPress={manejarAdministracion}>
            <Text style={styles.buttonText}>Administrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={abrirFormulario} style={styles.iconContainer}>
            <Ionicons name="settings" size={24} color="#6c757d" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDanger} onPress={() => eliminarProducto(producto._id)}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurar Dispositivo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Dispositivo"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput style={styles.input} placeholder="Dirección IP" value={ip} onChangeText={setIp} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={cerrarFormulario}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={guardarCambios}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardText: { fontSize: 14, color: "#666" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  buttonWarning: { backgroundColor: "#ffc107", padding: 10, borderRadius: 5 },
  buttonDanger: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center" },
  iconContainer: { justifyContent: "center", alignItems: "center" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  buttonSecondary: { backgroundColor: "#6c757d", padding: 10, borderRadius: 5 },
  buttonPrimary: { backgroundColor: "#007bff", padding: 10, borderRadius: 5 },
});

export default DispositivoCard;