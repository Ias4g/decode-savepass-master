import React, { useContext } from "react"
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native"
import { Handle } from "../../components/UserInputScreens/AppTest"
import { AuthContext } from "../../contexts/auth"
import { styled } from './styles'


export function LogIn() {
  const { hasUser } = useContext(AuthContext)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styled.centeredView}
    >
      <StatusBar
        animated={true}
        barStyle='light-content'
        backgroundColor='#858585'
      />
      <Handle />
      {/* {hasUser ? <Login /> : <Register />} */}
    </KeyboardAvoidingView>
  )
}