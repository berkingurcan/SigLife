// Custom Tab Bar - Modern floating glass morphism design
// Following 2025-2026 mobile UI trends

import { BorderRadius, Colors, Spacing, TabBar } from '@/constants/design-system'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'
import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GamepadIcon, SettingsIcon } from './icons'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

interface TabItemProps {
  route: string
  label: string
  isFocused: boolean
  onPress: () => void
  onLongPress: () => void
  Icon: React.ComponentType<{ size?: number; color?: string }>
}

function TabItem({ route, label, isFocused, onPress, onLongPress, Icon }: TabItemProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(isFocused ? 1 : 0.6)

  React.useEffect(() => {
    opacity.value = withTiming(isFocused ? 1 : 0.6, { duration: 200 })
  }, [isFocused, opacity])

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 })
  }

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress()
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
    transform: [{ scale: withSpring(isFocused ? 1 : 0.5, { damping: 15, stiffness: 300 }) }],
  }))

  return (
    <AnimatedTouchable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.tabItem, animatedStyle]}
      activeOpacity={1}
    >
      <Animated.View style={[styles.activeIndicator, indicatorStyle]} />
      <Icon
        size={TabBar.iconSize}
        color={isFocused ? Colors.primary.default : Colors.text.tertiary}
      />
      <Animated.Text
        style={[
          styles.tabLabel,
          { color: isFocused ? Colors.primary.default : Colors.text.tertiary },
        ]}
      >
        {label}
      </Animated.Text>
    </AnimatedTouchable>
  )
}

// Map route names to icons
const routeIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  game: GamepadIcon,
  settings: SettingsIcon,
}

// Map route names to labels
const routeLabels: Record<string, string> = {
  game: 'Game',
  settings: 'Settings',
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()

  // Filter out hidden tabs (like index)
  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key]
    const tabBarItemStyle = options.tabBarItemStyle as { display?: string } | undefined
    return tabBarItemStyle?.display !== 'none'
  })

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
      <View style={styles.tabBarWrapper}>
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <View style={styles.tabBarInner}>
            {visibleRoutes.map((route) => {
              const { options } = descriptors[route.key]
              const label = routeLabels[route.name] || options.title || route.name

              // Find the actual index in the full state.routes array
              const actualIndex = state.routes.findIndex((r) => r.key === route.key)
              const isFocused = state.index === actualIndex

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                })

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name)
                }
              }

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                })
              }

              const Icon = routeIcons[route.name] || GamepadIcon

              return (
                <TabItem
                  key={route.key}
                  route={route.name}
                  label={label}
                  isFocused={isFocused}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  Icon={Icon}
                />
              )
            })}
          </View>
        </BlurView>
        {/* Glow effect */}
        <View style={styles.glowEffect} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: TabBar.margin,
  },
  tabBarWrapper: {
    width: '100%',
    maxWidth: 400,
    position: 'relative',
  },
  blurContainer: {
    borderRadius: TabBar.borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glass.border,
  },
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: Colors.glass.background,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: TabBar.height,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.base,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary.default,
  },
  tabLabel: {
    fontSize: TabBar.labelSize,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  glowEffect: {
    position: 'absolute',
    bottom: -8,
    left: '20%',
    right: '20%',
    height: 16,
    backgroundColor: Colors.primary.glow,
    borderRadius: TabBar.borderRadius,
    opacity: 0.3,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: {
        elevation: 0,
      },
    }),
  },
})
