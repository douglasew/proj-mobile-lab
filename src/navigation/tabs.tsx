import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import Account from '../screens/account'
import Home from '../screens/home'
import Settings from '../screens/settings'

interface TabsProps {}

const Tab = createBottomTabNavigator()

const Tabs = (props: TabsProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons name="home" size={40} color={props.color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons name="person" size={40} color={props.color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons name="settings" size={40} color={props.color} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
