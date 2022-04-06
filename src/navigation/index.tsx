import * as React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from '../screens/login'
import Register from '../screens/register'
import Tabs from '../navigation/tabs'

interface MainNavigatorProps {}

const Stack = createNativeStackNavigator()

const MainNavigator = (props: MainNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="app" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
