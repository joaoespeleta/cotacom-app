import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  const [symbol, setSymbol] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o código da ação (ex: PETR4)"
        value={symbol}
        onChangeText={setSymbol}
        style={styles.input}
      />
      <Button
        title="Buscar"
        onPress={() => navigation.navigate('Details', { symbol })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});