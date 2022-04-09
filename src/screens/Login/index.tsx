import { yupResolver } from '@hookform/resolvers/yup';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, Modal, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import Logo from '../../../assets/icon.png';
import { Button } from '../../components/Button';
import { ControlledInput } from '../../components/ControlledInput';


type FormData = {
    email: string
    password: string
}

const schema = yup.object({
    email: yup.string()
        .email("Email inválido!")
        .required("Campo obrigatorio!"),
    password: yup.string()
        .required("Informe sua senha!")
        .min(6, "A senha deve ter pelo menos 6 caracteres!")
        .max(20, "A senha deve ter no maximo 12 caracteres!")
})

export function Login() {
    const [modalVisible, setModalVisible] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const navigation = useNavigation()

    const { getItem, setItem } = useAsyncStorage("@savepass:user")

    async function getUser() {
        try {
            const response = await getItem()

            if (response !== null) {
                setIsUser(true)
            }
        } catch (error) {
            Alert.alert(`Erro ao buscar dados ${error}`)
        }
    }

    async function handleLogin(data: FormData) {
        try {
            const response = await getItem()
            const { email, password } = response ? JSON.parse(response) : []

            if ((data.email === email) && (data.password === password)) {
                setModalVisible(!modalVisible)
                navigation.navigate("Home")
            } else {
                Toast.show({
                    type: "error",
                    text1: "Usuário e/ou Senha Invalidos!",
                    position: 'top'
                })
            }
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Ocorreu um erro inesperado ao fazer login!",
                position: 'top'
            })
        }
    }

    async function handleRegister(data: FormData) {
        const { email, password } = data

        const newData = {
            email,
            password
        }

        try {
            setItem(JSON.stringify(newData))

            Toast.show({
                type: "success",
                text1: "Usuário cadastrado com sucesso",
                position: 'top'
            })

            setIsUser(true)

        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Erro ao cadastrar Usuário",
                position: 'top'
            })
        }
    }

    useEffect(() => {
        getUser()
        setModalVisible(true)
    }, [])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={Logo}
                            style={styles.avatar}
                        />
                        <View style={styles.form}>
                            <ControlledInput
                                name='email'
                                control={control}
                                icon="lock"
                                placeholder="Insira sua e-mail!"
                                keyboardType="email-address"
                                autoCapitalize='none'
                                error={errors.email}
                            />

                            <ControlledInput
                                name='password'
                                control={control}
                                icon="lock"
                                placeholder="Insira sua senha!"
                                secureTextEntry
                                error={errors.password}
                            />
                        </View>
                        {
                            isUser ? (
                                <Button
                                    title='Entrar'
                                    onPress={handleSubmit(handleLogin)}
                                />
                            ) : (
                                <Button
                                    title='Cadastrar'
                                    onPress={handleSubmit(handleRegister)}
                                />
                            )
                        }
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalView: {
        width: '90%',
        padding: 20,
        elevation: 5,
        borderRadius: 20,
        shadowRadius: 20,
        textAlign: 'center',
        shadowColor: '#000',
        alignItems: 'center',
        shadowOpacity: 0.25,
        backgroundColor: '#F2F3F5',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    avatar: {
        width: 98,
        height: 98,
        borderRadius: 100,
        marginBottom: 20,
        marginTop: -68,
        borderWidth: 4,
        borderColor: '#F2F3F5'
    },

    form: {
        width: '100%'
    }
});