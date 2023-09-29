import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default function SignIn(){
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
                />

                <TextInput
                    placeholder="Insira a sua senha"
                    style={styles.input}
                    placeholderTextColor={'#f0f0f0'}
                />

                <TouchableOpacity style= {styles.button}>
                   <Text style={ styles.buttonText}>Go !!!</Text> 
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
        width: 300, 
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
        backgroundColor: '#00CED1',
        marginBottom: 10,
        borderRadius: 4,
        paddingHorizontal:8,
        color: '#fff'
    }, 
    button:{
        width: '95%',
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