// Account UI Buttons - Modern action buttons for wallet
// Redesigned with 2025-2026 UI trends

import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { IconButton } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/design-system'
import Svg, { Path } from 'react-native-svg'

// Custom icons for wallet actions
function AirdropIcon({ size = 24, color = Colors.text.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L12 16M12 16L8 12M12 16L16 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 16V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function SendIcon({ size = 24, color = Colors.text.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function ReceiveIcon({ size = 24, color = Colors.text.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22L12 8M12 8L8 12M12 8L16 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 8V6C20 4.9 19.1 4 18 4H6C4.9 4 4 4.9 4 6V8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onPress: () => void
  color: string
}

function ActionButton({ icon, label, onPress, color }: ActionButtonProps) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress()
  }

  return (
    <View style={styles.actionButton}>
      <View style={[styles.iconWrapper, { backgroundColor: `${color}20` }]}>
        <IconButton
          icon={icon}
          onPress={handlePress}
          variant="accent"
          size="lg"
        />
      </View>
      <Animated.Text style={styles.actionLabel}>{label}</Animated.Text>
    </View>
  )
}

export function AccountUiButtons() {
  const router = useRouter()

  return (
    <Card variant="default" padding="md">
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.delay(0)}>
          <ActionButton
            icon={<AirdropIcon size={22} color={Colors.success.default} />}
            label="Airdrop"
            onPress={() => router.navigate('/(tabs)/account/airdrop')}
            color={Colors.success.default}
          />
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View entering={FadeInUp.delay(100)}>
          <ActionButton
            icon={<SendIcon size={22} color={Colors.danger.default} />}
            label="Send"
            onPress={() => router.navigate('/(tabs)/account/send')}
            color={Colors.danger.default}
          />
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View entering={FadeInUp.delay(200)}>
          <ActionButton
            icon={<ReceiveIcon size={22} color={Colors.primary.default} />}
            label="Receive"
            onPress={() => router.navigate('/(tabs)/account/receive')}
            color={Colors.primary.default}
          />
        </Animated.View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrapper: {
    borderRadius: BorderRadius.full,
    padding: Spacing.xs,
  },
  actionLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border.subtle,
  },
})
