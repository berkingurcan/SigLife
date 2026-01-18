// Card Component - Modern glass morphism card design
// Following 2025-2026 mobile UI trends

import React from 'react'
import { View, StyleSheet, ViewStyle, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/design-system'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'glass' | 'accent' | 'success' | 'danger'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  style?: ViewStyle
  withGlow?: boolean
  glowColor?: string
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  style,
  withGlow = false,
  glowColor = Colors.primary.default,
}: CardProps) {
  const paddingValue = {
    none: 0,
    sm: Spacing.sm,
    md: Spacing.base,
    lg: Spacing.xl,
  }[padding]

  const variantStyles = {
    default: {
      backgroundColor: Colors.surface.default,
      borderColor: Colors.border.subtle,
    },
    elevated: {
      backgroundColor: Colors.surface.elevated,
      borderColor: Colors.border.default,
    },
    glass: {
      backgroundColor: Colors.glass.background,
      borderColor: Colors.glass.border,
    },
    accent: {
      backgroundColor: Colors.surface.default,
      borderColor: Colors.primary.default,
    },
    success: {
      backgroundColor: Colors.success.muted,
      borderColor: Colors.success.default,
    },
    danger: {
      backgroundColor: Colors.danger.muted,
      borderColor: Colors.danger.default,
    },
  }

  const currentVariant = variantStyles[variant]

  if (variant === 'glass') {
    return (
      <View style={[styles.glassWrapper, style]}>
        {withGlow && (
          <View
            style={[
              styles.glowUnderlay,
              {
                backgroundColor: glowColor,
                opacity: 0.15,
              },
            ]}
          />
        )}
        <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
          <View
            style={[
              styles.card,
              {
                padding: paddingValue,
                borderColor: currentVariant.borderColor,
                backgroundColor: 'transparent',
              },
            ]}
          >
            <LinearGradient
              colors={[Colors.glass.highlight, 'transparent']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.3 }}
              style={styles.gradientHighlight}
            />
            {children}
          </View>
        </BlurView>
      </View>
    )
  }

  return (
    <View
      style={[
        styles.card,
        {
          padding: paddingValue,
          backgroundColor: currentVariant.backgroundColor,
          borderColor: currentVariant.borderColor,
        },
        withGlow && variant === 'accent' && Shadows.primaryGlow,
        style,
      ]}
    >
      {children}
    </View>
  )
}

// Stat Card - Specialized card for stats display
interface StatCardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function StatCard({ children, style }: StatCardProps) {
  return (
    <View style={[styles.statCard, style]}>
      <LinearGradient
        colors={[Colors.surface.elevated, Colors.surface.default]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.statCardGradient}
      />
      {children}
    </View>
  )
}

// Section Header Component
interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <View style={styles.sectionIndicator} />
        <View>
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionLine} />
            <View style={styles.sectionTextWrapper}>
              <View style={styles.sectionTitleInner}>
                <View style={styles.sectionDot} />
                <View style={styles.sectionTitleTextContainer}>
                  <LinearGradient
                    colors={[Colors.primary.light, Colors.primary.default]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.titleUnderline}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  glassWrapper: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  blurContainer: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glass.border,
  },
  gradientHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  glowUnderlay: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: BorderRadius.lg + 4,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
      android: {},
    }),
  },
  statCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    overflow: 'hidden',
    padding: Spacing.base,
    position: 'relative',
  },
  statCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIndicator: {
    width: 3,
    height: 20,
    backgroundColor: Colors.primary.default,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.primary.default,
    borderRadius: 1,
    marginRight: Spacing.sm,
  },
  sectionTextWrapper: {
    flex: 1,
  },
  sectionTitleInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary.default,
    marginRight: Spacing.xs,
  },
  sectionTitleTextContainer: {
    position: 'relative',
  },
  titleUnderline: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
  },
})
