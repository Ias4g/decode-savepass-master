import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { styles } from './styles';


export function HeaderHome() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  function handleAdd() {
    navigation.navigate("Form", {});
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.url_avatar }}
        style={styles.avatar}
      />

      <View style={styles.user}>
        <Text style={styles.title}>
          {user?.name}
        </Text>
        <Text style={styles.subtitle}>
          Sinta-se seguro aqui.
        </Text>
      </View>


      <TouchableOpacity
        onPress={handleAdd}
        style={styles.button}
      >
        <MaterialIcons
          name="add"
          size={22}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}