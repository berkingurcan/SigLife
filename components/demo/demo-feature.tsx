// Demo Feature - Developer testing screen
// Redesigned with modern 2025-2026 UI/UX trends

import { PublicKey } from '@solana/web3.js'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Card } from '@/components/ui/card'
import { AlertIcon, BugIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, TabBar, Typography } from '@/constants/design-system'
import { DemoFeatureSignMessage } from './demo-feature-sign-message'

export function DemoFeature() {
  const insets = useSafeAreaInsets()
  const { account } = useMobileWallet()

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
            <BugIcon size={28} color={Colors.warning.default} />
          </View>
          <Animated.Text style={styles.headerTitle}>Developer Tools</Animated.Text>
        </Animated.View>

        {/* Dev Notice */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <Card variant="default" padding="md">
            <View style={styles.noticeContent}>
              <AlertIcon size={20} color={Colors.warning.default} />
              <Animated.Text style={styles.noticeText}>
                This page is for development and testing purposes only.
              </Animated.Text>
            </View>
          </Card>
        </Animated.View>

        {/* Sign Message Demo */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Animated.Text style={styles.sectionTitle}>Sign Message</Animated.Text>
          </View>
          <Card variant="default" padding="md">
            <DemoFeatureSignMessage address={account?.publicKey as PublicKey} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.warning.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  noticeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  noticeText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.warning.default,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
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
  },
})
