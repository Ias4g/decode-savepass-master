import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { InitialPage } from '../screens/InitialPage'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
    return (
        <Navigator
        // screenOptions={{
        //     headerShown: false
        // }}
        >
            <Screen
                name='Initial Page'
                component={InitialPage}
            />
        </Navigator>
    )
}