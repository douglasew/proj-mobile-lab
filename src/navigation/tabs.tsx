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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <MaterialIcons name="home" size={40} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarIcon: () => <MaterialIcons name="person" size={40} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarIcon: () => <MaterialIcons name="settings" size={40} />,
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
