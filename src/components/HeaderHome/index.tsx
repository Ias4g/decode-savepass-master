import { MaterialIcons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';


export function HeaderHome() {
  const navigation = useNavigation();
  const [user, setUser] = useState("")
  const [avatarUrl, setAvatarUrl] = useState()

  function handleAdd() {
    navigation.navigate("Form", {});
  }

  const { getItem } = useAsyncStorage("@savepass:user")

  async function getUser() {
    try {
      const response = await getItem()
      const { user, avatar } = response ? JSON.parse(response) : []
      setUser(user)
      setAvatarUrl(avatar)

      console.log(response)
    } catch (error) {
      Alert.alert(`Erro ao buscar dados ${error}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />

      <View style={styles.user}>
        <Text style={styles.title}>
          {user}
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