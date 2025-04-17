import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";

export default function Home({ navigation }) {
  const [symbol, setSymbol] = useState("");

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulte detalhes da sua ação:
      </Text>

      <TextInput
        placeholder="Digite o código da ação (ex: PETR4)"
        value={symbol}
        onChangeText={setSymbol}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={() => navigation.navigate("Detalhes", { symbol })}
      />

      <Image
        source={require("../../assets/img/logo_cotacom.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007BFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
  },
  logo: {
    width: 300,
    height: 100,
    marginTop: 50,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
