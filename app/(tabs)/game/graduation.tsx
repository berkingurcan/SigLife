// Graduation Screen - Stage completion and NFT minting
// Redesigned with modern 2025-2026 UI/UX trends

import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useGetBalance } from '@/components/account/use-get-balance'
import { useCluster } from '@/components/cluster/cluster-provider'
import { ClusterNetwork } from '@/components/cluster/cluster-network'
import { useGame } from '@/components/game/game-provider'
import { GameStageBadge } from '@/components/game/game-stage-badge'
import { NftMintedModal } from '@/components/game/nft-minted-modal'
import { useMintStageNFT } from '@/components/game/use-mint-stage-nft'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  CelebrationIcon,
  CheckIcon,
  GraduateIcon,
  MintIcon,
  StageIcons,
  TargetIcon,
  TrophyIcon,
} from '@/components/ui/icons'
import { BorderRadius, Colors, Gradients, Spacing, TabBar, Typography } from '@/constants/design-system'
import { getNextStage, getStageById } from '@/constants/game-config'
import { getMintFeeForStage } from '@/constants/nft-config'

export default function GraduationScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { account } = useMobileWallet()
  const { selectedCluster } = useCluster()
  const { gameState, canGraduate, advanceStage, recordMint } = useGame()
  const [hasMinted, setHasMinted] = useState(false)
  const [showMintedModal, setShowMintedModal] = useState(false)
  const [mintedAddress, setMintedAddress] = useState<string | null>(null)

  // Determine network for DAS API
  const network: 'devnet' | 'mainnet-beta' =
    selectedCluster.network === ClusterNetwork.Mainnet ? 'mainnet-beta' : 'devnet'

  const mintMutation = useMintStageNFT({
    address: account?.publicKey ?? null!,
  })

  // Get user's balance for pre-mint validation
  const { data: balance } = useGetBalance({
    address: account?.publicKey ?? null!,
  })

  if (!gameState) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={[Colors.background.secondary, Colors.background.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.loadingContainer}>
          <Animated.Text style={styles.loadingText}>Loading...</Animated.Text>
        </View>
      </View>
    )
  }

  const currentStage = getStageById(gameState.currentStage)
  const nextStage = getNextStage(gameState.currentStage)
  const alreadyMinted = gameState.mintedStages.includes(gameState.currentStage)

  const handleMintNFT = async () => {
    if (!account?.publicKey) {
      Alert.alert('Wallet Required', 'Please connect your wallet first.')
      return
    }

    // Check balance before opening wallet
    const mintFee = getMintFeeForStage(gameState.currentStage)
    const estimatedTxFee = 0.02 // ~0.02 SOL for NFT mint transaction fees
    const requiredBalance = (mintFee + estimatedTxFee) * LAMPORTS_PER_SOL

    if (balance === undefined || balance < requiredBalance) {
      const balanceInSol = balance ? (balance / LAMPORTS_PER_SOL).toFixed(4) : '0'
      const requiredInSol = (mintFee + estimatedTxFee).toFixed(4)
      Alert.alert(
        'Insufficient Balance',
        `You need at least ${requiredInSol} SOL to mint this NFT.\n\nYour balance: ${balanceInSol} SOL\nMint fee: ${mintFee} SOL\nEstimated tx fee: ~${estimatedTxFee} SOL`
      )
      return
    }

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }

    try {
      const result = await mintMutation.mutateAsync({
        stageId: gameState.currentStage,
      })

      if (result) {
        await recordMint(gameState.currentStage)
        setHasMinted(true)
        setMintedAddress(result.mintAddress)
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }
        setShowMintedModal(true)
      }
    } catch (error) {
      // Check if user cancelled - don't show error in this case
      const errorName = error instanceof Error ? error.name : ''
      const errorMessage = String(error)

      if (errorName === 'TransactionCancelledError' ||
        errorMessage.includes('CancellationException') ||
        errorMessage.includes('cancelled') ||
        errorMessage.includes('canceled')) {
        // User cancelled - just return silently, no error message needed
        return
      }

      Alert.alert('Mint Failed', 'Failed to mint NFT. Please check your wallet balance and try again.')
    }
  }

  const handleAdvance = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    await advanceStage()
    router.back()
  }

  const handleSkip = () => {
    router.back()
  }

  // Not ready state
  if (!canGraduate && !alreadyMinted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={[Colors.background.secondary, Colors.background.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.notReadyContainer}>
          <Animated.View entering={ZoomIn}>
            <View style={styles.notReadyIconContainer}>
              <TargetIcon size={56} color={Colors.warning.default} />
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(200)} style={styles.notReadyTitle}>
            Not Ready Yet
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(300)} style={styles.notReadyText}>
            Keep grinding! You haven't met the requirements for the next stage.
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(400)} style={styles.notReadyButton}>
            <Button title="Back to Game" onPress={() => router.back()} variant="secondary" size="lg" />
          </Animated.View>
        </View>
      </View>
    )
  }

  const NextStageIcon = nextStage ? StageIcons[nextStage.id] : null

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
      >
        {/* Celebration Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Animated.View entering={ZoomIn.delay(200)}>
            <View style={styles.celebrationIconContainer}>
              <CelebrationIcon size={48} color={Colors.warning.default} />
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(300)} style={styles.title}>
            Congratulations
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(400)} style={styles.subtitle}>
            You've completed the {currentStage.name} stage
          </Animated.Text>
        </Animated.View>

        {/* Current Stage Badge */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.badgeSection}>
          <GameStageBadge stageId={currentStage.id} size="large" showProgress={false} />
        </Animated.View>

        {/* NFT Minting Section */}
        {!alreadyMinted && !hasMinted && (
          <Animated.View entering={FadeInDown.delay(500)}>
            <Card variant="accent" padding="lg" withGlow style={styles.mintSection}>
              <View style={styles.mintHeader}>
                <View style={styles.mintIconContainer}>
                  <MintIcon size={28} color={Colors.primary.default} />
                </View>
                <View style={styles.mintTitleContainer}>
                  <Animated.Text style={styles.mintTitle}>Mint Your Achievement</Animated.Text>
                  <Animated.Text style={styles.mintSubtitle}>
                    Required to advance to next stage
                  </Animated.Text>
                </View>
              </View>


              <Button
                title={`Mint ${currentStage.name} NFT`}
                onPress={handleMintNFT}
                variant="primary"
                size="lg"
                loading={mintMutation.isPending}
                disabled={mintMutation.isPending}
                icon={<MintIcon size={20} color={Colors.text.primary} />}
              />

              <Animated.Text style={styles.requiredText}>
                You must mint the NFT before advancing to the next stage.
              </Animated.Text>
            </Card>
          </Animated.View>
        )}

        {/* Already Minted */}
        {(alreadyMinted || hasMinted) && (
          <Animated.View entering={FadeIn.delay(500)}>
            <Card variant="success" padding="md">
              <View style={styles.mintedContent}>
                <View style={styles.mintedIconContainer}>
                  <CheckIcon size={32} color={Colors.success.default} />
                </View>
                <Animated.Text style={styles.mintedText}>{currentStage.name} NFT Minted</Animated.Text>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Next Stage Preview */}
        {nextStage && (
          <Animated.View entering={FadeInDown.delay(600)} style={styles.nextStageSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIndicator} />
              <Animated.Text style={styles.sectionTitle}>Next Up</Animated.Text>
            </View>

            <Card variant="default" padding="lg">
              <View style={styles.nextStageContent}>
                <View style={styles.nextStageIconContainer}>
                  <LinearGradient
                    colors={Gradients.stage[nextStage.id] || Gradients.primary.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.nextStageGradient}
                  />
                  {NextStageIcon && <NextStageIcon size={32} color={Colors.text.primary} />}
                </View>
                <View style={styles.nextStageInfo}>
                  <Animated.Text style={styles.nextStageName}>{nextStage.name}</Animated.Text>
                  <Animated.Text style={styles.nextStageDescription}>
                    {nextStage.description}
                  </Animated.Text>
                </View>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Final Stage */}
        {!nextStage && (
          <Animated.View entering={FadeInDown.delay(600)}>
            <Card variant="accent" padding="lg" withGlow>
              <View style={styles.finalStageContent}>
                <View style={styles.trophyContainer}>
                  <TrophyIcon size={56} color={Colors.warning.default} />
                </View>
                <Animated.Text style={styles.finalStageTitle}>Sigma Elite Achieved</Animated.Text>
                <Animated.Text style={styles.finalStageText}>
                  Peak performance. Ultimate grindset unlocked.
                </Animated.Text>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Actions */}
        <Animated.View entering={FadeInUp.delay(700)} style={styles.actionsSection}>
          {nextStage ? (
            <>
              <Button
                title={`Advance to ${nextStage.name}`}
                onPress={handleAdvance}
                variant="success"
                size="xl"
                icon={<GraduateIcon size={22} color={Colors.text.primary} />}
                disabled={!(alreadyMinted || hasMinted)}
              />
              {!(alreadyMinted || hasMinted) && (
                <Animated.Text style={styles.mintRequirementHint}>
                  Mint the NFT above to unlock advancement
                </Animated.Text>
              )}
            </>
          ) : null}

          <Button
            title="Stay at Current Stage"
            onPress={handleSkip}
            variant="secondary"
            size="lg"
          />
        </Animated.View>
      </ScrollView>

      {/* NFT Minted Success Modal */}
      <NftMintedModal
        visible={showMintedModal}
        onClose={() => setShowMintedModal(false)}
        stageName={currentStage.name}
        stageId={currentStage.id}
        mintAddress={mintedAddress}
        network={network}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  notReadyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  notReadyIconContainer: {
    width: 112,
    height: 112,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.warning.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  notReadyTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  notReadyText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
  },
  notReadyButton: {
    width: '100%',
    maxWidth: 220,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  celebrationIconContainer: {
    width: 88,
    height: 88,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.warning.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: Colors.warning.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
    }),
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  badgeSection: {
    alignItems: 'center',
  },
  mintSection: {
    gap: Spacing.md,
  },
  mintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mintIconContainer: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.base,
    backgroundColor: Colors.primary.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  mintTitleContainer: {
    flex: 1,
  },
  mintTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  mintSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  optionalText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  requiredText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.warning.default,
    textAlign: 'center',
  },
  mintRequirementHint: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: -Spacing.sm,
  },
  mintedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mintedIconContainer: {
    marginRight: Spacing.md,
  },
  mintedText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.success.light,
  },
  nextStageSection: {},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionIndicator: {
    width: 3,
    height: 16,
    backgroundColor: Colors.primary.default,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.accent,
  },
  nextStageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextStageIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  nextStageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  nextStageInfo: {
    flex: 1,
  },
  nextStageName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  nextStageDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
  finalStageContent: {
    alignItems: 'center',
  },
  trophyContainer: {
    marginBottom: Spacing.md,
  },
  finalStageTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.primary.light,
    marginBottom: Spacing.xs,
  },
  finalStageText: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  actionsSection: {
    gap: Spacing.md,
  },
})
