import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Toolbar from '../../components/toolbar'

interface AccountProps {}

const Account = (props: AccountProps) => {
  return (
    <View style={styles.container}>
      <Toolbar title="Conta" />
      <Text>Account</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {},
})
