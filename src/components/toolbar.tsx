import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Header, Icon } from 'react-native-elements'

interface ToolbarProps {
  title: string
  back?: boolean
}

const Toolbar = (props: ToolbarProps) => {
  let leftComponent = <View />
  const nav = useNavigation()

  if (props.back)
    leftComponent = (
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Icon name="arrow-back" color="white" size={20} />
      </TouchableOpacity>
    )

  return (
    <Header
      leftComponent={leftComponent}
      centerComponent={{ text: props.title, style: { color: 'white' } }}
      rightComponent={{ text: 'SAIR', style: { color: 'white' } }}
    />
  )
}

export default Toolbar
