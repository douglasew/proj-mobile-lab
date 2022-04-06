import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface AccountProps {}

const Account = (props: AccountProps) => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {},
})
