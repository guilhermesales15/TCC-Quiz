import { createContext, ReactNode, useState } from "react";
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from "next/router";

import { api } from "@/services/apiClient";
 
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;
  signOut: () =>void;
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

   Router.push('/dashboard')

   }catch(err){
    console.log("erro ao acessar", err)
   }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
