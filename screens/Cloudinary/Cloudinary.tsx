import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Para seleccionar imágenes
import * as Clipboard from "expo-clipboard"; // Para copiar al portapapeles

const Cloudinary = () => {
  const preset_name = "Productos"; // Preset de Cloudinary
  const cloud_name = "dn3yputmz"; // Nombre del Cloudinary

  const [image, setImage] = useState(""); // Estado para la URL de la imagen
  const [loading, setLoading] = useState(false); // Estado para indicar carga

  // Función para seleccionar y subir una imagen
  const uploadImage = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitas permitir el acceso a la galería para subir imágenes.");
      return;
    }

    // Seleccionar una imagen de la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0]; // Acceder al archivo seleccionado
      const data = new FormData();

      // Crear un objeto de archivo compatible con FormData
      const fileObject = {
        uri: file.uri,
        type: file.type || "image/jpeg", // Tipo de archivo (predeterminado: JPEG)
        name: file.fileName || "upload.jpg", // Nombre del archivo
      };

      // Agregar el archivo a FormData
      data.append("file", fileObject as any); // Usar "as any" para evitar errores de tipo
      data.append("upload_preset", preset_name);

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseData = await response.json();
        setImage(responseData.secure_url); // Guardamos la URL de la imagen
        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    }
  };

  // Función para copiar la URL al portapapeles
  const copyToClipboard = async () => {
    if (image) {
      await Clipboard.setStringAsync(image);
      Alert.alert("Éxito", "URL copiada al portapapeles!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Imagen</Text>

      {/* Botón para seleccionar una imagen */}
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {/* Mostrar la imagen y la URL */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.urlLabel}>URL de la imagen:</Text>
            <TextInput
              style={styles.urlInput}
              value={image}
              editable={false}
              multiline
            />
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyButtonText}>Copiar URL</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    color: "#007BFF",
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  urlLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  urlInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cloudinary;