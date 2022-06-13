import BottomSheet from '@gorhom/bottom-sheet'
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useContext, useRef } from "react"
import { useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import * as yup from "yup"
import { AuthContext } from "../../../contexts/auth"
import { Button } from "../../Button"
import { ControlledInput } from "../../ControlledInput"

type FormData = {
    email: string
    password: string
}

const schema = yup.object({
    email: yup.string().email("Email inválido!").required("Campo obrigatorio!"),
    password: yup
        .string()
        .required("Informe sua senha!")
        .min(6, "A senha deve ter pelo menos 6 caracteres!")
        .max(20, "A senha deve ter no maximo 12 caracteres!"),
})

export function Handle() {
    const { verifyLogin } = useContext(AuthContext)
    const bottomSheetRef = useRef<BottomSheet>(null)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    function handleLogin(data: FormData) {
        verifyLogin(data.email, data.password)
    }

    return (
        <BottomSheet
            index={0}
            ref={bottomSheetRef}
            snapPoints={['5%', '55%']}
            backgroundStyle={{ backgroundColor: '#F2F3F5' }}
        // handleIndicatorStyle={{
        //     backgroundColor: '#103683',
        //     marginTop: -25,
        //     height: 30,
        //     width: 50,
        //     borderRadius: 15
        // }}
        >
            <View style={styled.centeredView}>
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
        </BottomSheet>
    )
}

const styled = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "#F2F3F5",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 40
    },

    form: {
        width: "100%",
        marginVertical: 10,
    },

    description: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 40
    }
});
