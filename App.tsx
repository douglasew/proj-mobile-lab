import * as React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './src/navigation'

import {} from 'react-native-gesture-handler'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  )
}
