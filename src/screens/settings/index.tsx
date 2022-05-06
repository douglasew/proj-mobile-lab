import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Toolbar from '../../components/toolbar'

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  return (
    <View style={styles.container}>
      <Toolbar title="Configurações" />
      <Text>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {},
})
