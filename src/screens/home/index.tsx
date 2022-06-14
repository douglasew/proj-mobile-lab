import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Icon, Text } from 'react-native-elements'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { User } from '../../model/users'

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const [user, setuser] = React.useState<User[]>([])
  const nav = useNavigation<any>()

  React.useEffect(() => {
    nav.addListener('focus', async () => {
      var token = await AsyncStorage.getItem('jwt')
      var decoded = jwt_decode(token)
      var user_id = decoded['id']
      AsyncStorage.setItem('user_id', user_id)

      api.get(`/users/${user_id}`).then((response) => setuser(response.data))
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Inicio" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', top: 20 }}>
          <Avatar
            rounded
            containerStyle={{ alignSelf: 'center', left: 10 }}
            size={90}
            source={{
              uri:
                user['photo'] == null
                  ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  : `data:image/jpeg;base64,${user['photo']}`,
            }}
          />
          <View style={styles.introduction}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Olá, {user['name']}
            </Text>
            <Text>O que você fez hoje ?</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              size={35}
              color={'black'}
              name="notifications"
              onPress={() => console.log('notificações')}
            />
          </View>
        </View>
        <View></View>
      </View>
      <View style={{ top: 50 }}>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => nav.navigate('list')}
          >
            <Icon name="filter-list" size={100} color={'#23D9BC'} />
            <Text style={{ textAlign: 'center' }}>Encomendas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => nav.navigate('filed')}
          >
            <Icon name="inventory" size={100} color={'#89A4FF'} />
            <Text style={{ textAlign: 'center' }}>Arquivados</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Reports')}
          >
            <Icon name="report" size={100} color={'red'} />
            <Text style={{ textAlign: 'center' }}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => nav.navigate('create-order')}
          >
            <Icon name="add" size={100} color={'#D4BAF0'} />
            <Text style={{ textAlign: 'center' }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE8FC',
  },
  header: {
    backgroundColor: 'white',
    height: 150,
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 15,
  },
  introduction: {
    paddingLeft: 25,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
    alignSelf: 'center',
  },

  options: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'white',
    width: 130,
    height: 130,
    alignContent: 'center',
    borderRadius: 15,

    shadowColor: 'gray',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})
