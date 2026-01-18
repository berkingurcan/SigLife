// Game Stats Display - Modern stat visualization
// Redesigned with 2025-2026 UI trends

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'

import { GameProgressBar } from './game-progress-bar'
import { STAT_CONFIGS, type Stats } from '@/constants/game-config'
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/design-system'
import { StatIcons } from '@/components/ui/icons'
import { Card } from '@/components/ui/card'

interface GameStatsDisplayProps {
  stats: Stats
  compact?: boolean
}

export function GameStatsDisplay({ stats, compact = false }: GameStatsDisplayProps) {
  if (compact) {
    return (
      <Card variant="default" padding="md">
        <View style={styles.compactContainer}>
          {STAT_CONFIGS.map((config, index) => {
            const IconComponent = StatIcons[config.id]
            return (
              <Animated.View
                key={config.id}
                entering={FadeInRight.delay(index * 50)}
                style={styles.compactStat}
              >
                <View style={[styles.compactIconContainer, { backgroundColor: `${config.color}20` }]}>
                  <IconComponent size={16} color={config.color} />
                </View>
                <Animated.Text style={[styles.compactValue, { color: config.color }]}>
                  {stats[config.id]}
                </Animated.Text>
              </Animated.View>
            )
          })}
        </View>
      </Card>
    )
  }

  return (
    <Card variant="default" padding="md">
      <View style={styles.container}>
        {STAT_CONFIGS.map((config, index) => {
          const IconComponent = StatIcons[config.id]
          return (
            <Animated.View
              key={config.id}
              entering={FadeInRight.delay(index * 80)}
              style={[styles.statRow, index < STAT_CONFIGS.length - 1 && styles.statRowBorder]}
            >
              <View style={styles.statHeader}>
                <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
                  <IconComponent size={20} color={config.color} />
                </View>
                <View style={styles.statInfo}>
                  <Animated.Text style={styles.statName}>{config.name}</Animated.Text>
                  <Animated.Text style={[styles.statValue, { color: config.color }]}>
                    {stats[config.id]}%
                  </Animated.Text>
                </View>
              </View>
              <GameProgressBar value={stats[config.id]} color={config.color} />
            </Animated.View>
          )
        })}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  statRow: {
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  statRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  statInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statName: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  statValue: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Bold',
  },
  compactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  compactStat: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    gap: Spacing.xs,
  },
  compactIconContainer: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactValue: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Bold',
  },
})
