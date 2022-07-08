import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import AccountScreen from '../screens/AccountScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

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
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons name="home" size={40} color={props.color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons name="person" size={40} color={props.color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
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
