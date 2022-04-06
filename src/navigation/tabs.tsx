import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import Home from '../screens/home'
import Settings from '../screens/settings'
import Account from '../screens/account'

interface TabsProps {}

const Tab = createBottomTabNavigator()

const Tabs = (props: TabsProps) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="account" component={Account} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default Tabs
