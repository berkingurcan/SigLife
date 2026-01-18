// History Screen - Journey log showing all past events
// Redesigned with modern 2025-2026 UI/UX trends

import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useGame } from '@/components/game/game-provider'
import { Card } from '@/components/ui/card'
import {
  GraduateIcon,
  HistoryIcon,
  MintIcon,
  PlayIcon,
  StatIcons
} from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, TabBar, Typography } from '@/constants/design-system'
import { type HistoryEntry } from '@/constants/game-config'

function HistoryItem({ entry, index }: { entry: HistoryEntry; index: number }) {
  const typeConfig = {
    event: {
      Icon: PlayIcon,
      color: Colors.primary.default,
      bgColor: Colors.primary.muted,
      label: 'Event',
    },
    graduation: {
      Icon: GraduateIcon,
      color: Colors.success.default,
      bgColor: Colors.success.muted,
      label: 'Graduation',
    },
    mint: {
      Icon: MintIcon,
      color: Colors.warning.default,
      bgColor: Colors.warning.muted,
      label: 'NFT Mint',
    },
  }

  const config = typeConfig[entry.type]
  const date = new Date(entry.timestamp)
  const timeString = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const dateString = date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  })

  return (
    <Animated.View entering={SlideInRight.delay(index * 50)}>
      <Card variant="default" padding="md" style={styles.historyItem}>
        {/* Type indicator */}
        <View style={styles.historyHeader}>
          <View style={[styles.typeIndicator, { backgroundColor: config.bgColor }]}>
            <config.Icon size={18} color={config.color} />
          </View>
          <View style={styles.historyMeta}>
            <Animated.Text style={[styles.typeLabel, { color: config.color }]}>
              {config.label}
            </Animated.Text>
            <Animated.Text style={styles.historyTime}>
              {dateString} at {timeString}
            </Animated.Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.historyContent}>
          <Animated.Text style={styles.historyTitle}>{entry.title}</Animated.Text>
          <Animated.Text style={styles.historyDescription}>{entry.description}</Animated.Text>

          {/* Stat changes */}
          {entry.statChanges && Object.keys(entry.statChanges).length > 0 && (
            <View style={styles.statChangesRow}>
              {Object.entries(entry.statChanges).map(([stat, value]) => {
                const statKey = stat as keyof typeof StatIcons
                const IconComponent = StatIcons[statKey]
                const isPositive = value > 0
                const effectColor = isPositive ? Colors.success.default : Colors.danger.default
                const bgColor = isPositive ? Colors.success.muted : Colors.danger.muted

                return (
                  <View key={stat} style={[styles.statChangeBadge, { backgroundColor: bgColor }]}>
                    {IconComponent && <IconComponent size={12} color={effectColor} />}
                    <Animated.Text style={[styles.statChangeText, { color: effectColor }]}>
                      {isPositive ? '+' : ''}{value}
                    </Animated.Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
      </Card>
    </Animated.View>
  )
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets()
  const { gameState } = useGame()

  if (!gameState) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={[Colors.background.secondary, Colors.background.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.loadingContainer}>
          <Animated.Text style={styles.loadingText}>Loading...</Animated.Text>
        </View>
      </View>
    )
  }

  const reversedHistory = [...gameState.history].reverse()
  const journeyDays = Math.floor((Date.now() - gameState.createdAt) / (1000 * 60 * 60 * 24))

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[Colors.background.secondary, Colors.background.primary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <View style={styles.headerIconContainer}>
          <HistoryIcon size={28} color={Colors.primary.default} />
        </View>
        <Animated.Text style={styles.headerTitle}>Your Journey</Animated.Text>
      </Animated.View>

      {/* Summary Card */}
      <Animated.View entering={FadeInDown.delay(200)} style={styles.summaryContainer}>
        <Card variant="glass" padding="md">
          <View style={styles.summaryRow}>
            <View style={styles.summaryStat}>
              <Animated.Text style={styles.summaryValue}>{gameState.history.length}</Animated.Text>
              <Animated.Text style={styles.summaryLabel}>Events</Animated.Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Animated.Text style={styles.summaryValue}>{gameState.totalMinted}</Animated.Text>
              <Animated.Text style={styles.summaryLabel}>NFTs</Animated.Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Animated.Text style={styles.summaryValue}>{journeyDays}d</Animated.Text>
              <Animated.Text style={styles.summaryLabel}>Journey</Animated.Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      {/* History List */}
      {reversedHistory.length > 0 ? (
        <FlatList
          data={reversedHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <HistoryItem entry={item} index={index} />}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: TabBar.height + Spacing.lg },
          ]}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Animated.View entering={FadeIn}>
            <View style={styles.emptyIconContainer}>
              <HistoryIcon size={56} color={Colors.text.tertiary} />
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(100)} style={styles.emptyTitle}>
            No History Yet
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(200)} style={styles.emptyText}>
            Start making decisions to build your journey!
          </Animated.Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.primary.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  summaryContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryStat: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border.subtle,
  },
  summaryValue: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.primary.default,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  separator: {
    height: Spacing.md,
  },
  historyItem: {
    position: 'relative',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  typeIndicator: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  historyMeta: {
    flex: 1,
  },
  typeLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
  },
  historyTime: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  historyContent: {},
  historyTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  historyDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
    marginBottom: Spacing.sm,
  },
  statChangesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  statChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
    gap: Spacing.xs,
  },
  statChangeText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  emptyIconContainer: {
    width: 112,
    height: 112,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  resetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
    paddingTop: Spacing.md,
  },
})
