import React, {useContext} from 'react';

import { SafeAreaView, Text } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function Pontos() {

  const  user  = useContext(AuthContext);

  console.log('Conteúdo do objeto user:', user);
    return (
        <SafeAreaView >
          <Text>Meus Pontos: </Text>

          <Text>Fácil: {user?.user?.pointMedium} </Text>

          <Text>Médio: </Text>

          <Text>Dificl: </Text>
        </SafeAreaView>
      );
}

