// Insufficient Balance Modal - Styled warning modal for balance checks
// Matches the app's design system and glass morphism style

import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { WalletIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/design-system'

interface InsufficientBalanceModalProps {
  visible: boolean
  onClose: () => void
  currentBalance: number
  requiredBalance: number
  mintFee: number
  estimatedTxFee: number
}

export function InsufficientBalanceModal({
  visible,
  onClose,
  currentBalance,
  requiredBalance,
  mintFee,
  estimatedTxFee,
}: InsufficientBalanceModalProps) {
  const shortfall = requiredBalance - currentBalance

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View entering={ZoomIn.springify().damping(15)} style={styles.modalContainer}>
          {/* Glass background */}
          <View style={styles.glassBackground} />

          {/* Top gradient highlight */}
          <LinearGradient
            colors={[Colors.glass.highlight, 'transparent']}
            style={styles.topHighlight}
          />

          {/* Content */}
          <View style={styles.content}>
            {/* Warning icon with animation */}
            <Animated.View entering={ZoomIn.delay(200).springify()} style={styles.iconWrapper}>
              <View style={styles.iconOuter}>
                <LinearGradient
                  colors={[Colors.warning.default, Colors.warning.dark]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.iconInner}>
                  <WalletIcon size={32} color={Colors.text.primary} />
                </View>
              </View>
              <Animated.View style={styles.glowRing} />
            </Animated.View>

            {/* Title */}
            <Animated.Text entering={FadeInDown.delay(300)} style={styles.title}>
              Insufficient Balance
            </Animated.Text>

            {/* Description */}
            <Animated.Text entering={FadeInDown.delay(350)} style={styles.description}>
              You need more SOL to mint this NFT
            </Animated.Text>

            {/* Balance breakdown card */}
            <Animated.View entering={FadeInDown.delay(400)} style={styles.balanceCard}>
              {/* Current Balance */}
              <View style={styles.balanceRow}>
                <Animated.Text style={styles.balanceLabel}>Your Balance</Animated.Text>
                <Animated.Text style={[styles.balanceValue, styles.currentBalance]}>
                  {currentBalance.toFixed(4)} SOL
                </Animated.Text>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Mint Fee */}
              <View style={styles.balanceRow}>
                <Animated.Text style={styles.balanceLabel}>Mint Fee</Animated.Text>
                <Animated.Text style={styles.balanceValue}>
                  {mintFee.toFixed(2)} SOL
                </Animated.Text>
              </View>

              {/* Transaction Fee */}
              <View style={styles.balanceRow}>
                <Animated.Text style={styles.balanceLabel}>Est. Transaction Fee</Animated.Text>
                <Animated.Text style={styles.balanceValue}>
                  ~{estimatedTxFee.toFixed(2)} SOL
                </Animated.Text>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Required Total */}
              <View style={styles.balanceRow}>
                <Animated.Text style={[styles.balanceLabel, styles.totalLabel]}>
                  Required Total
                </Animated.Text>
                <Animated.Text style={[styles.balanceValue, styles.totalValue]}>
                  {requiredBalance.toFixed(4)} SOL
                </Animated.Text>
              </View>

              {/* Shortfall */}
              <View style={[styles.balanceRow, styles.shortfallRow]}>
                <Animated.Text style={[styles.balanceLabel, styles.shortfallLabel]}>
                  You Need
                </Animated.Text>
                <Animated.Text style={styles.shortfallValue}>
                  +{shortfall.toFixed(4)} SOL
                </Animated.Text>
              </View>
            </Animated.View>

            {/* Hint */}
            <Animated.View entering={FadeIn.delay(500)} style={styles.hintContainer}>
              <Animated.Text style={styles.hintText}>
                Add funds to your wallet and try again
              </Animated.Text>
            </Animated.View>

            {/* Button */}
            <Animated.View entering={FadeInDown.delay(600)} style={styles.buttonContainer}>
              <Button
                title="Got It"
                onPress={onClose}
                variant="secondary"
                size="lg"
              />
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 360,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.warning.default,
    backgroundColor: Colors.surface.elevated,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.warning.default,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.glass.background,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  iconOuter: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconInner: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowRing: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.warning.default,
    opacity: 0.3,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  balanceCard: {
    width: '100%',
    backgroundColor: Colors.surface.default,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  balanceLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  balanceValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'SpaceMono',
    color: Colors.text.primary,
  },
  currentBalance: {
    color: Colors.danger.light,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  totalValue: {
    fontFamily: 'SpaceMono',
    color: Colors.text.accent,
  },
  shortfallRow: {
    marginTop: Spacing.xs,
    backgroundColor: Colors.danger.muted,
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: -Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  shortfallLabel: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.danger.light,
  },
  shortfallValue: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'SpaceMono',
    color: Colors.danger.light,
    fontWeight: '700',
  },
  hintContainer: {
    backgroundColor: Colors.surface.default,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.lg,
  },
  hintText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
})
