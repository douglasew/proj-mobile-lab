import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Alert, Image, StyleSheet, ToastAndroid, View } from 'react-native'
import { Text } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { FAB } from 'react-native-paper'
import empty from '../../assets/images/empty-order.png'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { Order } from '../../model/orders'
import OrdersFiledList from './itens-orders'

interface FiledProps {}

const Filed = (props: FiledProps) => {
  const EMPTY = Image.resolveAssetSource(empty).uri
  const nav = useNavigation<any>()
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    nav.addListener('focus', async () => {
      var user_id = await AsyncStorage.getItem('user_id')

      api
        .get(`/orders/filed/${user_id}`)
        .then((response) => setOrders(response.data))
    })
  }, [])

  const excluir = (id: any) => {
    Alert.alert('Excluir a encomenda', `Deseja realmente excluir  ?`, [
      {
        text: 'Sim',
        onPress: async () => {
          var user_id = await AsyncStorage.getItem('user_id')
          await api.delete(`/orders/${id}`)

          api
            .get(`/orders/filed/${user_id}`)
            .then((response) => setOrders(response.data))
          ToastAndroid.show('Encomenda excluida', ToastAndroid.SHORT)
        },
      },
      { text: 'Não' },
    ])
  }

  const activate = (id: any) => {
    Alert.alert('Ativar encomenda', `Deseja realmente ativar a encomenda ?`, [
      {
        text: 'Sim',
        onPress: async () => {
          var user_id = await AsyncStorage.getItem('user_id')

          await api.put(`/orders/${id}`, { status: true })
          api
            .get(`/orders/filed/${user_id}`)
            .then((response) => setOrders(response.data))

          ToastAndroid.show('Encomenda ativada', ToastAndroid.SHORT)
        },
      },
      { text: 'Não' },
    ])
  }

  const deleteAll = () => {
    Alert.alert(
      'Deletar encomendas',
      `Deseja realmente deletar todas as encomendas arquivadas ?`,
      [
        {
          text: 'Sim',
          onPress: async () => {
            var user_id = await AsyncStorage.getItem('user_id')

            await api.delete('/orders')
            api
              .get(`/orders/filed/${user_id}`)
              .then((response) => setOrders(response.data))

            ToastAndroid.show(
              'Todas as encomendas foram deletadas',
              ToastAndroid.LONG
            )
          },
        },
        { text: 'Não' },
      ]
    )
  }

  return (
    <>
      <Toolbar title="Arquivados" back={true} />
      <View style={styles.container}>
        {orders.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '75%',
            }}
          >
            <Image
              source={{
                uri: EMPTY,
              }}
              style={{ width: 300, height: 300 }}
            />
            <Text style={{ fontWeight: 'bold' }}>
              Nenhuma encomenda arquivada
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.list}
            data={orders}
            extraData={orders}
            keyExtractor={(t) => String(t.id)}
            renderItem={({ item }) => (
              <OrdersFiledList
                orders={item}
                onExcluir={excluir}
                onActivate={activate}
              />
            )}
          />
        )}
      </View>
      <FAB
        style={styles.fab}
        icon="delete"
        onPress={() => deleteAll()}
        disabled={orders.length < 2}
      />
    </>
  )
}

export default Filed

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    top: 14,
  },
  list: {
    top: 10,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
})
