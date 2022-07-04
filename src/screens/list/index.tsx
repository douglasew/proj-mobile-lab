import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, Image, StyleSheet, ToastAndroid, View } from 'react-native'
import { Text } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { FAB } from 'react-native-paper'
import empty from '../../assets/images/empty-order.png'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { Order } from '../../model/orders'
import ItemOrder from './itens-order'

interface ListProps {}

const List = (props: ListProps) => {
  const EMPTY = Image.resolveAssetSource(empty).uri
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

  const excluir = (id: any, reminder: string) => {
    Alert.alert(
      'Excluir a encomenda',
      `Deseja realmente excluir a encomenda ${reminder} ?`,
      [
        {
          text: 'Sim',
          onPress: async () => {
            var user_id = await AsyncStorage.getItem('user_id')

            await api.delete(`/orders/${id}`)
            api
              .get(`/orders/user/${user_id}`)
              .then((response) => setOrders(response.data))

            ToastAndroid.show('Encomenda excluida', ToastAndroid.SHORT)
          },
        },
        { text: 'Não' },
      ]
    )
  }

  const arquivar = (id: any, reminder: string) => {
    Alert.alert(
      'Arquivar a encomenda',
      `Deseja realmente arquivar ${reminder} ?`,
      [
        {
          text: 'Sim',
          onPress: async () => {
            var user_id = await AsyncStorage.getItem('user_id')

            await api.put(`/orders/${id}`, { status: false })
            api
              .get(`/orders/user/${user_id}`)
              .then((response) => setOrders(response.data))

            ToastAndroid.show('Encomenda arquivada', ToastAndroid.SHORT)
          },
        },
        { text: 'Não' },
      ]
    )
  }

  return (
    <>
      <Toolbar title="Ativos" back={true} />
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
            <Text style={{ fontWeight: 'bold' }}>Nenhuma encomendas ativa</Text>
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
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => nav.navigate('create-order')}
      />
    </>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    top: 14,
  },
  list: {
    marginBottom: 10,
    top: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E82D1',
  },
})
