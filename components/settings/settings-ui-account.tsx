// Settings UI Account - Wallet connection management
// Redesigned with modern 2025-2026 UI/UX trends

import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { WalletUiButtonConnect } from '@/components/solana/wallet-ui-button-connect'
import { WalletUiButtonDisconnect } from '@/components/solana/wallet-ui-button-disconnect'
import { Card } from '@/components/ui/card'
import { CheckIcon, WalletIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/design-system'
import { ellipsify } from '@/utils/ellipsify'

export function SettingsUiAccount() {
  const { account } = useMobileWallet()

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Animated.Text style={styles.sectionTitle}>Wallet</Animated.Text>
      </View>

      <Card variant={account ? 'success' : 'default'} padding="md">
        <View style={styles.content}>
          <View style={[styles.statusIcon, account ? styles.connected : styles.disconnected]}>
            {account ? (
              <CheckIcon size={20} color={Colors.success.default} />
            ) : (
              <WalletIcon size={20} color={Colors.text.tertiary} />
            )}
          </View>

          <View style={styles.info}>
            {account ? (
              <>
                <Animated.Text style={styles.statusText}>Connected</Animated.Text>
                <Animated.Text style={styles.addressText}>
                  {ellipsify(account.publicKey.toString(), 8)}
                </Animated.Text>
              </>
            ) : (
              <>
                <Animated.Text style={styles.statusText}>Not Connected</Animated.Text>
                <Animated.Text style={styles.hintText}>Connect your wallet to continue</Animated.Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {account ? <WalletUiButtonDisconnect /> : <WalletUiButtonConnect />}
        </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  connected: {
    backgroundColor: Colors.success.muted,
  },
  disconnected: {
    backgroundColor: Colors.surface.elevated,
  },
  info: {
    flex: 1,
  },
  statusText: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  addressText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.success.default,
    marginTop: Spacing.xs,
  },
  hintText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
  buttonContainer: {
    marginTop: Spacing.xs,
  },
})
