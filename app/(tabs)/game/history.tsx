// History Screen - Journey log showing all past events
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { GameButton } from '@/components/game/game-action-buttons'
import { useGame } from '@/components/game/game-provider'
import { GameColors, type HistoryEntry } from '@/constants/game-config'

function HistoryItem({ entry }: { entry: HistoryEntry }) {
  const typeConfig = {
    event: {
      emoji: '🎲',
      color: GameColors.primary,
    },
    graduation: {
      emoji: '🎓',
      color: GameColors.success,
    },
    mint: {
      emoji: '💎',
      color: GameColors.warning,
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
    <View style={styles.historyItem}>
      <View style={[styles.typeIndicator, { backgroundColor: config.color }]}>
        <AppText style={styles.typeEmoji}>{config.emoji}</AppText>
      </View>
      <View style={styles.historyContent}>
        <AppText style={styles.historyTitle}>{entry.title}</AppText>
        <AppText style={styles.historyDescription}>{entry.description}</AppText>
        {entry.statChanges && Object.keys(entry.statChanges).length > 0 && (
          <View style={styles.statChangesRow}>
            {Object.entries(entry.statChanges).map(([stat, value]) => (
              <View
                key={stat}
                style={[
                  styles.statChangeBadge,
                  {
                    backgroundColor: value > 0 ? GameColors.success + '30' : GameColors.danger + '30',
                  },
                ]}
              >
                <AppText style={[styles.statChangeText, { color: value > 0 ? GameColors.success : GameColors.danger }]}>
                  {stat}: {value > 0 ? '+' : ''}
                  {value}
                </AppText>
              </View>
            ))}
          </View>
        )}
        <AppText style={styles.historyTime}>
          {dateString} at {timeString}
        </AppText>
      </View>
    </View>
  )
}

export default function HistoryScreen() {
  const router = useRouter()
  const { gameState, resetGame } = useGame()

  if (!gameState) {
    return (
      <View style={styles.container}>
        <AppText style={styles.loadingText}>Loading...</AppText>
      </View>
    )
  }

  const reversedHistory = [...gameState.history].reverse()

  const handleResetGame = () => {
    resetGame()
    router.back()
  }

  return (
    <View style={styles.container}>
      {/* Stats Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryStat}>
            <AppText style={styles.summaryValue}>{gameState.history.length}</AppText>
            <AppText style={styles.summaryLabel}>Total Events</AppText>
          </View>
          <View style={styles.summaryStat}>
            <AppText style={styles.summaryValue}>{gameState.totalMinted}</AppText>
            <AppText style={styles.summaryLabel}>NFTs Minted</AppText>
          </View>
          <View style={styles.summaryStat}>
            <AppText style={styles.summaryValue}>
              {Math.floor((Date.now() - gameState.createdAt) / (1000 * 60 * 60 * 24))}d
            </AppText>
            <AppText style={styles.summaryLabel}>Journey Time</AppText>
          </View>
        </View>
      </View>

      {/* History List */}
      {reversedHistory.length > 0 ? (
        <FlatList
          data={reversedHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryItem entry={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AppText style={styles.emptyEmoji}>📜</AppText>
          <AppText style={styles.emptyTitle}>No History Yet</AppText>
          <AppText style={styles.emptyText}>Start making decisions to build your journey!</AppText>
        </View>
      )}

      {/* Reset Button */}
      <View style={styles.resetContainer}>
        <GameButton title="Start New Game" icon="🔄" onPress={handleResetGame} variant="danger" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GameColors.background,
  },
  loadingText: {
    color: GameColors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
  summaryCard: {
    backgroundColor: GameColors.surface,
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: GameColors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: GameColors.textSecondary,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: GameColors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  typeIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  typeEmoji: {
    fontSize: 20,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: GameColors.textPrimary,
    marginBottom: 4,
  },
  historyDescription: {
    fontSize: 13,
    color: GameColors.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  statChangesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  statChangeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statChangeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  historyTime: {
    fontSize: 11,
    color: GameColors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: GameColors.textSecondary,
    textAlign: 'center',
  },
  resetContainer: {
    padding: 16,
    paddingBottom: 32,
  },
})
