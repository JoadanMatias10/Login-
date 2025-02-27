import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Botones {
  title: string;
  onPress: () => void;
}

const Boton: React.FC<Botones> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#03A9F4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Boton;