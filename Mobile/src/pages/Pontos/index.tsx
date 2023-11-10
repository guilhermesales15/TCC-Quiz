import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

type UserData = {
  pointEasy: number;
  pointMedium: number;
  pointHard: number;
};

export default function Pontos() {
  const { user } = useContext(AuthContext); // Destructure user from the AuthContext
  const [userData, setUserData] = useState<UserData | null>();

  const fetchUserData = async () => {
    try {
      const response = await api.get('detailAluno');
      setUserData(response.data as UserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleResetScore = async () => {
    try {
      const userId = user?.id; // Access the user's ID
      await api.put(`/reset/${userId}`); // Pass the user's ID in the URL

      fetchUserData();
    } catch (error) {
      console.error('Error resetting score:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meus Pontos:</Text>
      <Text style={styles.text}>Fácil: {userData?.pointEasy} </Text>
      <Text style={styles.text}>Médio: {userData?.pointMedium}</Text>
      <Text style={styles.text}>Difícil: {userData?.pointHard}</Text>

      <TouchableOpacity style={styles.button} onPress={handleResetScore}>
        <Text style={styles.buttonText}>Zerar pontuação</Text>
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

  text:{
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 24

  },

  button:{

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

  buttonText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold",
  },


})