import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import Logo from '../../../assets/icon.png';
import { Login } from '../../components/Login';
import { Register } from '../../components/Register';


export function SignIn() {
    const [isUser, setIsUser] = useState(false);

    const navigation = useNavigation()
    const { getItem } = useAsyncStorage("@savepass:user")

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

    // async function biometric() {
    //     const compatible = await LocalAuthentication.hasHardwareAsync()
    //     if (compatible) {
    //         const biometricRecords = await LocalAuthentication.isEnrolledAsync()
    //         if (biometricRecords) {
    //             const result = await LocalAuthentication.authenticateAsync()

    //             if (result.success) {
    //                 // setModalVisible(false)
    //                 navigation.navigate("Home")
    //             } else {
    //                 await LocalAuthentication.cancelAuthenticate()
    //             }
    //         } else {
    //             Alert.alert("Biometria não cadastrada ou não encontrada.")
    //         }
    //     }
    // }

    useEffect(() => {
        getUser()
        // setModalVisible(true)
    }, [])

    // useEffect(() => {
    //     if (isUser) {
    //         biometric()
    //     }
    // }, [])

    return (
        <View style={styles.centeredView}>
            <Image
                source={Logo}
                style={styles.logo}
            />

            {
                isUser ? (
                    <Login />
                ) : (
                    <Register />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        width: 98,
        height: 98,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: -600,
        borderWidth: 4,
        borderColor: '#F2F3F5'
    }
});