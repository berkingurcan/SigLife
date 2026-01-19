// Account Feature - Wallet dashboard
// Redesigned with modern 2025-2026 UI/UX trends

import { PublicKey } from '@solana/web3.js'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useState } from 'react'
import { Platform, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AccountUiBadges } from '@/components/account/account-ui-badges'
import { AccountUiBalance } from '@/components/account/account-ui-balance'
import { AccountUiTokenAccounts } from '@/components/account/account-ui-token-accounts'
import { useGetBalanceInvalidate } from '@/components/account/use-get-balance'
import { useGetTokenAccountsInvalidate } from '@/components/account/use-get-token-accounts'
import { WalletUiButtonConnect } from '@/components/solana/wallet-ui-button-connect'
import { Card } from '@/components/ui/card'
import { WalletIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Spacing, TabBar, Typography } from '@/constants/design-system'
import { ellipsify } from '@/utils/ellipsify'
import { AccountUiButtons } from './account-ui-buttons'

export function AccountFeature() {
  const insets = useSafeAreaInsets()
  const { account } = useMobileWallet()
  const [refreshing, setRefreshing] = useState(false)
  const invalidateBalance = useGetBalanceInvalidate({ address: account?.publicKey as PublicKey })
  const invalidateTokenAccounts = useGetTokenAccountsInvalidate({ address: account?.publicKey as PublicKey })

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([invalidateBalance(), invalidateTokenAccounts()])
    setRefreshing(false)
  }, [invalidateBalance, invalidateTokenAccounts])

  if (!account) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={[Colors.background.secondary, Colors.background.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.connectContainer}>
          <Animated.View entering={FadeIn}>
            <View style={styles.connectIconContainer}>
              <WalletIcon size={56} color={Colors.primary.default} />
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(100)} style={styles.connectTitle}>
            Connect Wallet
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(200)} style={styles.connectText}>
            Connect your Solana wallet to view your balance and manage your assets.
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(300)} style={styles.connectButton}>
            <WalletUiButtonConnect />
          </Animated.View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[Colors.background.secondary, Colors.background.primary]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: TabBar.height + Spacing['2xl'] },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary.default}
            colors={[Colors.primary.default]}
          />
        }
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.headerIconContainer}>
            <WalletIcon size={28} color={Colors.primary.default} />
          </View>
          <Animated.Text style={styles.headerTitle}>Wallet</Animated.Text>
        </Animated.View>

        {/* Balance Card */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <Card variant="accent" padding="lg" withGlow style={styles.balanceCard}>
            <View style={styles.balanceContent}>
              <AccountUiBalance address={account.publicKey} />
              <View style={styles.addressContainer}>
                <Animated.Text style={styles.addressLabel}>Address</Animated.Text>
                <Animated.Text style={styles.addressValue}>
                  {ellipsify(account.publicKey.toString(), 8)}
                </Animated.Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Animated.Text style={styles.sectionTitle}>Quick Actions</Animated.Text>
          </View>
          <AccountUiButtons />
        </Animated.View>

        {/* Badges */}
        <Animated.View entering={FadeInDown.delay(350)}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Animated.Text style={styles.sectionTitle}>Badges</Animated.Text>
          </View>
          <AccountUiBadges address={account.publicKey} />
        </Animated.View>

        {/* Token Accounts */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Animated.Text style={styles.sectionTitle}>Tokens</Animated.Text>
          </View>
          <Card variant="default" padding="md">
            <AccountUiTokenAccounts address={account.publicKey} />
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  connectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  connectIconContainer: {
    width: 112,
    height: 112,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
    }),
  },
  connectTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  connectText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
  },
  connectButton: {
    width: '100%',
    maxWidth: 240,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.primary.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  balanceCard: {
    alignItems: 'center',
  },
  balanceContent: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  addressContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  addressLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
    marginBottom: Spacing.xs,
  },
  addressValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.secondary,
    letterSpacing: Typography.letterSpacing.normal,
  },
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
})
