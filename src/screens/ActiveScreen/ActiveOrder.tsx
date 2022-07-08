import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { SwipeRow } from 'react-native-swipe-list-view'
import icon from '../../assets/images/order-icon2.png'
import { Order } from '../../model/orders'

interface ActiveOrderProps {
  orders: Order
  onExcluir(id: string, reminder: string)
  onArquivar(id: string, reminder: string)
}

const ActiveOrder = (props: ActiveOrderProps) => {
  const ORDER_ICON = Image.resolveAssetSource(icon).uri
  return (
    <View>
      <SwipeRow
        leftOpenValue={60}
        stopLeftSwipe={60}
        rightOpenValue={-60}
        stopRightSwipe={-60}
      >
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.edit}
            onPress={() =>
              props.onArquivar(props.orders.id, props.orders.reminder)
            }
          >
            <Icon name="inventory" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() =>
              props.onExcluir(props.orders.id, props.orders.reminder)
            }
          >
            <Icon name="delete" color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Image
            source={{
              uri: ORDER_ICON,
            }}
            style={{ width: 50, height: 50 }}
          />
          <View style={styles.info}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {props.orders.reminder}
            </Text>
            <Text>{props.orders.number}</Text>
          </View>
        </View>
      </SwipeRow>
    </View>
  )
}

export default ActiveOrder

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  info: {
    flexDirection: 'column',
    left: 15,
    backgroundColor: 'white',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  delete: {
    backgroundColor: 'red',
    width: 60,
    borderRadius: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },

  edit: {
    backgroundColor: 'green',
    width: 60,
    borderRadius: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },
})
