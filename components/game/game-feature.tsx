// Game Feature - Main game dashboard component
import React from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { GameStageBadge } from './game-stage-badge'
import { GameStatsDisplay } from './game-stats-display'
import { GameActionButtons } from './game-action-buttons'
import { useGame } from './game-provider'
import { GameColors, getStageById } from '@/constants/game-config'

export function GameFeature() {
  const router = useRouter()
  const { gameState, isLoading, canGraduate, triggerRandomEvent } = useGame()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={GameColors.primary} />
        <AppText style={styles.loadingText}>Loading your journey...</AppText>
      </View>
    )
  }

  if (!gameState) {
    return (
      <View style={styles.errorContainer}>
        <AppText style={styles.errorText}>Failed to load game state</AppText>
      </View>
    )
  }

  const currentStage = getStageById(gameState.currentStage)

  const handleLiveLife = () => {
    triggerRandomEvent()
    router.push('/game/event')
  }

  const handleViewHistory = () => {
    router.push('/game/history')
  }

  const handleGraduate = () => {
    router.push('/game/graduation')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.title}>Sigma Man</AppText>
        <AppText style={styles.subtitle}>The Grindset Simulator</AppText>
      </View>

      {/* Current Stage */}
      <View style={styles.section}>
        <GameStageBadge stageId={gameState.currentStage} size="large" />
        <AppText style={styles.stageDescription}>{currentStage.description}</AppText>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>Your Stats</AppText>
        <GameStatsDisplay stats={gameState.stats} />
      </View>

      {/* Graduation Alert */}
      {canGraduate && (
        <View style={styles.graduationAlert}>
          <AppText style={styles.graduationEmoji}>🎉</AppText>
          <AppText style={styles.graduationText}>
            Ready to graduate! You've met the requirements for the next stage.
          </AppText>
        </View>
      )}

      {/* Actions */}
      <View style={styles.section}>
        <GameActionButtons
          onLiveLife={handleLiveLife}
          onViewHistory={handleViewHistory}
          canGraduate={canGraduate}
          onGraduate={handleGraduate}
        />
      </View>

      {/* Footer Stats */}
      <View style={styles.footerStats}>
        <View style={styles.footerStat}>
          <AppText style={styles.footerStatValue}>{gameState.history.length}</AppText>
          <AppText style={styles.footerStatLabel}>Decisions</AppText>
        </View>
        <View style={styles.footerStat}>
          <AppText style={styles.footerStatValue}>{gameState.totalMinted}</AppText>
          <AppText style={styles.footerStatLabel}>NFTs Minted</AppText>
        </View>
        <View style={styles.footerStat}>
          <AppText style={styles.footerStatValue}>{gameState.mintedStages.length}/8</AppText>
          <AppText style={styles.footerStatLabel}>Stages Complete</AppText>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GameColors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GameColors.background,
  },
  loadingText: {
    marginTop: 16,
    color: GameColors.textSecondary,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GameColors.background,
  },
  errorText: {
    color: GameColors.danger,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: GameColors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: GameColors.textAccent,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginBottom: 12,
  },
  stageDescription: {
    textAlign: 'center',
    color: GameColors.textSecondary,
    fontSize: 14,
    marginTop: 12,
  },
  graduationAlert: {
    backgroundColor: GameColors.success + '20',
    borderWidth: 1,
    borderColor: GameColors.success,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  graduationEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  graduationText: {
    flex: 1,
    color: GameColors.success,
    fontSize: 14,
    fontWeight: '600',
  },
  footerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: GameColors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  footerStat: {
    alignItems: 'center',
  },
  footerStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: GameColors.primary,
  },
  footerStatLabel: {
    fontSize: 12,
    color: GameColors.textSecondary,
    marginTop: 4,
  },
})
