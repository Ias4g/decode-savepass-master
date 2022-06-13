import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Form } from '../screens/Form'
import { Home } from '../screens/Home'


const { Screen, Navigator } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name='Home'
                component={Home}
            />
            <Screen
                name='Form'
                component={Form}
            />
        </Navigator>
    )
}