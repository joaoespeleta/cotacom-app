import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Details({ route }) {
  const { symbol } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://brapi.dev/api/quote/${symbol}?token=mYUgg9E8YpzJihbwEHNaHP`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setData(json.results[0])
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  console.log("aa")
  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.longName}</Text>
      <Text>Símbolo: {data.symbol}</Text>
      <Text>Preço: R$ {data.regularMarketOpen}</Text>
      <Text>Variação: {data.regularMarketChange} %</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});