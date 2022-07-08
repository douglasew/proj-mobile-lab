import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import Tabs from '../navigation/tabs'
import AboutScreen from '../screens/AboutScreen'
import ActiveScreen from '../screens/ActiveScreen'
import CreateOrderScreen from '../screens/CreateOrderScreen'
import FiledScreen from '../screens/FiledScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

interface MainNavigatorProps {}

const Stack = createNativeStackNavigator()

const MainNavigator = (props: MainNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="list" component={ActiveScreen} />
        <Stack.Screen name="about" component={AboutScreen} />
        <Stack.Screen name="filed" component={FiledScreen} />
        <Stack.Screen name="create-order" component={CreateOrderScreen} />
        <Stack.Screen name="app" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
