import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { LogIn } from '../screens/LogIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
    const { hasUser } = useContext(AuthContext);

    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            {/* <Screen
                name='Initial Page'
                component={InitialPage}
            /> */}
            <Screen
                name='Login'
                component={LogIn}
            />


        </Navigator>
    )
}