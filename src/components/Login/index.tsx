import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, View } from "react-native";
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as yup from "yup";
import logo from '../../assets/logo.png';
import { Button } from "../../components/Button";
import { ControlledInput } from "../../components/ControlledInput";
import { AuthContext } from "../../contexts/auth";
import { styled } from './styles';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Email inválido!").required("Campo obrigatorio!"),
  password: yup
    .string()
    .required("Informe sua senha!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .max(20, "A senha deve ter no maximo 12 caracteres!"),
});

export function Login() {
  const { verifyLogin, modalVisibleLogin } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function handleLogin(data: FormData) {
    verifyLogin(data.email, data.password);
  }


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
      duration: 1000
    }, () => {
      textPosition.value = withTiming(0, {
        duration: 1000,
        easing: Easing.bounce
      })
    })
  }, [])

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisibleLogin}>
      <View style={styled.centeredView}>
        <Animated.Image source={logo} style={[styled.logo, logoStyle]} />
        <Animated.Text style={[styled.description, textStyle]}>Bem-vindo ao Iza Pass</Animated.Text>
        <View style={styled.modalView}>
          <View style={styled.form}>
            <ControlledInput
              name="email"
              control={control}
              icon="email"
              placeholder="Insira seu e-mail."
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <ControlledInput
              name="password"
              control={control}
              icon="lock"
              placeholder="Insira sua senha."
              secureTextEntry
              error={errors.password}
            />
          </View>
          <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
        </View>
      </View>
    </Modal>
  );
}