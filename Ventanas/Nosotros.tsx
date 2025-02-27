import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Encabezado from "../components/header";
import PiePagina from "../components/footer";

// Componente para secciones de texto (Misión, Visión, etc.)
const SeccionTexto = ({ titulo, contenido }: { titulo: string; contenido: string }) => (
  <View style={estilos.seccion}>
    <Text style={estilos.tituloSeccion}>{titulo}</Text>
    <Text style={estilos.descripcion}>{contenido}</Text>
  </View>
);

// Componente para los datos de contacto
const SeccionContacto = ({ icono, texto, color }: { icono: any; texto: string; color: string }) => (
  <View style={estilos.contactoItem}>
    {icono}
    <Text style={estilos.textoContacto}>{texto}</Text>
  </View>
);

const MenuNosotros = () => {
  return (
    <View style={estilos.contenedor}>
      <Encabezado title="Nosotros" />
      <ScrollView contentContainerStyle={estilos.contenido}>
        <SeccionTexto
          titulo="Misión"
          contenido="Desarrollar un sistema automatizado para el bienestar de los peces en cautiverio, garantizando un ambiente saludable y sostenible."
        />
        <SeccionTexto
          titulo="Visión"
          contenido="Ser el estándar en el cuidado de ecosistemas acuáticos, revolucionando la forma en que las personas interactúan con sus acuarios."
        />
        <SeccionTexto
          titulo="Valores"
          contenido="Compromiso con el bienestar animal, innovación tecnológica, sostenibilidad y accesibilidad para todos los usuarios."
        />
        <SeccionTexto
          titulo="Ubicación"
          contenido="Calle Innovación 123, Parque Ecológico, Ciudad Aquaviva, Costa Azul."
        />
        <SeccionTexto
          titulo="Antecedentes"
          contenido="AcuariaTech Labs se encuentra en el Parque Tecnológico MarinaVerde, desarrollando tecnología para acuarios inteligentes."
        />

        {/* Sección de Contactos */}
        <View style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>Contactos</Text>
          <SeccionContacto
            icono={<Ionicons name="call" size={24} color="#00796B" />}
            texto="77167809213"
            color="#00796B"
          />
          <SeccionContacto
            icono={<FontAwesome name="facebook" size={24} color="#3b5998" />}
            texto="peceras@gmail.com"
            color="#3b5998"
          />
          <SeccionContacto
            icono={<FontAwesome name="twitter" size={24} color="#1DA1F2" />}
            texto="pecerasinteligentes"
            color="#1DA1F2"
          />
          <SeccionContacto
            icono={<FontAwesome name="instagram" size={24} color="#E4405F" />}
            texto="peceras@gmail.com"
            color="#E4405F"
          />
        </View>
      </ScrollView>
      <PiePagina />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#E1F5FE",
  },
  contenido: {
    padding: 20,
  },
  seccion: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B3E5FC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 14,
    color: "#555",
  },
  contactoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textoContacto: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
});

export default MenuNosotros;