import { yupResolver } from '@hookform/resolvers/yup';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { ControlledInput } from '../../components/ControlledInput';
import { HeaderForm } from '../../components/HeaderForm';
import { styles } from './styles';

type FormData = {
  id: string
  name: string
  email: string
  password: string
  password_confirm: string
}

const schema = yup.object({
  name: yup.string()
    .required("Informe o nome do serviço!"),
  email: yup.string()
    .email("Digite um e-mail valido!")
    .required("Informe seu melhor e-mail!"),
  password: yup.string()
    .required("Informe sua senha!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .max(12, "A senha deve ter no maximo 12 caracteres!"),
  password_confirm: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas não conferem!')
    .required("Informe a senha de confirmação!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!")
    .max(12, "A senha deve ter no maximo 12 caracteres!")
})

export function Form() {
  const navigation = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { getItem, setItem } = useAsyncStorage("@savepass:passwords")

  async function handleNew(data: FormData) {
    const id = uuid.v4()
    const name = data.name
    const email = data.email
    const password = data.password

    // const pass_crypto = await Crypto.digestStringAsync(
    //   Crypto.CryptoDigestAlgorithm.SHA256,
    //   password
    // )

    // console.log(pass_crypto)

    const newData = {
      id,
      name,
      email,
      password
    }

    try {
      const response = await getItem()
      const previewData = response ? JSON.parse(response) : []

      const datas = [...previewData, newData]

      setItem(JSON.stringify(datas))

      Toast.show({
        type: "success",
        text1: "Registro cadastrado com sucesso",
        position: 'top'
      })

    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar registros",
        position: 'top'
      })
    }

    navigation.navigate("Home")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <ControlledInput
              name='name'
              control={control}
              icon="person"
              placeholder="Nome do serviço."
              error={errors.name}
            />

            <ControlledInput
              name='email'
              control={control}
              icon="email"
              placeholder="E-mail ou usuário."
              keyboardType="email-address"
              autoCapitalize='none'
              error={errors.email}
            />

            <ControlledInput
              name='password'
              control={control}
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              error={errors.password}
            />

            <ControlledInput
              name='password_confirm'
              control={control}
              icon="lock"
              placeholder="Confirme a senha"
              secureTextEntry
              error={errors.password_confirm}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={handleSubmit(handleNew)}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}