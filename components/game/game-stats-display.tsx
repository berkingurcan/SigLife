// Game Stats Display - Shows all player stats
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/components/app-text'
import { GameProgressBar } from './game-progress-bar'
import { GameColors, STAT_CONFIGS, type Stats } from '@/constants/game-config'

interface GameStatsDisplayProps {
  stats: Stats
  compact?: boolean
}

export function GameStatsDisplay({ stats, compact = false }: GameStatsDisplayProps) {
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        {STAT_CONFIGS.map((config) => (
          <View key={config.id} style={styles.compactStat}>
            <AppText style={styles.compactEmoji}>{config.emoji}</AppText>
            <AppText style={[styles.compactValue, { color: config.color }]}>{stats[config.id]}</AppText>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {STAT_CONFIGS.map((config) => (
        <View key={config.id} style={styles.statRow}>
          <View style={styles.statHeader}>
            <AppText style={styles.emoji}>{config.emoji}</AppText>
            <AppText style={styles.statName}>{config.name}</AppText>
          </View>
          <GameProgressBar value={stats[config.id]} color={config.color} showValue={true} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GameColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  statRow: {
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  statName: {
    fontSize: 14,
    fontWeight: '600',
    color: GameColors.textPrimary,
  },
  compactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: GameColors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  compactStat: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    marginBottom: 8,
  },
  compactEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  compactValue: {
    fontSize: 14,
    fontWeight: '700',
  },
})
