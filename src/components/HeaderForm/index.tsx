import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';


export function HeaderForm() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='#00A88E'
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <MaterialIcons
          name="chevron-left"
          size={32}
          color="#FFF"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Cadastro de senhas!
      </Text>
    </View>
  );
}