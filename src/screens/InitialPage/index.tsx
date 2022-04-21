import React from "react";
import { Image, SafeAreaView, StatusBar, Text } from "react-native";
import logoPng from '../assets/login-screen.png';
import logoSvg from '../assets/login-screen.svg';
import { styles } from "./styles";

export function InitialPage() {

  return (
    <SafeAreaView style={styles.centeredView}>
      <StatusBar
        animated={true}
        barStyle='light-content'
        backgroundColor='#000'
      />
      <Text>Imagem png</Text>
      <Image
        source={logoPng}
      />

      <Text>Imagem svg</Text>
      <Image
        source={logoSvg}
      />
    </SafeAreaView>
  );
}
