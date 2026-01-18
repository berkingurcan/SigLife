import { CustomTabBar } from '@/components/ui/custom-tab-bar'
import { Tabs } from 'expo-router'
import React from 'react'

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
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
      {/* Hidden tabs that still need routes but aren't shown */}
      <Tabs.Screen name="account" options={{ tabBarItemStyle: { display: 'none' }, href: null }} />
      <Tabs.Screen name="demo" options={{ tabBarItemStyle: { display: 'none' }, href: null }} />
    </Tabs>
  )
}
