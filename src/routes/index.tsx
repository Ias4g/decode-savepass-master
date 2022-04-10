import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Form } from '../screens/Form';
import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';


const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="Signin"
          component={SignIn}
        />
        <Screen
          name="Home"
          component={Home}
        />
        <Screen
          name="Form"
          component={Form}
        />
      </Navigator>
    </NavigationContainer>
  )
}