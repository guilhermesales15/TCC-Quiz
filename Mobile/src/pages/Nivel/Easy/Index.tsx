import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../../services/api';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { AntDesign } from '@expo/vector-icons'; 

interface Question {
  id: number;
  texto: string;
  opcoes: Option[];
  nivelId: number; 
}

interface Option {
  id: number;
  texto: string;
  correta: boolean;
}


export default function EasyQuestionsScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    openQuestion();
  }, []);

  async function openQuestion() {
    try {
      const response: AxiosResponse<Question[]> = await api.get('/listPergunta');
      const filteredQuestions = response.data.filter((question) => question.nivelId === 1);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Erro ao buscar as perguntas', error);
    }
  }

  function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fácil</Text>

      <View style={styles.containerQuestion}>
        <Text style={styles.questionText}>{currentQuestion?.texto}</Text>
        {currentQuestion?.opcoes.map((option) => (
          <TouchableOpacity style={styles.button} key={option.id}>
            <Text style={styles.buttonText}>{option.texto}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navigationButtons}>

        <TouchableOpacity
          style={[styles.button, styles.navigationButton]}
          onPress={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <AntDesign name="banckward" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.navigationButton]}
          onPress={goToNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <AntDesign name="forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerQuestion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#1E90FF'
  },
  container: {
    flex: 1,
    backgroundColor: '#1E90FF'
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: '#fff',
    marginTop: 20,
    marginLeft: 175
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 40
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    marginBottom: 20,
    width: '75%',
    height: 50,
    backgroundColor: '#0a5c0a',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: "center"
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navigationButton: {
    width: '45%',
  },
});
