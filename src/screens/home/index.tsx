import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Icon, Text } from 'react-native-elements'
//import UserIcon from '../../assets/images/icon_user.png'
import Toolbar from '../../components/toolbar'
interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  let name = 'Usuario'
  const nav = useNavigation<any>()
  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title="Inicio" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', top: 20 }}>
          <Avatar
            rounded
            containerStyle={{ alignSelf: 'center', left: 10 }}
            size={70}
            source={{
              uri: 'https://icons-for-free.com/download-icon-business+costume+male+man+office+user+icon-1320196264882354682_512.png',
            }}
          />
          <View style={styles.introduction}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
              Olá, {name}
            </Text>
            <Text>O que você fez hoje ?</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              size={35}
              color={'black'}
              name="notifications"
              onPress={() => console.log('notifications')}
            />
          </View>
        </View>
        <View></View>
      </View>
      <View style={{ top: 20 }}>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => nav.navigate('list')}
          >
            <Icon name="filter-list" size={100} color={'#23D9BC'} />
            <Text style={{ textAlign: 'center' }}>Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Tarefas')}
          >
            <Icon name="event" size={100} color={'#89A4FF'} />
            <Text style={{ textAlign: 'center' }}>Calendário</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => nav.navigate('photo')}
          >
            <Icon name="image" size={100} color={'#FEBF5F'} />
            <Text style={{ textAlign: 'center' }}>Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Minutos')}
          >
            <Icon name="query-builder" size={100} color={'#D4BAF0'} />
            <Text style={{ textAlign: 'center' }}>Minutos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Registros')}
          >
            <Icon name="done" size={100} color={'#5EE218'} />
            <Text style={{ textAlign: 'center' }}>Registros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Reports')}
          >
            <Icon name="report" size={100} color={'red'} />
            <Text style={{ textAlign: 'center' }}>Reports</Text>
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
  search: {
    alignSelf: 'center',
    top: 30,
    flexDirection: 'column',
  },
  options: {
    padding: 15,
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
