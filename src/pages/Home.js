// Importação de hooks e componentes do React e React Native
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";

// Componente principal Home
export default function Home({ navigation }) {
  // Hook useState para armazenar o símbolo digitado no input
  const [symbol, setSymbol] = useState("");

  // JSX retornado pelo componente
  return (
    <View style={styles.container}> {/* Container principal da tela */}
      <Text style={styles.title}>
        Consulte detalhes da sua ação: {/* Título da tela */}
      </Text>

      <TextInput
        placeholder="Digite o código da ação (ex: PETR4)" // Texto padrão no input
        value={symbol} // Valor atual do input
        onChangeText={setSymbol} // Atualiza o state "symbol" sempre que o texto muda
        style={styles.input} // Estilo aplicado ao input
      />

      <Button
        title="Buscar" // Texto do botão
        onPress={() => navigation.navigate("Detalhes", { symbol })} // Ao clicar, navega para a tela "Detalhes", passando o símbolo digitado
      />

      <Image
        source={require("../../assets/img/logo_cotacom.png")} // Logo exibida na parte inferior da tela
        style={styles.logo} // Estilo da imagem
      />
    </View>
  );
}

// Objeto com os estilos usados na tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    padding: 20, // Espaçamento interno
    backgroundColor: "#f4f4f4", // Cor de fundo clara
  },
  title: {
    fontSize: 20, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    marginBottom: 15, // Espaço abaixo do título
    color: "#007BFF", // Cor azul
  },
  input: {
    borderWidth: 1, // Largura da borda
    borderColor: "#007BFF", // Cor da borda
    padding: 12, // Espaçamento interno
    borderRadius: 8, // Cantos arredondados
    width: "80%", // Ocupa 80% da largura do container
    backgroundColor: "#fff", // Fundo branco
    marginBottom: 20, // Espaço abaixo do input
    fontSize: 16, // Tamanho da fonte
  },
  logo: {
    width: 300, // Largura da imagem
    height: 100, // Altura da imagem
    marginTop: 50, // Espaço acima da imagem
    resizeMode: "contain", // Mantém proporção da imagem
  },
  button: {
    backgroundColor: "#007BFF", // Cor de fundo azul
    paddingVertical: 12, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    borderRadius: 8, // Bordas arredondadas
    alignItems: "center", // Centraliza o texto dentro do botão
  },
  buttonText: {
    color: "#fff", // Cor do texto branca
    fontSize: 18, // Tamanho do texto
    fontWeight: "bold", // Texto em negrito
  },
});
