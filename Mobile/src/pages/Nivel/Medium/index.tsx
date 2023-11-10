import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { api } from '../../../services/api';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from '../../../contexts/AuthContext';

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
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]); 
  const  { user } = useContext(AuthContext);

  useEffect(() => {
    openQuestion();
  }, []);

  async function openQuestion() {
    try {
      const response: AxiosResponse<Question[]> = await api.get('/listPergunta');
      const filteredQuestions = response.data.filter((question) => question.nivelId === 2);
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Erro ao buscar as perguntas', error);
    }
  }

  async function handleOptionSelect(option: Option) {
    if (!answeredQuestions.includes(questions[currentQuestionIndex].id)) {
      setAnsweredQuestions([...answeredQuestions, questions[currentQuestionIndex].id]);
  
      if (option.correta) {
        try {
          const userId = user?.id;
          const scoreType = "pointMedium";
          const newScore = 1;
  
          const response = await api.put('/score', { userId, scoreType, newScore });
          
        } catch (error) {
          console.error('Erro ao atualizar a pontuação', error);
        }
      }
    }
  
    goToNextQuestion();
  }
  

  useEffect(() => {
    if (answeredQuestions.length === questions.length && questions.length > 0) {
      Alert.alert(
        'Todas as perguntas respondidas',
        'Você respondeu todas as perguntas. Verifique a sua pontuação em Meus Pontos.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  }, [answeredQuestions, questions]);

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
      <View style={styles.containerQuestion}>
        <Text style={styles.questionText}>{currentQuestion?.texto}</Text>
        {currentQuestion?.opcoes.map((option) => (
          <TouchableOpacity
            style={styles.button}
            key={option.id}
            onPress={() => handleOptionSelect(option)}
            disabled={answeredQuestions.includes(currentQuestion.id)}
          >
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
    backgroundColor: '#ffff00'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffff00'
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: '#0a5c0a',
    marginTop: 20,
    marginLeft: 175
  },
  questionText: {
    color: '#0a5c0a',
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
