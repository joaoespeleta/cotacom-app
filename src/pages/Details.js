// Importa os hooks e componentes necessários do React e React Native
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { SvgXml } from "react-native-svg"; // Importa componente para renderizar SVGs via string

// Função principal do componente Details, que recebe as informações da rota
export default function Details({ route }) {
  // Extrai o símbolo da ação passado pela navegação
  const { symbol } = route.params;

  // Define os estados do componente
  const [data, setData] = useState(null); // Armazena os dados da API
  const [loading, setLoading] = useState(true); // Estado para exibir o carregamento
  const [svgXmlData, setSvgXmlData] = useState(null); // Armazena o conteúdo SVG como string
  const [isSvg, setIsSvg] = useState(false); // Indica se o logo é um SVG

  // useEffect será executado assim que o componente for montado
  useEffect(() => {
    // Faz uma requisição à API para buscar os dados da ação
    fetch(`https://brapi.dev/api/quote/${symbol}?token=mYUgg9E8YpzJihbwEHNaHP`)
      .then((res) => res.json()) // Converte a resposta em JSON
      .then((json) => {
        const result = json.results[0]; // Pega o primeiro item do array de resultados
        setData(result); // Salva os dados no estado

        // Verifica se há um logo e se ele é SVG
        if (result.logourl) {
          if (result.logourl.endsWith(".svg")) {
            setIsSvg(true); // Marca que o logo é SVG
            fetch(result.logourl) // Faz o fetch do SVG
              .then((res) => res.text()) // Pega o conteúdo como texto (string SVG)
              .then(setSvgXmlData) // Salva o SVG no estado
              .catch(() => setSvgXmlData(null)); // Se der erro, zera o SVG
          } else {
            setIsSvg(false); // Se não for SVG, marca como falso
          }
        }

        setLoading(false); // Marca que terminou de carregar
      })
      .catch(() => setLoading(false)); // Se houver erro, ainda assim tira o loading
  }, []); // Array vazio indica que só roda uma vez ao montar

  // Se estiver carregando, mostra o indicador de carregamento
  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  // Extrai valores numéricos com fallback para 0
  const preco = data?.regularMarketOpen;
  const variacao = data?.regularMarketChange;

  // Formata o preço para 2 casas decimais
  const precoFormatado =
    typeof preco === "number"
      ? preco.toFixed(2)
      : Number(preco || 0).toFixed(2);

  // Formata a variação para 2 casas decimais
  const variacaoFormatada =
    typeof variacao === "number"
      ? variacao.toFixed(2)
      : Number(variacao || 0).toFixed(2);

  // Define a cor da variação com base no valor
  const corVariacao = Number(variacaoFormatada) >= 0 ? "#28a745" : "#dc3545"; // verde para positivo, vermelho para negativo

  // Retorno visual do componente
  return (
    <View style={styles.container}>
      {/* Exibe o logo como SVG ou imagem, se estiver disponível */}
      {isSvg && svgXmlData ? (
        <SvgXml xml={svgXmlData} style={{ width: 100, height: 100 }} />
      ) : data?.logourl ? (
        <Image
          source={{ uri: data.logourl }}
          style={styles.logoRemote}
          resizeMode="contain"
        />
      ) : null}

      {/* Exibe informações principais da ação */}
      <Text style={styles.title}>{data?.longName ?? "Nome indisponível"}</Text>
      <Text>Símbolo: {data?.symbol ?? "N/A"}</Text>
      <Text>Preço: R$ {precoFormatado}</Text>

      {/* Exibe a variação com a cor definida dinamicamente */}
      <Text style={{ color: corVariacao, fontWeight: "bold" }}>
        Variação: {variacaoFormatada} %
      </Text>

      {/* Logotipo da sua aplicação no rodapé */}
      <Image
        source={require("../../assets/img/logo_cotacom.png")}
        style={styles.logo}
      />
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    padding: 20,
    backgroundColor: "#f4f4f4" // Cor de fundo clara
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF", // Azul forte
    marginBottom: 15
  },
  text: {
    fontSize: 22,
    color: "#333",
    marginBottom: 5
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745" // Verde (não está em uso no momento)
  },
  logo: {
    width: 250,
    height: 100,
    marginTop: 50,
    resizeMode: "contain"
  },
  logoRemote: {
    width: 40,
    height: 100,
    marginBottom: 20
  }
});
