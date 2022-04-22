import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { InitialPage } from '../screens/InitialPage'
import { SignIn } from '../screens/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
    const { hasUser } = useContext(AuthContext);

    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {hasUser ? (
                <Screen
                    name='Initial Page'
                    component={InitialPage}
                />
            ) : (
                <Screen
                    name='Login'
                    component={SignIn}
                />
            )}


        </Navigator>
    )
}