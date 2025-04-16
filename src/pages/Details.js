import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Details({ route }) {
  const { symbol } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [svgXmlData, setSvgXmlData] = useState(null);
  const [isSvg, setIsSvg] = useState(false);

  useEffect(() => {
    fetch(`https://brapi.dev/api/quote/${symbol}?token=mYUgg9E8YpzJihbwEHNaHP`)
      .then((res) => res.json())
      .then((json) => {
        const result = json.results[0];
        setData(result);

        if (result.logourl) {
          if (result.logourl.endsWith(".svg")) {
            setIsSvg(true);
            fetch(result.logourl)
              .then((res) => res.text())
              .then(setSvgXmlData)
              .catch(() => setSvgXmlData(null));
          } else {
            setIsSvg(false);
          }
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  // Tratamento seguro de valores numéricos
  const preco = data?.regularMarketOpen;
  const variacao = data?.regularMarketChange;

  const precoFormatado =
    typeof preco === "number"
      ? preco.toFixed(2)
      : Number(preco || 0).toFixed(2);

  const variacaoFormatada =
    typeof variacao === "number"
      ? variacao.toFixed(2)
      : Number(variacao || 0).toFixed(2);

  return (
    <View style={styles.container}>
      {isSvg && svgXmlData ? (
  <SvgXml xml={svgXmlData} style={{ width: 100, height: 100 }} />
) : data?.logourl ? (
  <Image
    source={{ uri: data.logourl }} // 👈 ESSENCIAL!
    style={styles.logoRemote}
    resizeMode="contain"
  />
) : null}


      <Text style={styles.title}>{data?.longName ?? "Nome indisponível"}</Text>
      <Text>Símbolo: {data?.symbol ?? "N/A"}</Text>
      <Text>Preço: R$ {precoFormatado}</Text>
      <Text>Variação: {variacaoFormatada} %</Text>

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
    backgroundColor: "#f4f4f4"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 15
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745"
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50
  }, logoRemote: {
    width: 100,
    height: 100,
    marginBottom: 20
  }
});
