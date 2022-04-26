import { yupResolver } from "@hookform/resolvers/yup";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Modal, Platform, View } from "react-native";
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import logo from '../../assets/logo.png';
import { Button } from "../../components/Button";
import { ControlledInput } from "../../components/ControlledInput";
import { AuthContext } from "../../contexts/auth";
import { styled } from './styles';

type FormData = {
  name: string;
  url_avatar: string;
  email: string;
  password: string;
  password_confirm: string;
};

const schema = yup.object({
  name: yup.string().required("Campo obrigatorio!"),
  url_avatar: yup
    .string()
    .url("Formato invalido")
    .required("Campo obrigatorio!"),
  email: yup.string().email("Email inválido!").required("Campo obrigatorio!"),
  password: yup
    .string()
    .required("Informe sua senha!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .max(20, "A senha deve ter no maximo 12 caracteres!"),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não conferem!")
    .required("Informe a senha de confirmação!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .max(20, "A senha deve ter no maximo 12 caracteres!"),
});

export function Register() {
  const { setItem } = useAsyncStorage("@savepass:user");
  const { modalVisibleRegister, setUserLogged } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

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

  async function registerUser(data: FormData) {
    try {
      await setItem(JSON.stringify(data))
      // setupdateDatas(true)
      setUserLogged(true)
      Toast.show({
        type: "success",
        text1: "Usuário cadastrado com sucesso",
        position: "top",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar Usuário",
        position: "top",
      });
    }
  }

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styled.container}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRegister}
      >
        <View style={styled.centeredView}>
          <Animated.Image source={logo} style={[styled.logo, logoStyle]} />
          <Animated.Text style={[styled.description, textStyle]}>Bem-vindo ao Iza Pass</Animated.Text>
          <View style={styled.modalView}>
            <View style={styled.form}>
              <ControlledInput
                name="name"
                control={control}
                icon="person"
                placeholder="Insira seu nome."
                error={errors.name}
              />
              <ControlledInput
                name="url_avatar"
                control={control}
                icon="link"
                placeholder="Insira a url do seu avatar"
                autoCapitalize="none"
                error={errors.url_avatar}
              />

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
              <ControlledInput
                name="password_confirm"
                control={control}
                icon="lock"
                placeholder="Insira sua senha."
                secureTextEntry
                error={errors.password_confirm}
              />
            </View>
            <Button title="Cadastrar" onPress={handleSubmit(registerUser)} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}