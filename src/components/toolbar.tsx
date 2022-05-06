import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

interface ToolbarProps {
  title: string
}

const Toolbar = (props: ToolbarProps) => {
  return (
    <Header
      centerComponent={{ text: props.title, style: { color: 'white' } }}
      rightComponent={{ text: 'SAIR', style: { color: 'white' } }}
    />
  )
}

export default Toolbar
