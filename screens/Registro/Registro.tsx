import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} 

from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";

// Definir el tipo de las rutas
type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
};

// Definir el tipo de las props de navegación
type RegistroScreenNavigationProp = StackNavigationProp<RootStackParamList, "Registro">;

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    sexo: "",
    edad: "",
    email: "",
    telefono: "",
    contraseña: "",
    confirmPassword: "",
    pregunta_recuperacion: {
      preg_id: "",
      respuesta: "",
    },
  });

  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const navigation = useNavigation<RegistroScreenNavigationProp>();

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const response = await axios.get("https://server-seven-iota-59.vercel.app/preguntas");
        setPreguntas(response.data);
      } catch (error) {
        Alert.alert("Error", "Error al cargar las preguntas");
      }
    };
    obtenerPreguntas();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePreguntaChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      pregunta_recuperacion: { ...formData.pregunta_recuperacion, [name]: value },
    });
  };

  const checkDuplicate = async () => {
    try {
      const response = await axios.post("https://server-seven-iota-59.vercel.app/usuarios/check-duplicate", {
        email: formData.email,
        telefono: formData.telefono,
      });

      if (response.status === 400) {
        Alert.alert("Error", response.data.error);
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Error", "Correo o teléfono ya registrados");
      return false;
    }
  };

  const validateStep = () => {
    let isValid = true;
    let errorMessage = "";

    if (step === 1) {
      if (!formData.nombre) {
        errorMessage = "El nombre es obligatorio.";
        isValid = false;
      } else if (!formData.apellidoP) {
        errorMessage = "El apellido paterno es obligatorio.";
        isValid = false;
      } else if (!formData.apellidoM) {
        errorMessage = "El apellido materno es obligatorio.";
        isValid = false;
      } else if (!formData.sexo) {
        errorMessage = "Selecciona un sexo.";
        isValid = false;
      } else {
        const edadNumber = parseInt(formData.edad, 10);
        if (!formData.edad || isNaN(edadNumber) || edadNumber < 18 || edadNumber > 100) {
          errorMessage = "Edad entre 18 y 100.";
          isValid = false;
        }
      }
    } else if (step === 2) {
      if (!formData.email) {
        errorMessage = "El correo es obligatorio.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errorMessage = "El correo no es válido.";
        isValid = false;
      } else if (!formData.telefono || !/^\d{10}$/.test(formData.telefono)) {
        errorMessage = "El teléfono debe tener 10 dígitos.";
        isValid = false;
      } else if (!formData.contraseña || formData.contraseña.length < 8) {
        errorMessage = "La contraseña debe tener al menos 8 caracteres.";
        isValid = false;
      } else if (!/[a-z]/.test(formData.contraseña)) {
        errorMessage = "La contraseña debe tener al menos una letra minúscula.";
        isValid = false;
      } else if (!/[A-Z]/.test(formData.contraseña)) {
        errorMessage = "La contraseña debe tener al menos una letra mayúscula.";
        isValid = false;
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.contraseña)) {
        errorMessage = "La contraseña debe tener al menos un carácter especial.";
        isValid = false;
      } else if (formData.contraseña !== formData.confirmPassword) {
        errorMessage = "Las contraseñas no coinciden.";
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.pregunta_recuperacion.preg_id) {
        errorMessage = "Selecciona una pregunta.";
        isValid = false;
      } else if (!formData.pregunta_recuperacion.respuesta) {
        errorMessage = "La respuesta es obligatoria.";
        isValid = false;
      }
    }

    if (!isValid) {
      setErrorMessage(errorMessage); // Actualizar el estado del mensaje de error
    } else {
      setErrorMessage(""); // Limpiar el mensaje de error si no hay errores
    }
    return isValid;
  };

  const nextStep = async () => {
    if (step === 2) {
      const isDuplicate = await checkDuplicate();
      if (!isDuplicate) return;
    }

    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        await axios.post("https://server-seven-iota-59.vercel.app/usuarios", formData);
        Alert.alert("Éxito", "Usuario registrado correctamente");
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Error al registrar usuario");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.formContainer}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.form}>
        {step === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={formData.apellidoP}
              onChangeText={(text) => handleChange("apellidoP", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={formData.apellidoM}
              onChangeText={(text) => handleChange("apellidoM", text)}
            />

            {/* Selector de Sexo */}
            <View style={styles.sexoContainer}>
              <Text style={styles.sexoLabel}>Sexo:</Text>
              <TouchableOpacity
                style={[
                  styles.sexoOption,
                  formData.sexo === "Masculino" && styles.sexoOptionSelected,
                ]}
                onPress={() => handleChange("sexo", "Masculino")}
              >
                <Text
                  style={[
                    styles.sexoOptionText,
                    formData.sexo === "Masculino" && styles.sexoOptionTextSelected,
                  ]}
                >
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sexoOption,
                  formData.sexo === "Femenino" && styles.sexoOptionSelected,
                ]}
                onPress={() => handleChange("sexo", "Femenino")}
              >
                <Text
                  style={[
                    styles.sexoOptionText,
                    formData.sexo === "Femenino" && styles.sexoOptionTextSelected,
                  ]}
                >
                  Femenino
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Edad"
              value={formData.edad}
              onChangeText={(text) => handleChange("edad", text)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={formData.telefono}
              onChangeText={(text) => handleChange("telefono", text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={formData.contraseña}
              onChangeText={(text) => handleChange("contraseña", text)}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            {/* Selector de Pregunta de Recuperación */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.pregunta_recuperacion.preg_id}
                onValueChange={(itemValue: string) =>
                  handlePreguntaChange("preg_id", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una pregunta" value="" />
                {preguntas.map((pregunta) => (
                  <Picker.Item
                    key={pregunta.preg_id}
                    label={pregunta.pregunta}
                    value={pregunta.preg_id}
                  />
                ))}
              </Picker>
            </View>

            {/* Campo de Respuesta */}
            <TextInput
              style={styles.input}
              placeholder="Respuesta"
              value={formData.pregunta_recuperacion.respuesta}
              onChangeText={(text) => handlePreguntaChange("respuesta", text)}
            />

            {/* Mostrar mensaje de error */}
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {/* Botón de Registrar */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sexoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sexoLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  sexoOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sexoOptionSelected: {
    borderColor: "#007bff",
    backgroundColor: "#007bff",
  },
  sexoOptionText: {
    fontSize: 16,
    color: "#333",
  },
  sexoOptionTextSelected: {
    color: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 70,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RegistroForm;