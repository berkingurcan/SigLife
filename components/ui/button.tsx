// Button Component - Modern animated button design
// Following 2025-2026 mobile UI trends

import React from 'react'
import { TouchableOpacity, StyleSheet, View, ActivityIndicator, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { Colors, Spacing, BorderRadius, Typography, ComponentSize, Shadows, Gradients } from '@/constants/design-system'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = true,
}: ButtonProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const sizeConfig = ComponentSize.button[size]

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 })
    opacity.value = withTiming(0.9, { duration: 100 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 })
    opacity.value = withTiming(1, { duration: 100 })
  }

  const handlePress = () => {
    if (disabled || loading) return
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    onPress()
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const variantConfig = {
    primary: {
      gradient: Gradients.primary.colors,
      textColor: Colors.text.primary,
      borderColor: 'transparent',
      shadow: Shadows.primaryGlow,
    },
    secondary: {
      gradient: null,
      backgroundColor: Colors.surface.elevated,
      textColor: Colors.text.primary,
      borderColor: Colors.border.default,
      shadow: Shadows.sm,
    },
    success: {
      gradient: Gradients.success.colors,
      textColor: Colors.text.primary,
      borderColor: 'transparent',
      shadow: Shadows.glow(Colors.success.default),
    },
    danger: {
      gradient: Gradients.danger.colors,
      textColor: Colors.text.primary,
      borderColor: 'transparent',
      shadow: Shadows.glow(Colors.danger.default),
    },
    ghost: {
      gradient: null,
      backgroundColor: 'transparent',
      textColor: Colors.text.secondary,
      borderColor: 'transparent',
      shadow: Shadows.none,
    },
    outline: {
      gradient: null,
      backgroundColor: 'transparent',
      textColor: Colors.primary.default,
      borderColor: Colors.primary.default,
      shadow: Shadows.none,
    },
  }

  const config = variantConfig[variant]
  const isDisabled = disabled || loading

  const buttonContent = (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator color={config.textColor} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Animated.Text
            style={[
              styles.buttonText,
              {
                color: config.textColor,
                fontSize: sizeConfig.fontSize,
              },
            ]}
          >
            {title}
          </Animated.Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </>
      )}
    </View>
  )

  const buttonStyle = [
    styles.button,
    {
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderColor: config.borderColor,
      borderWidth: variant === 'outline' || variant === 'secondary' ? 1 : 0,
    },
    !config.gradient && { backgroundColor: config.backgroundColor },
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    !isDisabled && Platform.OS === 'ios' && config.shadow,
  ]

  if (config.gradient) {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={1}
        style={[animatedStyle, fullWidth && styles.fullWidth]}
      >
        <LinearGradient
          colors={isDisabled ? [Colors.surface.default, Colors.surface.default] : config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={buttonStyle}
        >
          {buttonContent}
        </LinearGradient>
      </AnimatedTouchable>
    )
  }

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      activeOpacity={1}
      style={[buttonStyle, animatedStyle]}
    >
      {buttonContent}
    </AnimatedTouchable>
  )
}

// Icon Button - Circular button for icons only
interface IconButtonProps {
  icon: React.ReactNode
  onPress: () => void
  variant?: 'default' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function IconButton({
  icon,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
}: IconButtonProps) {
  const scale = useSharedValue(1)

  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 })
  }

  const handlePress = () => {
    if (disabled) return
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress()
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const variantStyles = {
    default: {
      backgroundColor: Colors.surface.elevated,
      borderColor: Colors.border.subtle,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    accent: {
      backgroundColor: Colors.primary.muted,
      borderColor: Colors.primary.default,
    },
  }

  const config = variantStyles[variant]

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={[
        styles.iconButton,
        {
          width: sizes[size],
          height: sizes[size],
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
          borderWidth: variant !== 'ghost' ? 1 : 0,
        },
        disabled && styles.disabled,
        animatedStyle,
      ]}
    >
      {icon}
    </AnimatedTouchable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  iconButton: {
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
