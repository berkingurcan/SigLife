// Settings App Config - App information display
// Redesigned with modern 2025-2026 UI/UX trends

import React from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { Card } from '@/components/ui/card'
import { ChevronRightIcon } from '@/components/ui/icons'
import { AppConfig } from '@/constants/app-config'
import { Colors, Spacing, Typography } from '@/constants/design-system'

export function SettingsAppConfig() {
  const handleOpenUrl = () => {
    Linking.openURL(AppConfig.uri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Animated.Text style={styles.sectionTitle}>App Info</Animated.Text>
      </View>

      <Card variant="default" padding="md">
        {/* App Name */}
        <View style={[styles.infoRow, styles.borderBottom]}>
          <Animated.Text style={styles.label}>Name</Animated.Text>
          <Animated.Text style={styles.value}>{AppConfig.name}</Animated.Text>
        </View>

        {/* App URL */}
        <TouchableOpacity onPress={handleOpenUrl} activeOpacity={0.7}>
          <View style={styles.infoRow}>
            <Animated.Text style={styles.label}>Website</Animated.Text>
            <View style={styles.linkContainer}>
              <Animated.Text style={styles.linkValue} numberOfLines={1}>
                {AppConfig.uri}
              </Animated.Text>
              <ChevronRightIcon size={16} color={Colors.primary.default} />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  value: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
    justifyContent: 'flex-end',
  },
  linkValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.primary.default,
    maxWidth: 180,
  },
})
