// Game Progress Bar - Visual stat bar component
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/app-text'
import { GameColors } from '@/constants/game-config'

interface GameProgressBarProps {
  value: number
  maxValue?: number
  color: string
  label?: string
  showValue?: boolean
  height?: number
}

export function GameProgressBar({
  value,
  maxValue = 100,
  color,
  label,
  showValue = true,
  height = 12,
}: GameProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100))

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelRow}>
          <AppText style={styles.label}>{label}</AppText>
          {showValue && (
            <AppText style={[styles.value, { color }]}>
              {value}/{maxValue}
            </AppText>
          )}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: GameColors.textSecondary,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
  },
  track: {
    width: '100%',
    backgroundColor: GameColors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 6,
  },
})
