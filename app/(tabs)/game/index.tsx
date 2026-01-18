// Game Index - Main game dashboard screen
import { SafeAreaView } from 'react-native-safe-area-context'
import { GameFeature } from '@/components/game/game-feature'
import { GameColors } from '@/constants/game-config'

export default function GameScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: GameColors.background }}>
      <GameFeature />
    </SafeAreaView>
  )
}
