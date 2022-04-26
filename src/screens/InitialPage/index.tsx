import React, { useContext, useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import logoPng from '../../assets/login-screen.png';
import { Button } from "../../components/Button";
import { AuthContext } from "../../contexts/auth";
import { styles } from "./styles";

export function InitialPage() {
  const { biometric } = useContext(AuthContext);

  return (
    <View style={styles.centeredView}>
      <StatusBar
        animated={true}
        barStyle='dark-content'
        backgroundColor='#FFF'
      />
      <Image
        source={logoPng}
        resizeMode='contain'
        style={styles.logoPng}
      />
      <Text style={styles.title}>Olá!</Text>
      <Text style={styles.description}>Use a digital, PIN ou padrão para acessar o app.</Text>

      <View style={styles.footer}>
        <Button
          title="Entrar"
          onPress={biometric}
        />
      </View>
    </View>
  );
}
