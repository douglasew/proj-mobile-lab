import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Alert, FlatList, StyleSheet, ToastAndroid, View } from 'react-native'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { Order } from '../../model/orders'
import OrdersFiledList from './itens-orders'

interface FiledProps {}

const Filed = (props: FiledProps) => {
  const nav = useNavigation<any>()
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    nav.addListener('focus', async () => {
      var user_id = await AsyncStorage.getItem('user_id')

      api
        .get(`/orders-filed/${user_id}`)
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
            .get(`/orders-filed/${user_id}`)
            .then((response) => setOrders(response.data))
          ToastAndroid.show('Encomenda excluida', ToastAndroid.LONG)
        },
      },
      { text: 'Não' },
    ])
  }

  const arquivar = (id: any) => {
    Alert.alert('Ativar encomenda', `Deseja realmente ativar a encomenda ?`, [
      {
        text: 'Sim',
        onPress: async () => {
          var user_id = await AsyncStorage.getItem('user_id')

          await api.put(`/orders/${id}`, { status: true })
          api
            .get(`/orders-filed/${user_id}`)
            .then((response) => setOrders(response.data))

          ToastAndroid.show('Encomenda ativada', ToastAndroid.LONG)
        },
      },
      { text: 'Não' },
    ])
  }

  return (
    <View style={styles.container}>
      <Toolbar title="Arquivados" back={true} />

      <FlatList
        style={styles.list}
        data={orders}
        extraData={orders}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => (
          <OrdersFiledList
            orders={item}
            onExcluir={excluir}
            onArquivar={arquivar}
          />
        )}
      />
    </View>
  )
}

export default Filed

const styles = StyleSheet.create({
  container: {},
  list: {
    marginTop: 100,
    marginBottom: 40,
  },
})
