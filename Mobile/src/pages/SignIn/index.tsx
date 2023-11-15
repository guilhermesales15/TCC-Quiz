import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity,ActivityIndicator, ToastAndroid } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";


export default function SignIn(){

    const {signIn, loadingAuth} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    function showToast() {
        ToastAndroid.show('Email/Senhas estão vazios !!!', ToastAndroid.SHORT);
      }
    
    
    async function handleLogin(){
        if(email==='' || password ===''){
            showToast()
            return;
            

        }

        await signIn({email, password})

    }
 
    return(
        <View style={styles.container}>
            <Image style={styles.logo}
                source={require('../../assets/TDeam.gif')}
            
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Insira o seu email"
                    style={styles.input}
                    placeholderTextColor={'#f0f0f0'}
                    value={email}
                    onChangeText={setEmail}
                 
                />

                <TextInput
                    placeholder="Insira a sua senha"
                    style={styles.input}
                    secureTextEntry={true}
                    placeholderTextColor={'#f0f0f0'}
                    value={password}
                    onChangeText={setPassword}
                    
                />

                <TouchableOpacity style= {styles.button} onPress={handleLogin} >
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color={'#FFFFF'}/>
                    ): (
                        <Text style={ styles.buttonText}>Go !!!</Text> 
                    )}
                </TouchableOpacity>

                
            </View>

           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#04cc9e'
    },
    logo:{
        marginBottom:18,
        width: 400, 
        height: 200, 
    },
    inputContainer:{
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32, 
        paddingHorizontal:14,
    },
    input:{
        width: '95%',
        height: 40,
        backgroundColor: '#0a5c0a',
        marginBottom: 10,
        borderRadius: 4,
        paddingHorizontal:8,
        color: '#fff'
    }, 
    button:{
        width: '80%',
        height: 40,
        backgroundColor: '#32CD32',
        marginBottom: 10,
        marginTop: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color:"#fff",
        fontSize: 18,
        fontWeight: 'bold'
    }
})