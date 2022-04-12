import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import { Routes } from './routes';

export function Index() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </NavigationContainer> 
    );
}  