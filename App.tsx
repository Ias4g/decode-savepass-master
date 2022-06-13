import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Index } from './src';

function App() {
  return (
    <>
      <Index />
      <Toast />
    </>
  );
}

export default gestureHandlerRootHOC(App);