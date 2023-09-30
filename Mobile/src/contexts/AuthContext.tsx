import React, { useState, createContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type AuthContextData = {
  user: UserProps | null; // Altere o tipo para UserProps | null
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
  const [user, setUser] = useState<UserProps | null>(null); // Inicialize com null

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user?.token; // Verifique se o token está presente

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

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("chave", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        token,
        email,
      });

      setLoadingAuth(false);
    } catch (err) {
      console.log("erro: ", err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null); // Defina o usuário como null no logout
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
