// Settings Screen - App configuration
// Redesigned with modern 2025-2026 UI/UX trends

import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { SettingsAppConfig } from '@/components/settings/settings-app-config'
import { SettingsUiAccount } from '@/components/settings/settings-ui-account'
import { SettingsUiCluster } from '@/components/settings/settings-ui-cluster'
import { SettingsIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, TabBar, Typography } from '@/constants/design-system'

export default function TabSettingsScreen() {
  const insets = useSafeAreaInsets()

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

        {/* Footer hint */}
        <Animated.View entering={FadeInDown.delay(500)}>
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
