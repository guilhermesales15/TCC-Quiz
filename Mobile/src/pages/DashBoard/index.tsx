import React, { useContext } from "react";
import {  SafeAreaView, TouchableOpacity, StyleSheet, Text} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

import {Feather} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

export default function DashBoard() {
  const { signOut, user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

 async function EasyQuestion(){
  navigation.navigate('EasyQuestionsScreen')
 }

 async function MediumQuestion(){
  navigation.navigate('MediumQuestionsScreen')
 }

 async function HardQuestion(){
  navigation.navigate('HardQuestionsScreen')
 }

 async function Pontos(){
  navigation.navigate('Pontos')
 }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={signOut} style={styles.logOut}>
        <Feather name="log-out" size={30} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>
        Bem vindo(a) {user ? user.name : ''} !
      </Text>

      <Text style={styles.choose}>
        Escolha uma dificuldade :
      </Text>

      <TouchableOpacity style={styles.facil} onPress={EasyQuestion}>
        <Text style={styles.buttonText}>Fácil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.medio} onPress={MediumQuestion}>
        <Text style={styles.buttonText}>Médio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dificil} onPress={HardQuestion}>
        <Text style={styles.buttonText}>Difícil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pontos} onPress={Pontos}>
        <Text style={styles.buttonText}>Meus Pontos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: '#04cc9e'

  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 24
  },

  choose:{
    color: '#fff',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40
  },

  facil:{
    marginBottom: 20,
    width: '75%',
    height:40,
    backgroundColor: '#1E90FF',
    borderRadius: 4,
    justifyContent:'center',
    alignItems: "center"

  },
  medio:{
    marginBottom: 20,
    width: '75%',
    height:40,
    backgroundColor: '#ffff00',
    borderRadius: 4,
    justifyContent:'center',
    alignItems: "center"
  },
  dificil:{
    marginBottom: 20,
    width: '75%',
    height:40,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    justifyContent:'center',
    alignItems: "center"
    
  },

  buttonText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold",
  },

  pontos:{
    marginBottom: 20,
    width: '50%',
    height:40,
    backgroundColor: '#0a5c0a',
    borderRadius: 4,
    justifyContent:'center',
    alignItems: "center",
    position: 'absolute',
    bottom: 30,
    
  },

  logOut:{

    position: 'absolute',
    top: 10,
    right: 10,
    padding: 16,
  }

})