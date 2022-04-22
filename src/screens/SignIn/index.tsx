import React, { useContext, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Animated, {
  Easing, Extrapolate, interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import logo from '../../assets/logo.png';
import { Login } from "../../components/Login";
import { Register } from "../../components/Register";
import { AuthContext } from "../../contexts/auth";

export function SignIn() {
  const { hasUser } = useContext(AuthContext);
  const logoPosition = useSharedValue(-100)
  const textPosition = useSharedValue(30)

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoPosition.value }],
      opacity: interpolate(
        logoPosition.value,
        [-100, 0],
        [0, 1],
        Extrapolate.CLAMP
      )
    }
  })
  
  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: textPosition.value }],
      opacity: interpolate(
        textPosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP
      )
    }
  })

  useEffect(() => {
    logoPosition.value = withTiming(0, {
      duration: 500
    }, () => {
      textPosition.value = withTiming(0, {
        duration: 1000,
        easing: Easing.bounce
      })
    })
  }, [])

  return (
    <SafeAreaView style={styles.centeredView}>
      <StatusBar
        animated={true}
        barStyle='light-content'
        backgroundColor='#000'
      />

      <Animated.Image source={logo} style={[styles.logo, logoStyle]} />

      <Animated.Text style={[styles.description, textStyle]}>Bem-vindo ao Iza Pass</Animated.Text>

      {hasUser ? <Login /> : <Register />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#000',
  },

  logo: {
    width: 156,
    height: 156,
    marginTop: 50,
    marginBottom: 30
  },

  description: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 80
  }
});
