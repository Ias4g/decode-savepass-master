import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Button';
import { Card, CardProps } from '../../components/Card';
import { HeaderHome } from '../../components/HeaderHome';
import { NotFound } from '../NotFound';
import { styles } from './styles';

export function Home() {
  const [currentVersion, setCurrentVersion] = useState("");
  const [data, setData] = useState<CardProps[]>([]);

  const { getItem, setItem, removeItem } = useAsyncStorage("@savepass:passwords")

  async function handleFetchData() {
    const response = await getItem()

    const data = response ? JSON.parse(response) : []

    setData(data)
  }

  async function handleRemove(id?: string) {
    const response = await getItem()
    const previewData = response ? JSON.parse(response) : []

    if (id) {
      Alert.alert(
        "Aviso",
        "Tem certeza que deseja excluir este registro?",
        [
          {
            text: "Cancelar"
          },
          {
            text: "Sim", onPress: () => {
              const data = previewData.filter((item: CardProps) => item.id !== id)
              setItem(JSON.stringify(data))
              handleFetchData()

              Toast.show({
                type: 'success',
                text1: `Registro apagado!`,
                position: 'top'
              })
            }
          }
        ]
      );
    } else {
      Alert.alert(
        "Aviso!",
        "Tem certeza que deseja excluir todos os registros?",
        [
          {
            text: "Cancelar"
          },
          {
            text: "Sim", onPress: () => {
              removeItem()
              handleFetchData()

              Toast.show({
                type: 'success',
                text1: "Todos os registros foram apagados com sucesso!",
                position: 'top'
              })
            }
          }
        ]
      );
    }
  }

  function generateVersion() {
    const date = Date.now()
    const myArrow = String(date)

    const numberPrimary = myArrow.slice(0, 1)
    const numberSecundary = myArrow.slice(1, 3)
    const numberRest = myArrow.slice(3, myArrow.length)

    let version = `${numberPrimary}.${numberSecundary}.${numberRest}`
    setCurrentVersion(version)
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData()
      // console.log(currentVersion)
    }, [])
  )

  useEffect(() => {
    generateVersion()
  }, [])

  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>
          Suas senhas
        </Text>

        <Text style={styles.listCount}>
          {`${data.length} ao total`}
        </Text>
      </View>

      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) =>
            <Card
              data={item}
              onPress={() => handleRemove(item.id)}
            />
          }
        />
      ) : (
        <NotFound />
      )}

      <View style={styles.footer}>
        <Button
          style={!data.length ? styles.buttonDisabled : styles.buttonNotDisabled}
          title="Lista"
          onPress={() => handleRemove()}
          disabled={!data.length}
        />
      </View>

      <View>
        <Text style={styles.version}>
          Versão: {currentVersion}
        </Text>
      </View>
    </View>
  );
}