import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

// Definir los tipos de las rutas
type RootStackParamList = {
  Home: undefined;
  Alimentos: { category: string };
  IoT: undefined;
  PecesView: undefined;
  Nosotros: undefined;
  Soporte: undefined;
  Dispositivos: undefined;
  Pecera: undefined;
  AllProducts: undefined;
  TodosLosProductos: undefined;
};

// Definir el tipo de las props de navegación
type NavBarNavigationProp = StackNavigationProp<RootStackParamList>;

const NavBarClient = () => {
  const navigation = useNavigation<NavBarNavigationProp>();
  const { isLoggedIn } = useAuth();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.navbarBrand}>FishCare</Text>
      </TouchableOpacity>

      <Menu>
        <MenuTrigger>
          <Text style={styles.menuTrigger}>☰</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => navigation.navigate("TodosLosProductos")}>
            <Text style={styles.menuItem}>Todos los productos</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("PecesView")}>
            <Text style={styles.menuItem}>Peces</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Nosotros")}>
            <Text style={styles.menuItem}>Nosotros</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Soporte")}>
            <Text style={styles.menuItem}>Soporte</Text>
          </MenuOption>
              <MenuOption onSelect={() => navigation.navigate("Dispositivos")}>
                <Text style={styles.menuItem}>Dispositivos</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate("Pecera")}>
                <Text style={styles.menuItem}>Pecera</Text>
              </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
  },
  navbarBrand: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuTrigger: {
    color: "#fff",
    fontSize: 24,
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    padding: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NavBarClient;