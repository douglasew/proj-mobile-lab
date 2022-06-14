import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { SwipeRow } from 'react-native-swipe-list-view'
import { Order } from '../../model/orders'

interface OrdersFiledListProps {
  orders: Order
  onExcluir(id: string)
  onActivate(id: string)
}

const OrdersFiledList = (props: OrdersFiledListProps) => {
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
            onPress={() => props.onActivate(props.orders.id)}
          >
            <Icon name="list" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => props.onExcluir(props.orders.id)}
          >
            <Icon name="delete" color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Icon name="computer" color={'black'} size={50} />
          <View style={styles.info}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {props.orders.number}
            </Text>
            <Text>{props.orders.reminder}</Text>
          </View>
        </View>
      </SwipeRow>
    </View>
  )
}

export default OrdersFiledList

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
