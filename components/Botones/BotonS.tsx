import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from "react-native";

// Definir las props del componente ButtonS
interface ButtonSProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const ButtonS: React.FC<ButtonSProps> = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

// Estilos base para el botón secundario
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6C757D", // Color secundario (puedes cambiarlo)
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#6C757D", // Color del borde
  },
  text: {
    color: "#FFFFFF", // Color del texto
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ButtonS;