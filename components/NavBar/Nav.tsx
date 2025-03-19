import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

const NavBar = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        <Text style={styles.navbarBrand}>FishCare</Text>
      </TouchableOpacity>

      <Menu>
        <MenuTrigger>
          <Text style={styles.menuTrigger}>☰</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => navigation.navigate("Productos" as never, { category: "All" })}>
            <Text style={styles.menuItem}>Todos los productos</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Productos" as never, { category: "Alimento" })}>
            <Text style={styles.menuItem}>Alimento</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Productos" as never)}>
            <Text style={styles.menuItem}>Categorías</Text>
          </MenuOption>

          <MenuOption onSelect={() => navigation.navigate("IoT" as never)}>
            <Text style={styles.menuItem}>IoT</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Peces" as never)}>
            <Text style={styles.menuItem}>Peces</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Nosotros" as never)}>
            <Text style={styles.menuItem}>Nosotros</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate("Soporte" as never)}>
            <Text style={styles.menuItem}>Soporte</Text>
          </MenuOption>

          {isLoggedIn && (
            <>
              <MenuOption onSelect={() => navigation.navigate("Dispositivos" as never)}>
                <Text style={styles.menuItem}>Dispositivos</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate("Pecera" as never)}>
                <Text style={styles.menuItem}>Pecera</Text>
              </MenuOption>
            </>
          )}
        </MenuOptions>
      </Menu>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
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

export default NavBar;