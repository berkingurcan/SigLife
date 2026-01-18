// Game Tab Layout - Stack navigation
import { GameColors } from '@/constants/game-config'
import { Stack } from 'expo-router'

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Sigma Man',
        headerStyle: {
          backgroundColor: GameColors.background,
        },
        headerTintColor: GameColors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: GameColors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="event"
        options={{
          presentation: 'modal',
          headerTitle: 'Life Event',
        }}
      />
      <Stack.Screen
        name="graduation"
        options={{
          presentation: 'modal',
          headerTitle: 'Graduation',
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          headerTitle: 'Your Journey',
        }}
      />
    </Stack>
  )
}
