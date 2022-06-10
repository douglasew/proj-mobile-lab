import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import Tabs from '../navigation/tabs'
import About from '../screens/about'
import CreateOrder from '../screens/create-order'
import Filed from '../screens/filed'
import List from '../screens/list'
import Login from '../screens/login'
import Register from '../screens/register'

interface MainNavigatorProps {}

const Stack = createNativeStackNavigator()

const MainNavigator = (props: MainNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="about" component={About} />
        <Stack.Screen name="filed" component={Filed} />
        <Stack.Screen name="create-order" component={CreateOrder} />
        <Stack.Screen name="app" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
