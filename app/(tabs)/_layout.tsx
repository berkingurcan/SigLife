import { Tabs } from 'expo-router'
import React from 'react'
import { CustomTabBar } from '@/components/ui/custom-tab-bar'
import { Colors } from '@/constants/design-system'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide default tab bar
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* The index redirects to the game screen */}
      <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: 'none' } }} />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Game',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Wallet',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
      <Tabs.Screen
        name="demo"
        options={{
          title: 'Demo',
        }}
      />
    </Tabs>
  )
}
