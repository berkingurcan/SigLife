// Game Stage Badge - Current stage display component
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/app-text'
import { GameColors, STAGES, type StageId } from '@/constants/game-config'

interface GameStageBadgeProps {
  stageId: StageId
  size?: 'small' | 'medium' | 'large'
  showProgress?: boolean
}

export function GameStageBadge({ stageId, size = 'medium', showProgress = true }: GameStageBadgeProps) {
  const stage = STAGES.find((s) => s.id === stageId)
  if (!stage) return null

  const stageNumber = stage.index + 1
  const totalStages = STAGES.length

  const sizeStyles = {
    small: {
      container: styles.containerSmall,
      emoji: styles.emojiSmall,
      name: styles.nameSmall,
      progress: styles.progressSmall,
    },
    medium: {
      container: styles.containerMedium,
      emoji: styles.emojiMedium,
      name: styles.nameMedium,
      progress: styles.progressMedium,
    },
    large: {
      container: styles.containerLarge,
      emoji: styles.emojiLarge,
      name: styles.nameLarge,
      progress: styles.progressLarge,
    },
  }

  const currentSizeStyles = sizeStyles[size]

  return (
    <View style={[styles.container, currentSizeStyles.container]}>
      <AppText style={currentSizeStyles.emoji}>{stage.emoji}</AppText>
      <AppText style={currentSizeStyles.name}>{stage.name}</AppText>
      {showProgress && (
        <AppText style={currentSizeStyles.progress}>
          Stage {stageNumber}/{totalStages}
        </AppText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GameColors.surface,
    borderWidth: 1,
    borderColor: GameColors.primary,
    borderRadius: 16,
  },
  containerSmall: {
    padding: 8,
  },
  containerMedium: {
    padding: 16,
  },
  containerLarge: {
    padding: 24,
  },
  emojiSmall: {
    fontSize: 24,
  },
  emojiMedium: {
    fontSize: 40,
  },
  emojiLarge: {
    fontSize: 64,
  },
  nameSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: GameColors.textPrimary,
    marginTop: 4,
  },
  nameMedium: {
    fontSize: 18,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginTop: 8,
  },
  nameLarge: {
    fontSize: 24,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginTop: 12,
  },
  progressSmall: {
    fontSize: 10,
    color: GameColors.textSecondary,
    marginTop: 2,
  },
  progressMedium: {
    fontSize: 12,
    color: GameColors.textSecondary,
    marginTop: 4,
  },
  progressLarge: {
    fontSize: 14,
    color: GameColors.textSecondary,
    marginTop: 6,
  },
})
