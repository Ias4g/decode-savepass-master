import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Logo from '../../../assets/icon.png';
import { Login } from '../../components/Login';
import { Register } from '../../components/Register';
import { AuthContext } from '../../contexts/auth';


export function SignIn() {
    const { hasUser, user } = useContext(AuthContext)
    // console.log(user)

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

    return (
        <View style={styles.centeredView}>
            <Image
                source={Logo}
                style={styles.logo}
            />
            {
                hasUser ? (
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
        alignItems: 'center',
        paddingHorizontal: 20
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