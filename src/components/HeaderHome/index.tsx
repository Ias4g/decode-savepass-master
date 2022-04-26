import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { styles } from './styles';


export function HeaderHome() {
  const navigation = useNavigation();
  const { user, getUser } = useContext(AuthContext)

  function handleAdd() {
    navigation.navigate("Form", {});
  }

  useFocusEffect(
    useCallback(() => {
      getUser()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.url_avatar }}
        style={styles.avatar}
        resizeMode='cover'
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
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}