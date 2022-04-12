import { Text, View, Image } from 'react-native';

import { styles } from './styles';

export function NotFound() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3860/3860187.png' }}
      />
      <Text style={styles.title}>
        Nenhum registro encontrado!
      </Text>
    </View>
  );
}