// Settings Screen - App configuration
// Redesigned with modern 2025-2026 UI/UX trends

import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useGame } from '@/components/game/game-provider'
import { SettingsAppConfig } from '@/components/settings/settings-app-config'
import { SettingsUiAccount } from '@/components/settings/settings-ui-account'
import { SettingsUiCluster } from '@/components/settings/settings-ui-cluster'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertIcon, ResetIcon, SettingsIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, TabBar, Typography } from '@/constants/design-system'

export default function TabSettingsScreen() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { resetGame } = useGame()

  const handleResetGame = () => {
    Alert.alert(
      'Start New Game',
      'Are you sure you want to reset your progress? This will delete all your history and stats. NFTs you minted will remain in your wallet.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }
            resetGame()
          },
        },
      ],
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.headerIconContainer}>
            <SettingsIcon size={28} color={Colors.primary.default} />
          </View>
          <Animated.Text style={styles.headerTitle}>Settings</Animated.Text>
        </Animated.View>

        {/* Account Section */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <SettingsUiAccount />
        </Animated.View>

        {/* App Config Section */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <SettingsAppConfig />
        </Animated.View>

        {/* Cluster Section */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <SettingsUiCluster />
        </Animated.View>

        {/* Game Reset Section */}
        <Animated.View entering={FadeInDown.delay(500)}>
          <Card variant="default" padding="md">
            <View style={styles.resetSection}>
              <View style={styles.resetHeader}>
                <View style={styles.resetIconContainer}>
                  <AlertIcon size={24} color={Colors.danger.default} />
                </View>
                <View style={styles.resetInfo}>
                  <Animated.Text style={styles.resetTitle}>Game Progress</Animated.Text>
                  <Animated.Text style={styles.resetDescription}>
                    Reset your journey and start fresh
                  </Animated.Text>
                </View>
              </View>
              <Button
                title="Start New Game"
                onPress={handleResetGame}
                variant="danger"
                size="md"
                icon={<ResetIcon size={18} color={Colors.text.primary} />}
              />
            </View>
          </Card>
        </Animated.View>

        {/* Footer hint */}
        <Animated.View entering={FadeInDown.delay(600)}>
          <Animated.Text style={styles.footerHint}>
            Configure app info and clusters in{' '}
            <Animated.Text style={styles.footerHintCode}>constants/app-config.tsx</Animated.Text>
          </Animated.Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  resetSection: {
    gap: Spacing.md,
  },
  resetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.danger.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  resetInfo: {
    flex: 1,
  },
  resetTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  resetDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  footerHint: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  footerHintCode: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.secondary,
  },
})
