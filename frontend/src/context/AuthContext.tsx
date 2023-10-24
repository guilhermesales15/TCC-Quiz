import { createContext, ReactNode, useState, useEffect } from "react";
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from "next/router";

import { api } from "@/services/apiClient";

import {toast} from 'react-toastify'

 
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;
  signOut: () =>void;
  signUp: (credentials: SignUpProps)=>Promise<void>;
  signUpAluno: (credentials: SignUpAlunoProps)=>Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignProps = {
  email: string;
  password: string;
}

export type SignUpProps ={
  name :string ;
  email: string;
  password: string;
}

export type SignUpAlunoProps ={
  name :string ;
  email: string;
  password: string;
  birthDate: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@nextAuth.token')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')

    }
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Defina um valor inicial para user
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: ""
  });

  const isAuthenticated = !!user;

  useEffect(()=>{
    const {'@nextAuth.token':token} = parseCookies();

    if(token){
      api.get('/detailProf').then(response =>{
        const {id, name, email} = response.data

        setUser({
          id,
          name,
          email
        })
      })

      .catch(()=>{
        signOut()
      })
    }

  }, [])

  async function signIn({email, password} : SignProps) {
   try{
    const response = await api.post('/loginProf', {
        email,
        password
    })

    const {id, name, token} = response.data;

   setCookie(undefined,'@nextAuth.token', token, {
    maxAge: 60*60*24*30, //expira em 1 mes
    path: '/'
   })

   setUser({
    id,
    name,
    email
   })

   api.defaults.headers['Authorization'] = `Bearer ${token}`

   toast.success("bem vindo")

  

   Router.push('/dashboard')

   }catch(err){
    toast.error('Erro ao acessar');
   }
  }

  async function signUp({name, email, password}: SignUpProps){
    try{
      
      const response = await api.post('/userProf',{
        name,
        email,
        password
      })

      toast.success('Cadastrado com sucesso');
     
      Router.push('/')

      
    }catch(err){
      toast.error("erro ao cadastrar");
    }
  }

  async function signUpAluno({name, email, password, birthDate}: SignUpAlunoProps){
    try{
      
      const response = await api.post('/userAluno',{
        name,
        email,
        password,
        birthDate
      })

      toast.success('Cadastrado com sucesso');
     

      
    }catch(err){
      toast.error("erro ao cadastrar");
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, signUpAluno }}>
      {children}
    </AuthContext.Provider>
  );
}
