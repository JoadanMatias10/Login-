import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../components/contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

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
  const { isLoggedIn, userName, logout } = useAuth(); // Usar el contexto

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
                  source={{ uri: "https://res.cloudinary.com/dn3yputmz/image/upload/v1741714838/Pagina/sz4fwg74sqvywxjpsiqc.png" }}
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
                <MenuOption onSelect={logout}>
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

// Estilos (igual que antes)
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0288D1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#0277BD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    fontFamily: "sans-serif",
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btnLogin: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#0288D1",
  },
  btnLoginText: {
    color: "#0288D1",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
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
    elevation: 5,
  },
  dropdownMenu: {
    backgroundColor: "#0288D1",
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