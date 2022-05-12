import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Toolbar from '../../components/toolbar'

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  return (
    <View style={styles.container}>
      <Toolbar title="Configurações" />
      <View style={styles.option}>
        <TouchableOpacity
          style={styles.options}
          onPress={() => console.log('Aparencia')}
        >
          <Icon name="visibility" />
          <Text>Aparencia</Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          onPress={() => console.log('Notificações')}
        >
          <Icon name="notifications" />
          <Text>Notificações</Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          onPress={() => console.log('Privaciade e segurança')}
        >
          <Icon name="lock" />
          <Text>Privaciade e segurança</Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          onPress={() => console.log('Sobre')}
        >
          <Icon name="help" />
          <Text>Sobre</Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {},
  option: {
    marginTop: 200,
  },
  options: {
    height: 100,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
