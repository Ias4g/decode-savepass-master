import React, { useContext } from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { Login } from "../../components/Login";
import { Register } from "../../components/Register";
import { AuthContext } from "../../contexts/auth";
import { styled } from './styles';

export function SignIn() {
  const { hasUser } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styled.centeredView}>
      <StatusBar
        animated={true}
        barStyle='light-content'
        backgroundColor='#000'
      />

      {hasUser ? <Login /> : <Register />}
    </KeyboardAvoidingView>
  );
}