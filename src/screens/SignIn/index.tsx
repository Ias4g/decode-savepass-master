import React, { useContext } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Login } from "../../components/Login";
import { Register } from "../../components/Register";
import { AuthContext } from "../../contexts/auth";

export function SignIn() {
  const { hasUser } = useContext(AuthContext);

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
    <SafeAreaView style={styles.centeredView}>
      <StatusBar
        animated={false}
        barStyle='light-content'
        backgroundColor='#000'
      />
      {hasUser ? <Login /> : <Register />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: "#FDB924",
    backgroundColor: '#000',
  },
});
