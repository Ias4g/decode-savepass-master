import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

type UserData = {
  name: string;
  url_avatar: string;
};

type AuthContextData = {
  hasUser: boolean;
  userLogged: boolean;
  user: UserData | null;
  modalVisibleLogin: boolean;
  modalVisibleRegister: boolean;
  getUser(): Promise<void>;
  verifyLogin(email: string, pass: string): void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [modalVisibleLogin, setModalVisibleLogin] = useState(false);

  const { getItem, removeItem } = useAsyncStorage("@savepass:user");

  async function getUser() {
    // await removeItem()
    const response = await getItem();

    response ? setModalVisibleLogin(true) : setModalVisibleRegister(true);

    const res = response ? JSON.parse(response) : null;
    setUser(res);
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

  // if (loading) {
  //     return (
  //         <View style={{
  //             flex: 1,
  //             justifyContent: 'center',
  //             alignItems: 'center'
  //         }}>
  //             <ActivityIndicator
  //                 size='large'
  //                 color='#000000'
  //             />
  //         </View>
  //     )
  // }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        hasUser: !!user,
        userLogged,
        user,
        modalVisibleLogin,
        modalVisibleRegister,
        getUser,
        verifyLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
