import * as React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { SwipeRow } from 'react-native-swipe-list-view'
import { User } from '../../model/users'

interface ItemUserProps {
  users: User
}

const ItemUser = (props: ItemUserProps) => {
  const excluir = (id: any) => {
    Alert.alert(
      'Excluir o usuario',
      `Deseja realmente excluir ${props.users.name} ?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            console.log('Usuario excluido')
          },
        },
        { text: 'Não' },
      ]
    )
  }

  const editar = () => {
    console.log('Editar')
  }

  return (
    <View>
      <SwipeRow
        leftOpenValue={60}
        stopLeftSwipe={60}
        rightOpenValue={-60}
        stopRightSwipe={-60}
      >
        <View style={styles.options}>
          <TouchableOpacity style={styles.edit} onPress={editar}>
            <Icon name="edit" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete} onPress={excluir}>
            <Icon name="delete" color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text>{props.users.name}</Text>
          <Text>{props.users.status}</Text>
        </View>
      </SwipeRow>
    </View>
  )
}

export default ItemUser

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
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
