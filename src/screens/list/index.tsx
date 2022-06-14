import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, StyleSheet, ToastAndroid, View } from 'react-native'
import { Text } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { FAB } from 'react-native-paper'
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

      api
        .get(`/orders/user/${user_id}`)
        .then((response) => setOrders(response.data))
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
              .get(`/orders/user/${user_id}`)
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
            .get(`/orders/user/${user_id}`)
            .then((response) => setOrders(response.data))

          ToastAndroid.show('Encomenda arquivada', ToastAndroid.LONG)
        },
      },
      { text: 'Não' },
    ])
  }

  return (
    <>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => nav.navigate('create-order')}
      />
      <View>
        <Toolbar title="Encomendas" back={true} />

        {orders.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '85%',
            }}
          >
            <Text>Lista de encomendas vazia</Text>
          </View>
        ) : (
          <FlatList
            style={styles.list}
            data={orders}
            extraData={orders}
            keyExtractor={(t) => String(t.id)}
            renderItem={({ item }) => (
              <ItemOrder
                orders={item}
                onExcluir={excluir}
                onArquivar={arquivar}
              />
            )}
          />
        )}
      </View>
    </>
  )
}

export default List

const styles = StyleSheet.create({
  container: {},
  list: {
    marginBottom: 150,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E82D1',
  },
})
