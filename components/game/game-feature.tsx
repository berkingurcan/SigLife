// Game Feature - Main game dashboard component
// Redesigned with modern 2025-2026 UI/UX trends

import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Platform, ScrollView, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Card } from '@/components/ui/card'
import { CheckIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, TabBar, Typography } from '@/constants/design-system'
import { getStageById } from '@/constants/game-config'
import { toUpperCase } from '@/utils/text'
import { GameActionButtons } from './game-action-buttons'
import { useGame } from './game-provider'
import { GameStageBadge } from './game-stage-badge'
import { GameStatsDisplay } from './game-stats-display'

export function GameFeature() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { gameState, isLoading, canGraduate, triggerRandomEvent } = useGame()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary.default} />
        <Animated.Text entering={FadeInUp.delay(200)} style={styles.loadingText}>
          Loading your journey...
        </Animated.Text>
      </View>
    )
  }

  if (!gameState) {
    return (
      <View style={styles.errorContainer}>
        <Animated.Text entering={FadeInUp} style={styles.errorText}>
          Failed to load game state
        </Animated.Text>
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background gradient */}
      <LinearGradient
        colors={[Colors.background.secondary, Colors.background.primary]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: TabBar.height + Spacing['2xl'] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <Animated.Text entering={FadeInDown.delay(200)} style={styles.title}>
              SIGLIFE
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(300)} style={styles.subtitle}>
              The Sigma Man Simulator
            </Animated.Text>
          </View>
        </Animated.View>

        {/* Current Stage Card */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.stageSection}>
          <GameStageBadge stageId={gameState.currentStage} size="compact" />
          <Animated.Text entering={FadeInDown.delay(350)} style={styles.stageDescription}>
            {currentStage.description}
          </Animated.Text>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Animated.Text entering={FadeInDown.delay(400)} style={styles.sectionTitle}>
              Your Stats
            </Animated.Text>
          </View>
          <GameStatsDisplay stats={gameState.stats} />
        </Animated.View>

        {/* Graduation Alert */}
        {canGraduate && (
          <Animated.View entering={FadeInDown.delay(400)}>
            <Card variant="success" padding="md" style={styles.graduationAlert}>
              <View style={styles.alertContent}>
                <View style={styles.alertIconContainer}>
                  <CheckIcon size={24} color={Colors.success.default} />
                </View>
                <View style={styles.alertTextContainer}>
                  <Animated.Text style={styles.graduationTitle}>Ready to Advance</Animated.Text>
                  <Animated.Text style={styles.graduationText}>
                    You've met the requirements for the next stage.
                  </Animated.Text>
                </View>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
          <GameActionButtons
            onLiveLife={handleLiveLife}
            onViewHistory={handleViewHistory}
            canGraduate={canGraduate}
            onGraduate={handleGraduate}
          />
        </Animated.View>

        {/* Footer Stats */}
        <Animated.View entering={FadeInDown.delay(600)}>
          <Card variant="glass" padding="md">
            <View style={styles.footerStats}>
              <View style={styles.footerStat}>
                <Animated.Text style={styles.footerStatValue}>{gameState.history.length}</Animated.Text>
                <Animated.Text style={styles.footerStatLabel}>{toUpperCase('Decisions')}</Animated.Text>
              </View>
              <View style={styles.footerStatDivider} />
              <View style={styles.footerStat}>
                <Animated.Text style={styles.footerStatValue}>{gameState.totalMinted}</Animated.Text>
                <Animated.Text style={styles.footerStatLabel}>{toUpperCase('NFTs Minted')}</Animated.Text>
              </View>
              <View style={styles.footerStatDivider} />
              <View style={styles.footerStat}>
                <Animated.Text style={styles.footerStatValue}>
                  {gameState.mintedStages.length}/8
                </Animated.Text>
                <Animated.Text style={styles.footerStatLabel}>{toUpperCase('Complete')}</Animated.Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  loadingText: {
    marginTop: Spacing.base,
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  errorText: {
    color: Colors.danger.default,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize['4xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.wider,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Medium',
    color: Colors.text.accent,
    marginTop: Spacing.xs,
    letterSpacing: Typography.letterSpacing.wide,
  },
  section: {
    gap: Spacing.md,
  },
  stageSection: {
    gap: Spacing.sm,
    alignItems: 'stretch',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIndicator: {
    width: 3,
    height: 18,
    backgroundColor: Colors.primary.default,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.normal,
  },
  stageDescription: {
    textAlign: 'center',
    color: Colors.text.secondary,
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
  },
  graduationAlert: {
    marginBottom: Spacing.sm,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.success.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  alertTextContainer: {
    flex: 1,
  },
  graduationTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.success.light,
    marginBottom: Spacing.xs,
  },
  graduationText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.success.default,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
  footerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerStat: {
    alignItems: 'center',
    flex: 1,
  },
  footerStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border.subtle,
  },
  footerStatValue: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.primary.default,
  },
  footerStatLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
    letterSpacing: Typography.letterSpacing.wide,
  },
})
