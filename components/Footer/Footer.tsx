import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Para manejar la navegación
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para manejar localStorage
import { StackNavigationProp } from "@react-navigation/stack"; // Importa el tipo de navegación

// Define los tipos de las rutas y los parámetros
type RootStackParamList = {
  Productos: { category: string };
  Login: undefined;
  Registro: undefined;
};

// Define el tipo de navegación para el Footer
type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<FooterNavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Verifica si el usuario está logueado
  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  return (
    <ScrollView style={styles.footer}>
      {/* Sección superior */}
      <View style={styles.footerTop}>
        {/* Sección de Productos */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>Productos</Text>
          {[
            "Dispositivos",
            "Alimentos",
            "Decoraciones",
            "Acuarios",
            "Equipamiento",
            "Sustrato",
            "Iluminación",
            "Accesorios",
            "Mantenimiento",
            "Tratamiento",
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Productos", { category: item })}
            >
              <Text style={styles.footerLink}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sección de Ubicación */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <Text style={styles.footerLink}>Tiendas físicas</Text>
        </View>

        {/* Sección de Club FISHCARE (solo si no está logueado) */}
        {!isLoggedIn && (
          <View style={styles.footerSection}>
            <Text style={styles.sectionTitle}>CLUB FISHCARE</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerLink}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
              <Text style={styles.footerLink}>Crear cuenta</Text>
            </TouchableOpacity>
            <Text style={styles.footerLink}>¿Qué es Club FISHCARE?</Text>
          </View>
        )}

        {/* Sección de Enlaces de Interés */}
        <View style={styles.footerSection}>
          <Text style={styles.sectionTitle}>ENLACES DE INTERÉS</Text>
          <Text style={styles.footerLink}>¿Quiénes somos?</Text>
          <Text style={styles.footerLink}>IoT</Text>
          <Text style={styles.footerLink}>Preguntas frecuentes</Text>
        </View>
      </View>

      {/* Sección de Atención a Clientes */}
      <View style={styles.footerContact}>
        <Text style={styles.contactTitle}>ATENCIÓN A CLIENTES</Text>
        <Text style={styles.contactText}>
          Horario de atención: Lunes a domingo de 9:00hrs a 10:00hrs
        </Text>
        <Text style={styles.contactText}>7713039166</Text>
        <Text style={styles.contactText}>fishcare@gmail.com</Text>
      </View>

      {/* Sección de Copyright */}
      <View style={styles.footerCopyright}>
        <Text style={styles.copyrightText}>
          &copy; {new Date().getFullYear()} FISHCARE. Todos los derechos reservados.
        </Text>
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#1f1f1f", // Fondo oscuro
    padding: 40,
  },
  footerTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  footerSection: {
    flex: 1,
    minWidth: 200,
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#33c3ff", // Color de los encabezados
  },
  footerLink: {
    fontSize: 14,
    color: "#f5f5f5", // Texto claro
    marginVertical: 8,
    textDecorationLine: "none",
  },
  footerContact: {
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#33c3ff",
  },
  contactText: {
    fontSize: 14,
    color: "#f5f5f5",
    marginVertical: 5,
  },
  footerCopyright: {
    backgroundColor: "#141414",
    padding: 20,
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 14,
    color: "#999",
  },
});

export default Footer;