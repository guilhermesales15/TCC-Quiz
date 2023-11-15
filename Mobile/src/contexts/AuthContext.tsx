import React, { useState, createContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import {  ToastAndroid } from "react-native";

type AuthContextData = {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn: (credential: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
  pointEasy: number; 
  pointMedium: number;
  pointHard: number;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user?.token;


  function showToast() {
    ToastAndroid.show('Email/Senhas estão incorretos !!!', ToastAndroid.SHORT);
  }

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem("chave");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
          pointEasy: hasUser.pointEasy,
          pointMedium: hasUser.pointMedium,
          pointHard: hasUser.pointHard,
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/loginAluno", {
        email,
        password,
      });

      const { id, name, token, pointEasy, pointMedium, pointHard } = response.data; 

      await AsyncStorage.setItem("chave", JSON.stringify(response.data)); // Salve os dados completos no armazenamento

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        token,
        email,
        pointEasy,
        pointMedium,
        pointHard,
      });

      setLoadingAuth(false);
    } catch (err) {
      showToast()
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
