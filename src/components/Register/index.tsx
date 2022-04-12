import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { ControlledInput } from '../../components/ControlledInput';
import { AuthContext } from '../../contexts/auth';


type FormData = {
    name: string
    url_avatar: string
    email: string
    password: string
    password_confirm: string
}

const schema = yup.object({
    name: yup.string().required("Campo obrigatorio!"),
    url_avatar: yup.string().url("Formato invalido").required("Campo obrigatorio!"),
    email: yup.string()
        .email("Email inválido!")
        .required("Campo obrigatorio!"),
    password: yup.string()
        .required("Informe sua senha!")
        .min(6, "A senha deve ter pelo menos 6 caracteres!")
        .max(20, "A senha deve ter no maximo 12 caracteres!"),
    password_confirm: yup.string()
        .oneOf([yup.ref('password'), null], 'As senhas não conferem!')
        .required("Informe a senha de confirmação!")
        .min(6, "A senha deve ter pelo menos 6 caracteres!")
        .max(20, "A senha deve ter no maximo 12 caracteres!")
})

export function Register() {
    const { registerUser, modalVisible } = useContext(AuthContext)
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    async function handleRegister(data: FormData) {
        registerUser(data)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.form}>
                        <ControlledInput
                            name='name'
                            control={control}
                            icon="person"
                            placeholder="Insira seu nome."
                            error={errors.name}
                        />
                        <ControlledInput
                            name='url_avatar'
                            control={control}
                            icon="link"
                            placeholder="Insira a url do seu avatar"
                            autoCapitalize='none'
                            error={errors.url_avatar}
                        />

                        <ControlledInput
                            name='email'
                            control={control}
                            icon="email"
                            placeholder="Insira seu e-mail."
                            keyboardType="email-address"
                            autoCapitalize='none'
                            error={errors.email}
                        />

                        <ControlledInput
                            name='password'
                            control={control}
                            icon="lock"
                            placeholder="Insira sua senha."
                            secureTextEntry
                            error={errors.password}
                        />
                        <ControlledInput
                            name='password_confirm'
                            control={control}
                            icon="lock"
                            placeholder="Insira sua senha."
                            secureTextEntry
                            error={errors.password_confirm}
                        />
                    </View>

                    <Button
                        title='Entrar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </View>
            </View>
        </Modal>
    )
}

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

    form: {
        width: '100%'
    }
});