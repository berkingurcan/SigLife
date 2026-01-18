// Game Action Buttons - Main game action buttons
import React from 'react'
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { AppText } from '@/components/app-text'
import { GameColors } from '@/constants/game-config'

interface GameButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  disabled?: boolean
  loading?: boolean
  icon?: string
}

export function GameButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
}: GameButtonProps) {
  const variantStyles = {
    primary: {
      background: GameColors.primary,
      text: GameColors.textPrimary,
    },
    secondary: {
      background: GameColors.surface,
      text: GameColors.textPrimary,
    },
    success: {
      background: GameColors.success,
      text: GameColors.textPrimary,
    },
    danger: {
      background: GameColors.danger,
      text: GameColors.textPrimary,
    },
  }

  const currentVariant = variantStyles[variant]

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: currentVariant.background },
        variant === 'secondary' && styles.secondaryBorder,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.text} />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <AppText style={styles.icon}>{icon}</AppText>}
          <AppText style={[styles.buttonText, { color: currentVariant.text }]}>{title}</AppText>
        </View>
      )}
    </TouchableOpacity>
  )
}

interface GameActionButtonsProps {
  onLiveLife: () => void
  onViewHistory: () => void
  canGraduate: boolean
  onGraduate: () => void
}

export function GameActionButtons({ onLiveLife, onViewHistory, canGraduate, onGraduate }: GameActionButtonsProps) {
  return (
    <View style={styles.container}>
      <GameButton title="Live Life" icon="🎲" onPress={onLiveLife} variant="primary" />

      {canGraduate && <GameButton title="Graduate!" icon="🎓" onPress={onGraduate} variant="success" />}

      <GameButton title="View Journey" icon="📜" onPress={onViewHistory} variant="secondary" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  secondaryBorder: {
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
})
