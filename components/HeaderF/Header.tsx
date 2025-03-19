import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { StackNavigationProp } from "@react-navigation/stack";

// Definir los tipos de las rutas
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registro: undefined;
  Perfil: undefined;
  Configuracion: undefined;
};

// Definir el tipo de navegación para el Header
type HeaderNavigationProp = StackNavigationProp<RootStackParamList>;

// Definir las props del componente Header
interface HeaderProps {
  titulo: string;
  imagen: string;
}

const Header: React.FC<HeaderProps> = ({ titulo, imagen }) => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userImage, setUserImage] = React.useState("");

  // Verifica si el usuario está logueado
  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const name = await AsyncStorage.getItem("userName");
      const image = await AsyncStorage.getItem("userImage");
      if (token) {
        setIsLoggedIn(true);
        setUserName(name || "");
        setUserImage(image || "");
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserImage("");
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("userImage");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.header}>
      {/* Parte izquierda: Logo y título */}
      <View style={styles.leftContainer}>
        <Image source={{ uri: imagen }} style={styles.logo} />
        <Text style={styles.titulo}>{titulo}</Text>
      </View>

      {/* Parte derecha: Botones o información del usuario */}
      <View style={styles.rightContainer}>
        {!isLoggedIn ? (
          <>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.btnLoginText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate("Registro")}
            >
              <Text style={styles.btnLoginText}>Registrarse</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Bienvenido, {userName}</Text>
            <Menu>
              <MenuTrigger>
                <Image
                  source={{ uri: userImage || "https://via.placeholder.com/150" }}
                  style={styles.userProfileImage}
                />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.dropdownMenu}>
                <MenuOption onSelect={() => navigation.navigate("Perfil")}>
                  <Text style={styles.dropdownItem}>Perfil</Text>
                </MenuOption>
                <MenuOption onSelect={() => navigation.navigate("Configuracion")}>
                  <Text style={styles.dropdownItem}>Configuración</Text>
                </MenuOption>
                <MenuOption onSelect={handleLogout}>
                  <Text style={styles.dropdownItem}>Cerrar sesión</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        )}
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0288D1", // Azul profundo
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 3,
    borderBottomColor: "#0277BD", // Línea sutil para separar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Sombra en Android
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5, // Sombra en Android
  },
  titulo: {
    fontSize: 24,
    fontFamily: "sans-serif", // Tipografía moderna
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize", // Título más estilizado
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15, // Espacio entre los botones
  },
  btnLogin: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0288D1",
  },
  btnLoginText: {
    color: "#0288D1",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase", // Transformar texto a mayúsculas
    letterSpacing: 1, // Espaciado entre letras
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Espacio entre el texto y la imagen
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize", // Aseguramos que el nombre sea en formato capitalizado
  },
  userProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5, // Sombra en Android
  },
  dropdownMenu: {
    backgroundColor: "#0288D1", // Mismo color de fondo que el header
    borderRadius: 5,
    borderWidth: 0,
  },
  dropdownItem: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    padding: 10,
  },
});

export default Header;