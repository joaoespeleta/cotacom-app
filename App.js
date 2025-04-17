// Importa o React, necessário para usar JSX
import React from 'react';

// Importa o container de navegação do React Navigation
import { NavigationContainer } from '@react-navigation/native';

// Importa o criador de navegação em pilha (stack) nativo
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa os dois componentes de tela da aplicação
import Home from './src/pages/Home';
import Details from './src/pages/Details';

// Cria o stack navigator (navegação estilo pilha, como páginas empilhadas)
const Stack = createNativeStackNavigator();

// Função principal da aplicação
export default function App() {
  return (
    // NavigationContainer é o componente que gerencia a navegação da aplicação
    <NavigationContainer>
      {/* Define as telas disponíveis no stack navigator */}
      <Stack.Navigator
        screenOptions={{
          // Define estilos globais para o título do cabeçalho
          headerTitleStyle: {
            fontSize: 20, // Tamanho da fonte do título
            fontWeight: 'bold', // Negrito
          },
        }}
      >
        {/* Tela inicial (página Home), o nome "COTACOM" será exibido no cabeçalho */}
        <Stack.Screen name="COTACOM" component={Home} />

        {/* Tela de detalhes, chamada quando o usuário pesquisa uma ação */}
        <Stack.Screen name="Detalhes" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
