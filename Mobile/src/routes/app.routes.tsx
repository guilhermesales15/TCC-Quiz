import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoard from '../pages/DashBoard';
import EasyQuestionsScreen from '../pages/Nivel/Easy/Index';
import HardQuestionsScreen from '../pages/Nivel/Hard';
import MediumQuestionsScreen from '../pages/Nivel/Medium';
import Pontos from '../pages/Pontos';



export type StackPramsList ={
    Dashboard: undefined,
    EasyQuestionsScreen: undefined,
    MediumQuestionsScreen: undefined,
    HardQuestionsScreen: undefined,
    Pontos:undefined,
}

const Stack = createNativeStackNavigator<StackPramsList>();



function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashBoard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EasyQuestionsScreen"
        component={EasyQuestionsScreen}
        options={{ headerShown: false }}
        
      />
      <Stack.Screen
        name="MediumQuestionsScreen"
        component={MediumQuestionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HardQuestionsScreen"
        component={HardQuestionsScreen}
        options={{  headerShown: false }}
      />
      <Stack.Screen
      name='Pontos'
      component={Pontos}
      options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
