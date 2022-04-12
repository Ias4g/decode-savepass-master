import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Form } from '../screens/Form'
import { Home } from '../screens/Home'


const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator>
            <Screen name='Home' component={Home} />
            <Screen name='Form' component={Form} />
        </Navigator>
    )
}