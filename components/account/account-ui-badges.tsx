// Account UI Badges - Display minted NFT badges
import { PublicKey } from '@solana/web3.js'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'

import { Card } from '@/components/ui/card'
import { StageIcons, TrophyIcon } from '@/components/ui/icons'
import { BorderRadius, Colors, Gradients, Spacing, Typography } from '@/constants/design-system'
import { useFetchNFTs, type SigLifeBadge } from '@/hooks/use-fetch-nfts'

interface AccountUiBadgesProps {
    address: PublicKey
}

export function AccountUiBadges({ address }: AccountUiBadgesProps) {
    const { badges, isLoading } = useFetchNFTs({ address })

    if (isLoading) {
        return (
            <Card variant="default" padding="md" style={styles.loadingCard}>
                <Animated.Text style={styles.loadingText}>Loading badges...</Animated.Text>
            </Card>
        )
    }

    if (badges.length === 0) {
        return (
            <Card variant="default" padding="lg">
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                        <TrophyIcon size={32} color={Colors.text.tertiary} />
                    </View>
                    <Animated.Text style={styles.emptyTitle}>No Badges Yet</Animated.Text>
                    <Animated.Text style={styles.emptyText}>
                        Complete stages in the game to earn NFT badges.
                    </Animated.Text>
                </View>
            </Card>
        )
    }

    const handleBadgePress = (badge: SigLifeBadge) => {
        // Open in Solscan for NFTs
        const explorerUrl = `https://solscan.io/token/${badge.assetId}?cluster=devnet`
        Linking.openURL(explorerUrl)
    }

    return (
        <View style={styles.container}>
            {badges.map((badge, index) => (
                <BadgeItem
                    key={badge.assetId}
                    badge={badge}
                    index={index}
                    onPress={() => handleBadgePress(badge)}
                />
            ))}
        </View>
    )
}

function BadgeItem({ badge, index, onPress }: { badge: SigLifeBadge, index: number, onPress: () => void }) {
    const stageId = badge.stageId
    const IconComponent = stageId ? StageIcons[stageId] : TrophyIcon
    const gradientColors = stageId && Gradients.stage[stageId] ? Gradients.stage[stageId] : Gradients.primary.colors

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).springify()}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                <Card variant="default" padding="sm" style={styles.badgeCard}>
                    <View style={styles.badgeContent}>
                        {/* Badge Icon/Image */}
                        <View style={styles.badgeImageContainer}>
                            <LinearGradient
                                colors={gradientColors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.badgeGradient}
                            />
                            {/* Prioritize showing the actual NFT image if available (and safe), otherwise usage stage icon */}
                            {/* For now, using the Stage Icon as it looks cleaner in the UI list */}
                            <IconComponent size={24} color={Colors.text.primary} />
                        </View>

                        {/* Helper Badge Info */}
                        <View style={styles.badgeInfo}>
                            <Animated.Text style={styles.badgeName} numberOfLines={1}>
                                {badge.name}
                            </Animated.Text>
                            <Animated.Text style={styles.badgeType}>
                                NFT Badge
                            </Animated.Text>
                        </View>

                        {/* Verify Link Icon (visual cue) */}
                        <View style={styles.linkIcon}>
                            <Animated.Text style={styles.arrow}>→</Animated.Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.sm,
    },
    loadingCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
    },
    loadingText: {
        fontFamily: 'Inter-Medium',
        color: Colors.text.secondary,
        fontSize: Typography.fontSize.sm,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: Spacing.md,
    },
    emptyIconContainer: {
        width: 64,
        height: 64,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    emptyTitle: {
        fontSize: Typography.fontSize.md,
        fontFamily: 'Inter-SemiBold',
        color: Colors.text.secondary,
        marginBottom: Spacing.xs,
    },
    emptyText: {
        fontSize: Typography.fontSize.sm,
        fontFamily: 'Inter-Regular',
        color: Colors.text.tertiary,
        textAlign: 'center',
        maxWidth: 200,
    },
    badgeCard: {
        backgroundColor: Colors.surface.elevated,
    },
    badgeContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeImageContainer: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.base,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
        overflow: 'hidden',
        position: 'relative',
    },
    badgeGradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.8,
    },
    badgeInfo: {
        flex: 1,
    },
    badgeName: {
        fontSize: Typography.fontSize.sm,
        fontFamily: 'Inter-SemiBold',
        color: Colors.text.primary,
        marginBottom: 2,
    },
    badgeType: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.text.tertiary,
    },
    linkIcon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background.secondary,
        borderRadius: BorderRadius.full,
    },
    arrow: {
        color: Colors.text.secondary,
        fontSize: 12,
        marginTop: -2,
    },
})
