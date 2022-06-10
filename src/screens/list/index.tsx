import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, StyleSheet, ToastAndroid, View } from 'react-native'
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { Order } from '../../model/orders'
import ItemOrder from './itens-order'

interface ListProps {}

const List = (props: ListProps) => {
  const nav = useNavigation<any>()
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    nav.addListener('focus', async () => {
      var user_id = await AsyncStorage.getItem('user_id')

      api.get(`/orders/${user_id}`).then((response) => setOrders(response.data))
    })
  }, [])

  const excluir = (id: any) => {
    Alert.alert(
      'Excluir a encomenda',
      `Deseja realmente excluir a encomenda  ?`,
      [
        {
          text: 'Sim',
          onPress: async () => {
            var user_id = await AsyncStorage.getItem('user_id')

            await api.delete(`/orders/${id}`)
            api
              .get(`/orders/${user_id}`)
              .then((response) => setOrders(response.data))

            ToastAndroid.show('Encomenda excluida', ToastAndroid.LONG)
          },
        },
        { text: 'Não' },
      ]
    )
  }

  const arquivar = (id: any) => {
    Alert.alert('Arquivar a encomenda', `Deseja realmente arquivar  ?`, [
      {
        text: 'Sim',
        onPress: async () => {
          var user_id = await AsyncStorage.getItem('user_id')

          await api.put(`/orders/${id}`, { status: false })
          api
            .get(`/orders/${user_id}`)
            .then((response) => setOrders(response.data))

          ToastAndroid.show('Encomenda arquivada', ToastAndroid.LONG)
        },
      },
      { text: 'Não' },
    ])
  }

  return (
    <View>
      <Toolbar title="Encomendas" back={true} />

      <Button
        title={'Criar encomenda'}
        containerStyle={{ width: '50%', alignSelf: 'flex-end', top: 30 }}
        onPress={() => nav.navigate('create-order')}
      />

      <FlatList
        style={styles.list}
        data={orders}
        extraData={orders}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => (
          <ItemOrder orders={item} onExcluir={excluir} onArquivar={arquivar} />
        )}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {},
  list: {
    marginTop: 50,
    marginBottom: 40,
  },
})
