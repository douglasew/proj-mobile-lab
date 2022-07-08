import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Toolbar from '../../components/toolbar'

interface SettingsScreenProps {}

const SettingsScreen = (props: SettingsScreenProps) => {
  const nav = useNavigation<any>()
  return (
    <>
      <Toolbar title="Configurações" />
      <View style={styles.container}>
        <View style={styles.option}>
          <TouchableOpacity
            style={styles.options}
            onPress={() => console.log('Aparencia')}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon name="visibility" />
              <Text style={{ left: 30 }}>Aparencia</Text>
            </View>
            <Icon name="chevron-right" style={{ right: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            onPress={() => console.log('Privaciade e segurança')}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon name="lock" />
              <Text style={{ left: 30 }}>Privaciade e segurança</Text>
            </View>
            <Icon name="chevron-right" style={{ right: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.options}
            onPress={() => nav.navigate('about')}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon name="help" />
              <Text style={{ left: 30 }}>Sobre</Text>
            </View>
            <Icon name="chevron-right" style={{ right: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    top: 14,
  },
  option: {
    marginTop: 50,
  },
  options: {
    height: 100,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
