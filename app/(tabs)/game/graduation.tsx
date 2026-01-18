// Graduation Screen - Stage completion and NFT minting
import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import { AppText } from '@/components/app-text'
import { GameButton } from '@/components/game/game-action-buttons'
import { GameStageBadge } from '@/components/game/game-stage-badge'
import { useGame } from '@/components/game/game-provider'
import { useMintStageNFT } from '@/components/game/use-mint-stage-nft'
import { GameColors, getStageById, getNextStage, MINT_FEE_SOL } from '@/constants/game-config'

export default function GraduationScreen() {
  const router = useRouter()
  const { account } = useMobileWallet()
  const { gameState, canGraduate, advanceStage, recordMint } = useGame()
  const [hasMinted, setHasMinted] = useState(false)

  const mintMutation = useMintStageNFT({
    address: account?.publicKey ?? null!,
  })

  if (!gameState) {
    return (
      <View style={styles.container}>
        <AppText style={styles.errorText}>Loading...</AppText>
      </View>
    )
  }

  const currentStage = getStageById(gameState.currentStage)
  const nextStage = getNextStage(gameState.currentStage)
  const alreadyMinted = gameState.mintedStages.includes(gameState.currentStage)

  const handleMintNFT = async () => {
    if (!account?.publicKey) {
      Alert.alert('Error', 'Please connect your wallet first.')
      return
    }

    try {
      const result = await mintMutation.mutateAsync({
        stageId: gameState.currentStage,
      })

      if (result) {
        await recordMint(gameState.currentStage)
        setHasMinted(true)
        Alert.alert('Success!', `You've minted your ${currentStage.name} achievement NFT!`, [{ text: 'Awesome!' }])
      }
    } catch (error) {
      Alert.alert('Mint Failed', 'Failed to mint NFT. Please check your wallet balance and try again.')
    }
  }

  const handleAdvance = async () => {
    await advanceStage()
    router.back()
  }

  const handleSkip = () => {
    router.back()
  }

  if (!canGraduate && !alreadyMinted) {
    return (
      <View style={styles.container}>
        <View style={styles.notReadyContainer}>
          <AppText style={styles.notReadyEmoji}>🎯</AppText>
          <AppText style={styles.notReadyTitle}>Not Ready Yet</AppText>
          <AppText style={styles.notReadyText}>
            Keep grinding! You haven't met the requirements for the next stage.
          </AppText>
          <GameButton title="Back to Game" onPress={() => router.back()} variant="secondary" />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Celebration Header */}
      <View style={styles.header}>
        <AppText style={styles.celebrationEmoji}>🎉</AppText>
        <AppText style={styles.title}>Congratulations!</AppText>
        <AppText style={styles.subtitle}>You've completed the {currentStage.name} stage</AppText>
      </View>

      {/* Current Stage Badge */}
      <View style={styles.badgeSection}>
        <GameStageBadge stageId={currentStage.id} size="large" />
      </View>

      {/* NFT Minting Section */}
      {!alreadyMinted && !hasMinted && (
        <View style={styles.mintSection}>
          <AppText style={styles.mintTitle}>Mint Your Achievement</AppText>
          <AppText style={styles.mintDescription}>
            Commemorate your {currentStage.name} achievement on the Solana blockchain.
          </AppText>
          <View style={styles.feeContainer}>
            <AppText style={styles.feeLabel}>Mint Fee:</AppText>
            <AppText style={styles.feeValue}>{MINT_FEE_SOL} SOL</AppText>
          </View>
          <GameButton
            title={`Mint ${currentStage.name} NFT`}
            icon="💎"
            onPress={handleMintNFT}
            variant="primary"
            loading={mintMutation.isPending}
            disabled={mintMutation.isPending}
          />
          <AppText style={styles.optionalText}>Minting is optional - you can still advance without it.</AppText>
        </View>
      )}

      {/* Already Minted */}
      {(alreadyMinted || hasMinted) && (
        <View style={styles.mintedSection}>
          <AppText style={styles.mintedEmoji}>✅</AppText>
          <AppText style={styles.mintedText}>{currentStage.name} NFT Minted!</AppText>
        </View>
      )}

      {/* Next Stage Preview */}
      {nextStage && (
        <View style={styles.nextStageSection}>
          <AppText style={styles.nextStageTitle}>Next Up</AppText>
          <View style={styles.nextStageCard}>
            <AppText style={styles.nextStageEmoji}>{nextStage.emoji}</AppText>
            <AppText style={styles.nextStageName}>{nextStage.name}</AppText>
            <AppText style={styles.nextStageDescription}>{nextStage.description}</AppText>
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsSection}>
        {nextStage ? (
          <GameButton title={`Advance to ${nextStage.name}`} icon="🚀" onPress={handleAdvance} variant="success" />
        ) : (
          <View style={styles.finalStageContainer}>
            <AppText style={styles.finalStageEmoji}>🏆</AppText>
            <AppText style={styles.finalStageText}>You've reached Sigma Elite! The ultimate grindset achieved.</AppText>
          </View>
        )}
        <GameButton title="Stay at Current Stage" onPress={handleSkip} variant="secondary" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GameColors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  errorText: {
    color: GameColors.danger,
    textAlign: 'center',
    marginTop: 40,
  },
  notReadyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  notReadyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  notReadyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginBottom: 8,
  },
  notReadyText: {
    fontSize: 16,
    color: GameColors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  celebrationEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: GameColors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: GameColors.textSecondary,
    marginTop: 8,
  },
  badgeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mintSection: {
    backgroundColor: GameColors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: GameColors.primary,
  },
  mintTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginBottom: 8,
  },
  mintDescription: {
    fontSize: 14,
    color: GameColors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GameColors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  feeLabel: {
    fontSize: 14,
    color: GameColors.textSecondary,
  },
  feeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: GameColors.primary,
  },
  optionalText: {
    fontSize: 12,
    color: GameColors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
  mintedSection: {
    alignItems: 'center',
    backgroundColor: GameColors.success + '20',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  mintedEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  mintedText: {
    fontSize: 16,
    fontWeight: '600',
    color: GameColors.success,
  },
  nextStageSection: {
    marginBottom: 24,
  },
  nextStageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: GameColors.textAccent,
    marginBottom: 12,
  },
  nextStageCard: {
    backgroundColor: GameColors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GameColors.border,
  },
  nextStageEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  nextStageName: {
    fontSize: 18,
    fontWeight: '700',
    color: GameColors.textPrimary,
    marginBottom: 4,
  },
  nextStageDescription: {
    fontSize: 14,
    color: GameColors.textSecondary,
    textAlign: 'center',
  },
  actionsSection: {
    gap: 12,
  },
  finalStageContainer: {
    alignItems: 'center',
    backgroundColor: GameColors.primary + '20',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  finalStageEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  finalStageText: {
    fontSize: 16,
    fontWeight: '600',
    color: GameColors.primary,
    textAlign: 'center',
  },
})
