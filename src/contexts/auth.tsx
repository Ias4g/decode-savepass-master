import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';
import React, { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

type UserData = {
  name: string;
  url_avatar: string;
};

type AuthContextData = {
  hasUser: boolean;
  userLogged: boolean
  user: UserData | null;
  getUser(): Promise<void>;
  modalVisibleLogin: boolean;
  modalVisibleRegister: boolean;
  setUserLogged(bool: boolean): void
  verifyLogin(email: string, pass: string): void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [modalVisibleLogin, setModalVisibleLogin] = useState(false)

  const { getItem, removeItem } = useAsyncStorage("@savepass:user");

  async function getUser() {
    // await removeItem()
    const response = await getItem();
    if (response) {
      const res = response ? JSON.parse(response) : null;
      setUser(res)
      return res
    } else {
      setModalVisibleRegister(true)
    }
  }

  async function biometric() {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    if (compatible) {
      const biometricRecords = await LocalAuthentication.isEnrolledAsync()
      if (biometricRecords) {
        const result = await LocalAuthentication.authenticateAsync()
        if (result.success) {
          setUserLogged(true);
        } else {
          LocalAuthentication.cancelAuthenticate()
          setModalVisibleLogin(true)
        }
      } else {
        setModalVisibleLogin(true)
        Toast.show({
          type: "error",
          text1: "Biometria não cadastrada ou não encontrada!",
          position: "top",
        })
      }
    } else {
      setModalVisibleLogin(true)
      Toast.show({
        type: "error",
        text1: "Aparelho não compativel com impressão digital!",
        position: "top",
      })
    }
  }

  async function verifyLogin(email: string, pass: string) {
    try {
      const response = await getItem();
      const newRespose = response ? JSON.parse(response) : null;

      if (newRespose.email === email && newRespose.password === pass) {
        setUserLogged(true);
      } else {
        setUserLogged(false);
        Toast.show({
          type: "error",
          text1: "Usuário e/ou Senha Invalidos!",
          position: "top",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ocorreu um erro inesperado ao fazer login!",
        position: "top",
      });
    }
  }

  useEffect(() => {
    async function load() {
      const rss = await getUser()
      if (rss) {
        biometric()
      }
    }

    load()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        getUser,
        userLogged,
        verifyLogin,
        setUserLogged,
        hasUser: !!user,
        modalVisibleLogin,
        modalVisibleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
