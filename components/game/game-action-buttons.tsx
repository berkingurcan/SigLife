// Game Action Buttons - Modern animated action buttons
// Redesigned with 2025-2026 UI trends

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { Colors, Spacing } from '@/constants/design-system'
import { PlayIcon, GraduateIcon, HistoryIcon } from '@/components/ui/icons'

interface GameActionButtonsProps {
  onLiveLife: () => void
  onViewHistory: () => void
  canGraduate: boolean
  onGraduate: () => void
}

export function GameActionButtons({
  onLiveLife,
  onViewHistory,
  canGraduate,
  onGraduate,
}: GameActionButtonsProps) {
  return (
    <View style={styles.container}>
      {/* Primary action - Live Life */}
      <Animated.View entering={FadeInUp.delay(0)}>
        <Button
          title="Live Life"
          onPress={onLiveLife}
          variant="primary"
          size="xl"
          icon={<PlayIcon size={22} color={Colors.text.primary} />}
        />
      </Animated.View>

      {/* Graduation button - conditional */}
      {canGraduate && (
        <Animated.View entering={FadeInUp.delay(100)}>
          <Button
            title="Graduate to Next Stage"
            onPress={onGraduate}
            variant="success"
            size="lg"
            icon={<GraduateIcon size={22} color={Colors.text.primary} />}
          />
        </Animated.View>
      )}

      {/* Secondary action - View History */}
      <Animated.View entering={FadeInUp.delay(200)}>
        <Button
          title="View Journey"
          onPress={onViewHistory}
          variant="secondary"
          size="lg"
          icon={<HistoryIcon size={20} color={Colors.text.primary} />}
        />
      </Animated.View>
    </View>
  )
}

// Export GameButton for backward compatibility
export { Button as GameButton }

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
})
