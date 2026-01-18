// Game Tab Layout - Stack navigation with GameProvider
import { Stack } from 'expo-router'
import { GameProvider } from '@/components/game/game-provider'
import { GameColors } from '@/constants/game-config'

export default function GameLayout() {
  return (
    <GameProvider>
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
    </GameProvider>
  )
}
