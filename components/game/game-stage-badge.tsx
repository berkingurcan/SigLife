// Game Stage Badge - Modern stage indicator component
// Redesigned with 2025-2026 UI trends

import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated'

import { StageIcons } from '@/components/ui/icons'
import { BorderRadius, Colors, Gradients, Spacing, Typography } from '@/constants/design-system'
import { STAGES, type StageId } from '@/constants/game-config'
import { toUpperCase } from '@/utils/text'

interface GameStageBadgeProps {
  stageId: StageId
  size?: 'compact' | 'small' | 'medium' | 'large'
  showProgress?: boolean
}

export function GameStageBadge({ stageId, size = 'medium', showProgress = true }: GameStageBadgeProps) {
  const stage = STAGES.find((s) => s.id === stageId)
  if (!stage) return null

  const stageNumber = stage.index + 1
  const totalStages = STAGES.length
  const IconComponent = StageIcons[stageId]
  const gradientColors = Gradients.stage[stageId] || Gradients.primary.colors

  const sizeConfig = {
    compact: {
      containerPadding: Spacing.sm,
      iconSize: 24,
      iconContainerSize: 40,
      nameSize: Typography.fontSize.base,
      progressSize: Typography.fontSize.xs,
      horizontal: true,
    },
    small: {
      containerPadding: Spacing.md,
      iconSize: 28,
      iconContainerSize: 48,
      nameSize: Typography.fontSize.sm,
      progressSize: Typography.fontSize.xs,
      horizontal: false,
    },
    medium: {
      containerPadding: Spacing.lg,
      iconSize: 40,
      iconContainerSize: 72,
      nameSize: Typography.fontSize.lg,
      progressSize: Typography.fontSize.sm,
      horizontal: false,
    },
    large: {
      containerPadding: Spacing.xl,
      iconSize: 56,
      iconContainerSize: 96,
      nameSize: Typography.fontSize['2xl'],
      progressSize: Typography.fontSize.base,
      horizontal: false,
    },
  }

  const isCompact = size === 'compact'

  const config = sizeConfig[size]

  // Compact horizontal layout
  if (isCompact) {
    return (
      <Animated.View entering={ZoomIn.springify()}>
        <View style={[styles.compactContainer, { padding: config.containerPadding }]}>
          <LinearGradient
            colors={[Colors.glass.border, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.compactBorderGradient}
          />
          <View style={styles.glassBackground} />

          <View style={styles.compactContent}>
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                styles.compactIcon,
                {
                  width: config.iconContainerSize,
                  height: config.iconContainerSize,
                },
              ]}
            >
              <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              />
              <IconComponent size={config.iconSize} color={Colors.text.primary} />
            </View>

            {/* Stage Info */}
            <View style={styles.compactInfo}>
              <Animated.Text style={[styles.stageName, { fontSize: config.nameSize }]}>
                {stage.name}
              </Animated.Text>
              {showProgress && (
                <View style={styles.compactProgress}>
                  <View style={styles.progressDots}>
                    {STAGES.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.progressDot,
                          index < stageNumber && styles.progressDotActive,
                          index === stage.index && styles.progressDotCurrent,
                        ]}
                      />
                    ))}
                  </View>
                  <Animated.Text style={[styles.progressText, { fontSize: config.progressSize }]}>
                    {toUpperCase(`${stageNumber}/${totalStages}`)}
                  </Animated.Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }

  // Standard vertical layout
  return (
    <Animated.View entering={ZoomIn.springify()} style={styles.wrapper}>
      <View style={[styles.container, { padding: config.containerPadding }]}>
        {/* Gradient border effect */}
        <LinearGradient
          colors={[Colors.glass.border, 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.borderGradient}
        />

        {/* Glass background */}
        <View style={styles.glassBackground} />

        {/* Content */}
        <View style={styles.content}>
          {/* Icon container with gradient */}
          <Animated.View entering={FadeIn.delay(100)}>
            <View
              style={[
                styles.iconContainer,
                {
                  width: config.iconContainerSize,
                  height: config.iconContainerSize,
                },
              ]}
            >
              <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              />
              <IconComponent size={config.iconSize} color={Colors.text.primary} />
            </View>
          </Animated.View>

          {/* Stage name */}
          <Animated.Text
            entering={FadeIn.delay(200)}
            style={[styles.stageName, { fontSize: config.nameSize }]}
          >
            {stage.name}
          </Animated.Text>

          {/* Progress indicator */}
          {showProgress && (
            <Animated.View entering={FadeIn.delay(300)} style={styles.progressContainer}>
              <View style={styles.progressDots}>
                {STAGES.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.progressDot,
                      index < stageNumber && styles.progressDotActive,
                      index === stage.index && styles.progressDotCurrent,
                    ]}
                  />
                ))}
              </View>
              <Animated.Text style={[styles.progressText, { fontSize: config.progressSize }]}>
                {toUpperCase(`Stage ${stageNumber} of ${totalStages}`)}
              </Animated.Text>
            </Animated.View>
          )}
        </View>
      </View>

      {/* Glow effect */}
      <View style={[styles.glow, { backgroundColor: gradientColors[0] }]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border.accent,
    backgroundColor: Colors.surface.default,
    position: 'relative',
    overflow: 'hidden',
    minWidth: 200,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border.accent,
    backgroundColor: Colors.surface.default,
    position: 'relative',
    overflow: 'hidden',
  },
  compactBorderGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 60,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: Spacing.sm,
  },
  compactIcon: {
    marginBottom: 0,
    marginRight: Spacing.md,
  },
  compactInfo: {
    flex: 1,
  },
  compactProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  borderGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.glass.background,
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.full,
  },
  stageName: {
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    textAlign: 'center',
    letterSpacing: Typography.letterSpacing.normal,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  progressDots: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border.default,
  },
  progressDotActive: {
    backgroundColor: Colors.primary.default,
  },
  progressDotCurrent: {
    width: 12,
    backgroundColor: Colors.primary.light,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
    }),
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    color: Colors.text.tertiary,
    letterSpacing: Typography.letterSpacing.wide,
  },
  glow: {
    position: 'absolute',
    bottom: -16,
    width: '60%',
    height: 32,
    borderRadius: BorderRadius.xl,
    opacity: 0.2,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
      },
    }),
  },
})
