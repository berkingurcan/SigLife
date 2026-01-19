// NFT Minted Modal - Professional success modal with metadata display
// Features: NFT image, metadata, explorer link, share on X

import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'
import React, { useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Modal,
    Platform,
    Pressable,
    Share,
    StyleSheet,
    View,
} from 'react-native'
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated'

import { useCluster } from '@/components/cluster/cluster-provider'
import { Button } from '@/components/ui/button'
import {
    CheckIcon,
    ExternalLinkIcon,
    ImagePlaceholderIcon,
    MintIcon,
    StageIcons,
    XIcon,
} from '@/components/ui/icons'
import { BorderRadius, Colors, Gradients, Spacing, Typography } from '@/constants/design-system'
import { type StageId } from '@/constants/game-config'
import { getAssetById, type DASAsset } from '@/utils/das-api'
import { toUpperCase } from '@/utils/text'

interface NftMintedModalProps {
    visible: boolean
    onClose: () => void
    stageName: string
    stageId: StageId
    mintAddress?: string | null
    network?: 'devnet' | 'mainnet-beta'
}

interface NFTMetadataState {
    isLoading: boolean
    error: string | null
    data: DASAsset | null
    imageUrl: string | null
}

export function NftMintedModal({
    visible,
    onClose,
    stageName,
    stageId,
    mintAddress,
    network = 'devnet',
}: NftMintedModalProps) {
    const StageIcon = StageIcons[stageId]
    const gradientColors = Gradients.stage[stageId] || Gradients.primary.colors
    const { getExplorerUrl } = useCluster()

    const [metadata, setMetadata] = useState<NFTMetadataState>({
        isLoading: false,
        error: null,
        data: null,
        imageUrl: null,
    })

    // Fetch NFT metadata when modal opens and mint address is available
    useEffect(() => {
        if (visible && mintAddress) {
            fetchNFTMetadata()
        }
    }, [visible, mintAddress])

    const fetchNFTMetadata = useCallback(async () => {
        if (!mintAddress) return

        setMetadata((prev) => ({ ...prev, isLoading: true, error: null }))

        try {
            // Small delay to allow blockchain to index the NFT
            await new Promise((resolve) => setTimeout(resolve, 2000))

            const asset = await getAssetById(mintAddress, network)

            if (asset) {
                const imageUrl =
                    asset.content?.links?.image ||
                    asset.content?.metadata?.image ||
                    null

                setMetadata({
                    isLoading: false,
                    error: null,
                    data: asset,
                    imageUrl,
                })
            } else {
                setMetadata({
                    isLoading: false,
                    error: 'NFT metadata not found yet',
                    data: null,
                    imageUrl: null,
                })
            }
        } catch (error) {
            console.error('Failed to fetch NFT metadata:', error)
            setMetadata({
                isLoading: false,
                error: 'Failed to load NFT data',
                data: null,
                imageUrl: null,
            })
        }
    }, [mintAddress, network])

    const handleViewOnExplorer = useCallback(() => {
        if (!mintAddress) return

        const explorerUrl = getExplorerUrl(`address/${mintAddress}`)
        Linking.openURL(explorerUrl)
    }, [mintAddress, getExplorerUrl])

    const handleShareOnX = useCallback(async () => {
        const explorerUrl = mintAddress
            ? getExplorerUrl(`address/${mintAddress}`)
            : ''

        const nftName = metadata.data?.content?.metadata?.name || `${stageName} Badge`
        const shareText = `I just minted my "${nftName}" NFT on @SigLifeGame! 🎮✨\n\nGrinding to become a Sigma Elite on Solana!\n\n${explorerUrl ? `View on Explorer: ${explorerUrl}` : ''}\n\n#SigLife #Solana #NFT #Web3Gaming`

        // Try native share first for mobile
        if (Platform.OS !== 'web') {
            try {
                await Share.share({
                    message: shareText,
                })
                return
            } catch (error) {
                console.log('Native share cancelled or failed:', error)
            }
        }

        // Fallback to X web intent
        const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
        Linking.openURL(xIntentUrl)
    }, [mintAddress, stageName, metadata.data, getExplorerUrl])

    const handleRetryFetch = useCallback(() => {
        fetchNFTMetadata()
    }, [fetchNFTMetadata])

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
                        {/* Success icon with animation */}
                        <Animated.View entering={ZoomIn.delay(200).springify()} style={styles.successIconWrapper}>
                            <View style={styles.successIconOuter}>
                                <LinearGradient
                                    colors={[Colors.success.default, Colors.success.dark]}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.successIconInner}>
                                    <CheckIcon size={32} color={Colors.text.primary} />
                                </View>
                            </View>
                            <Animated.View style={styles.glowRing} />
                        </Animated.View>

                        {/* Title */}
                        <Animated.Text entering={FadeInDown.delay(300)} style={styles.title}>
                            NFT Minted!
                        </Animated.Text>

                        {/* NFT Preview Card */}
                        <Animated.View entering={FadeInDown.delay(400)} style={styles.nftPreviewCard}>
                            {/* NFT Image */}
                            <View style={styles.nftImageContainer}>
                                {metadata.isLoading ? (
                                    <View style={styles.imageLoadingContainer}>
                                        <ActivityIndicator size="small" color={Colors.primary.default} />
                                        <Animated.Text style={styles.imageLoadingText}>Loading NFT...</Animated.Text>
                                    </View>
                                ) : metadata.imageUrl ? (
                                    <Image
                                        source={{ uri: metadata.imageUrl }}
                                        style={styles.nftImage}
                                        contentFit="cover"
                                        transition={300}
                                    />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <LinearGradient
                                            colors={gradientColors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        {StageIcon ? (
                                            <StageIcon size={48} color={Colors.text.primary} />
                                        ) : (
                                            <ImagePlaceholderIcon size={48} color={Colors.text.primary} />
                                        )}
                                    </View>
                                )}
                            </View>

                            {/* NFT Info */}
                            <View style={styles.nftInfo}>
                                <View style={styles.nftNameRow}>
                                    <View style={styles.stageIconSmall}>
                                        <LinearGradient
                                            colors={gradientColors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        {StageIcon && <StageIcon size={16} color={Colors.text.primary} />}
                                    </View>
                                    <Animated.Text style={styles.nftName} numberOfLines={1}>
                                        {metadata.data?.content?.metadata?.name || `${stageName} Badge`}
                                    </Animated.Text>
                                </View>
                                <Animated.Text style={styles.nftCollection}>
                                    {toUpperCase('SigLife Collection')}
                                </Animated.Text>
                                {mintAddress && (
                                    <Animated.Text style={styles.mintAddressText} numberOfLines={1}>
                                        {`${mintAddress.slice(0, 8)}...${mintAddress.slice(-8)}`}
                                    </Animated.Text>
                                )}
                            </View>

                            {/* Retry button if fetch failed */}
                            {metadata.error && !metadata.isLoading && (
                                <Pressable onPress={handleRetryFetch} style={styles.retryButton}>
                                    <Animated.Text style={styles.retryText}>Tap to retry loading</Animated.Text>
                                </Pressable>
                            )}
                        </Animated.View>

                        {/* Blockchain indicator */}
                        <Animated.View entering={FadeIn.delay(500)} style={styles.blockchainBadge}>
                            <MintIcon size={14} color={Colors.primary.default} />
                            <Animated.Text style={styles.blockchainText}>
                                On-chain • Solana {network === 'devnet' ? 'Devnet' : 'Mainnet'}
                            </Animated.Text>
                        </Animated.View>

                        {/* Action Buttons */}
                        <Animated.View entering={FadeInDown.delay(600)} style={styles.actionButtons}>
                            {/* View on Explorer */}
                            {mintAddress && (
                                <Pressable
                                    onPress={handleViewOnExplorer}
                                    style={styles.actionButton}
                                >
                                    <View style={styles.actionButtonIcon}>
                                        <ExternalLinkIcon size={18} color={Colors.info.default} />
                                    </View>
                                    <Animated.Text style={styles.actionButtonText}>View on Explorer</Animated.Text>
                                </Pressable>
                            )}

                            {/* Share on X */}
                            <Pressable
                                onPress={handleShareOnX}
                                style={[styles.actionButton, styles.actionButtonX]}
                            >
                                <View style={[styles.actionButtonIcon, styles.actionButtonIconX]}>
                                    <XIcon size={16} color={Colors.text.primary} />
                                </View>
                                <Animated.Text style={[styles.actionButtonText, styles.actionButtonTextX]}>
                                    Share on X
                                </Animated.Text>
                            </Pressable>
                        </Animated.View>

                        {/* Continue button */}
                        <Animated.View entering={FadeInDown.delay(700)} style={styles.buttonContainer}>
                            <Button
                                title="Continue"
                                onPress={onClose}
                                variant="primary"
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
        borderColor: Colors.border.accent,
        backgroundColor: Colors.surface.elevated,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary.default,
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
    successIconWrapper: {
        position: 'relative',
        marginBottom: Spacing.md,
    },
    successIconOuter: {
        width: 64,
        height: 64,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    successIconInner: {
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
        borderColor: Colors.success.default,
        opacity: 0.3,
    },
    title: {
        fontSize: Typography.fontSize['2xl'],
        fontFamily: 'Inter-Bold',
        color: Colors.text.primary,
        marginBottom: Spacing.md,
    },
    nftPreviewCard: {
        width: '100%',
        backgroundColor: Colors.surface.default,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border.subtle,
        overflow: 'hidden',
        marginBottom: Spacing.md,
    },
    nftImageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: Colors.background.tertiary,
    },
    imageLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    imageLoadingText: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.text.tertiary,
    },
    nftImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nftInfo: {
        padding: Spacing.md,
        gap: Spacing.xs,
    },
    nftNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    stageIconSmall: {
        width: 24,
        height: 24,
        borderRadius: BorderRadius.xs,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    nftName: {
        flex: 1,
        fontSize: Typography.fontSize.md,
        fontFamily: 'Inter-SemiBold',
        color: Colors.text.primary,
    },
    nftCollection: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.text.tertiary,
        letterSpacing: Typography.letterSpacing.wide,
    },
    mintAddressText: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'SpaceMono',
        color: Colors.text.muted,
        marginTop: Spacing.xs,
    },
    retryButton: {
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border.subtle,
    },
    retryText: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.primary.default,
    },
    blockchainBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary.muted,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.md,
        gap: Spacing.xs,
    },
    blockchainText: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.primary.light,
    },
    actionButtons: {
        width: '100%',
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.info.muted,
        borderRadius: BorderRadius.base,
        borderWidth: 1,
        borderColor: Colors.info.default,
    },
    actionButtonX: {
        backgroundColor: Colors.surface.default,
        borderColor: Colors.border.default,
    },
    actionButtonIcon: {
        width: 28,
        height: 28,
        borderRadius: BorderRadius.sm,
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonIconX: {
        backgroundColor: Colors.text.primary,
    },
    actionButtonText: {
        fontSize: Typography.fontSize.sm,
        fontFamily: 'Inter-SemiBold',
        color: Colors.info.light,
    },
    actionButtonTextX: {
        color: Colors.text.primary,
    },
    buttonContainer: {
        width: '100%',
    },
})
