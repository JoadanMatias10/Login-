import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from "react-native";

// Definir las props del componente ButtonP
interface ButtonPProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const ButtonP: React.FC<ButtonPProps> = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

// Estilos base para el botón
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF", // Color primario (puedes cambiarlo)
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF", // Color del texto
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ButtonP;