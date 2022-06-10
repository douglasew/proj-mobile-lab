import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Header, Icon, Text } from 'react-native-elements'

interface ToolbarProps {
  title: string
  back?: boolean
}

const Toolbar = (props: ToolbarProps) => {
  const nav = useNavigation<any>()

  let leftComponent = <View />
  let rightComponent = <View />

  if (props.back)
    leftComponent = (
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Icon name="arrow-back" color="white" size={20} />
      </TouchableOpacity>
    )

  rightComponent = (
    <TouchableOpacity
      onPress={() => {
        AsyncStorage.removeItem('jwt')
        nav.navigate('login')
      }}
    >
      <Text style={{ color: 'white' }}>Sair</Text>
    </TouchableOpacity>
  )

  return (
    <Header
      leftComponent={leftComponent}
      centerComponent={{ text: props.title, style: { color: 'white' } }}
      rightComponent={rightComponent}
    />
  )
}

export default Toolbar
