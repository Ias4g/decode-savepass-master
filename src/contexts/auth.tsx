import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';


type UserData = {
    name: string
    url_avatar: string
}

type FormData = {
    name: string
    url_avatar: string
    email: string
    password: string
    password_confirm: string
}

type AuthContextData = {
    userLogged: boolean
    hasUser: boolean
    modalVisible: boolean
    user: UserData | null
    signIn(): Promise<void>
    verifyLogin(email: string, pass: string): void
    registerUser(data: FormData): void
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null)
    const [hasUser, setHasUser] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    // const [loading, setLoading] = useState(true)

    const { getItem, setItem } = useAsyncStorage("@savepass:user")

    async function signIn() {
        const response = await getItem()
        const res = response ? JSON.parse(response) : null

        setUser(res)

        if (res !== null) {
            setHasUser(true)
        } else {
            setHasUser(false)
        }
        // console.log(res)
    }

    async function verifyLogin(email: string, pass: string) {
        try {
            const response = await getItem()
            const newRespose = response ? JSON.parse(response) : null

            if ((newRespose.email === email) && (newRespose.password === pass)) {
                setUserLogged(true)
            } else {
                setUserLogged(false)
                Toast.show({
                    type: "error",
                    text1: "Usuário e/ou Senha Invalidos!",
                    position: 'top'
                })
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Ocorreu um erro inesperado ao fazer login!",
                position: 'top'
            })
        }

    }

    async function registerUser(data: FormData) {
        try {
            setItem(JSON.stringify(data))
            setModalVisible(!modalVisible)

            signIn()
            setHasUser(true)

            Toast.show({
                type: "success",
                text1: "Usuário cadastrado com sucesso",
                position: 'top'
            })
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Erro ao cadastrar Usuário",
                position: 'top'
            })
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
    //                 size='large'r
    //                 color='#000000'
    //             />
    //         </View>
    //     )
    // }

    useEffect(() => {
        signIn()
        setModalVisible(!modalVisible)
    }, [])

    return (
        <AuthContext.Provider value={{
            userLogged,
            hasUser,
            user,
            modalVisible,
            signIn,
            verifyLogin,
            registerUser
        }}>
            {children}
        </AuthContext.Provider >
    )
}