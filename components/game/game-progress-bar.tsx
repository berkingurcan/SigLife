// Game Progress Bar - Modern animated progress visualization
// Redesigned with 2025-2026 UI trends

import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated'

import { Colors, Spacing, BorderRadius, ComponentSize } from '@/constants/design-system'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

interface GameProgressBarProps {
  value: number
  maxValue?: number
  color: string
  height?: 'sm' | 'md' | 'lg'
  showGlow?: boolean
  animated?: boolean
}

export function GameProgressBar({
  value,
  maxValue = 100,
  color,
  height = 'md',
  showGlow = true,
  animated = true,
}: GameProgressBarProps) {
  const progress = useSharedValue(0)
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100))
  const heightValue = ComponentSize.progressBar[height]

  useEffect(() => {
    if (animated) {
      progress.value = withSpring(percentage, {
        damping: 20,
        stiffness: 100,
        mass: 1,
      })
    } else {
      progress.value = percentage
    }
  }, [percentage, animated, progress])

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }))

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: progress.value > 5 ? withTiming(0.6, { duration: 300 }) : 0,
  }))

  // Create gradient colors from the stat color
  const gradientColors = [
    color,
    adjustColorBrightness(color, -20),
  ]

  return (
    <View style={styles.container}>
      <View style={[styles.track, { height: heightValue }]}>
        {/* Background track with subtle inner shadow effect */}
        <View style={styles.trackInner} />

        {/* Animated fill */}
        <Animated.View style={[styles.fillContainer, { height: heightValue }, animatedFillStyle]}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.fill, { height: heightValue }]}
          />

          {/* Highlight effect at top of bar */}
          <View style={[styles.highlight, { height: heightValue / 3 }]} />

          {/* Glow effect at the end of the bar */}
          {showGlow && (
            <Animated.View
              style={[
                styles.endGlow,
                {
                  backgroundColor: color,
                  height: heightValue,
                  width: heightValue,
                },
                animatedGlowStyle,
              ]}
            />
          )}
        </Animated.View>
      </View>
    </View>
  )
}

// Helper to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    backgroundColor: Colors.surface.default,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  trackInner: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.border.subtle,
    borderRadius: BorderRadius.full,
  },
  fillContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    width: '100%',
    borderRadius: BorderRadius.full,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderTopLeftRadius: BorderRadius.full,
    borderTopRightRadius: BorderRadius.full,
  },
  endGlow: {
    position: 'absolute',
    right: -2,
    top: 0,
    borderRadius: BorderRadius.full,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
})
