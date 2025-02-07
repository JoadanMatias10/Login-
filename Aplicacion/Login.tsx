
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Login() {
    return (
        <View style={styles.container}>
            <Image source={require("./amazon-logo.png")} style={styles.logo} />
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.label}>E-mail o celular</Text>
            <TextInput style={styles.input} placeholder="" />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
            <Text style={styles.terms}>
                Al continuar, aceptas las <Text style={styles.link}>Condiciones de uso</Text> y el <Text style={styles.link}>Aviso de privacidad</Text> de Amazon.
            </Text>
            <TouchableOpacity>
                <Text style={styles.help}>¿Necesitas ayuda?</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity>
                <Text style={styles.business}>¿Compras para el trabajo?</Text>
                <Text style={styles.link}>Compra en Amazon Business</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.createAccount}>
                <Text style={styles.createAccountText}>Crea tu cuenta de Amazon</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    logo: {
        width: 100,
        height: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 20,
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        color: "#000",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        width: "100%",
        backgroundColor: "#FF9900",
        padding: 12,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    },
    terms: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    link: {
        color: "#0066C0",
    },
    help: {
        fontSize: 14,
        color: "#0066C0",
        marginBottom: 20,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 15,
    },
    business: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
    },
    createAccount: {
        borderWidth: 1,
        borderColor: "#888",
        padding: 12,
        width: "100%",
        alignItems: "center",
        borderRadius: 5,
    },
    createAccountText: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
    },
});
