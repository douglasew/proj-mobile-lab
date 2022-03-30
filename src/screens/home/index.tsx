import * as React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Text, Avatar, Icon, SearchBar } from 'react-native-elements'

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  let name = 'Douglas'
  const [search, setSearch] = React.useState('')
  const updateSearch = (search) => {
    setSearch(search)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', top: 20 }}>
          <Avatar
            rounded
            containerStyle={{ alignSelf: 'center', left: 10 }}
            size={70}
            source={{
              uri: 'https://s2.glbimg.com/AiGp7DBm8nXkLk5iAA0YmeBEgf8=/0x0:984x612/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2022/A/3/AHyD7qQlO1TaMsseqLNg/casimiro.jpg',
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
              color={'back'}
              name="notifications"
              onPress={() => console.log('notifications')}
            />
          </View>
        </View>
        <View style={styles.search}>
          <SearchBar
            placeholder="Pesquisar"
            onChangeText={updateSearch}
            value={search}
            lightTheme={true}
            inputStyle={{ width: 250 }}
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
          />
        </View>
        <View></View>
      </View>
      <View style={{ top: 30 }}>
        <View style={styles.options}>
          <View style={styles.button}>
            <Icon
              name="dashboard"
              size={100}
              color={'#23D9BC'}
              onPress={() => console.log('Dashboard')}
            />
            <Text style={{ textAlign: 'center' }}>Dashboard</Text>
          </View>
          <View style={styles.button}>
            <Icon
              name="event"
              size={100}
              color={'#89A4FF'}
              onPress={() => console.log('Tarefas')}
            />
            <Text style={{ textAlign: 'center' }}>Tarefas</Text>
          </View>
        </View>
        <View style={styles.options}>
          <View style={styles.button}>
            <Icon
              name="star-border"
              size={100}
              color={'#FEBF5F'}
              onPress={() => console.log('Avaliação')}
            />
            <Text style={{ textAlign: 'center' }}>Avaliação</Text>
          </View>

          <View style={styles.button}>
            <Icon
              name="query-builder"
              size={100}
              color={'#D4BAF0'}
              onPress={() => console.log('Minutos')}
            />
            <Text style={{ textAlign: 'center' }}>Minutos</Text>
          </View>
        </View>
        <View style={styles.options}>
          <View style={styles.button}>
            <Icon
              name="done"
              size={100}
              color={'#5EE218'}
              onPress={() => console.log('Registros')}
            />
            <Text style={{ textAlign: 'center' }}>Registros</Text>
          </View>
          <View style={styles.button}>
            <Icon
              name="report"
              size={100}
              color={'red'}
              onPress={() => console.log('Reports')}
            />
            <Text style={{ textAlign: 'center' }}>Reports</Text>
          </View>
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
    height: 180,
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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'white',
    width: 130,
    height: 130,
    alignContent: 'center',

    shadowColor: 'gray',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})
