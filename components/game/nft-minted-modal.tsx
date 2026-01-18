// NFT Minted Modal - Professional success modal for NFT minting
// Designed with 2025-2026 UI trends

import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated'

import { Button } from '@/components/ui/button'
import { CheckIcon, MintIcon, StageIcons } from '@/components/ui/icons'
import { BorderRadius, Colors, Gradients, Spacing, Typography } from '@/constants/design-system'
import { type StageId } from '@/constants/game-config'

interface NftMintedModalProps {
    visible: boolean
    onClose: () => void
    stageName: string
    stageId: StageId
}

export function NftMintedModal({ visible, onClose, stageName, stageId }: NftMintedModalProps) {
    const StageIcon = StageIcons[stageId]
    const gradientColors = Gradients.stage[stageId] || Gradients.primary.colors

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
                            {/* Glow ring */}
                            <Animated.View style={styles.glowRing} />
                        </Animated.View>

                        {/* Title */}
                        <Animated.Text entering={FadeInDown.delay(300)} style={styles.title}>
                            NFT Minted!
                        </Animated.Text>

                        {/* Stage badge */}
                        <Animated.View entering={FadeInDown.delay(400)} style={styles.stageBadge}>
                            <View style={styles.stageIconContainer}>
                                <LinearGradient
                                    colors={gradientColors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                {StageIcon && <StageIcon size={28} color={Colors.text.primary} />}
                            </View>
                            <View style={styles.stageInfo}>
                                <Animated.Text style={styles.stageLabel}>Achievement Unlocked</Animated.Text>
                                <Animated.Text style={styles.stageName}>{stageName}</Animated.Text>
                            </View>
                        </Animated.View>

                        {/* Description */}
                        <Animated.Text entering={FadeInDown.delay(500)} style={styles.description}>
                            Your achievement has been permanently recorded on the Solana blockchain. View it in your wallet!
                        </Animated.Text>

                        {/* Blockchain indicator */}
                        <Animated.View entering={FadeIn.delay(600)} style={styles.blockchainBadge}>
                            <MintIcon size={14} color={Colors.primary.default} />
                            <Animated.Text style={styles.blockchainText}>On-chain • Solana</Animated.Text>
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
        maxWidth: 340,
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
        marginBottom: Spacing.lg,
    },
    successIconOuter: {
        width: 72,
        height: 72,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    successIconInner: {
        width: 64,
        height: 64,
        borderRadius: BorderRadius.full,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowRing: {
        position: 'absolute',
        top: -8,
        left: -8,
        right: -8,
        bottom: -8,
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
    stageBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface.default,
        borderRadius: BorderRadius.base,
        borderWidth: 1,
        borderColor: Colors.border.subtle,
        padding: Spacing.md,
        width: '100%',
        marginBottom: Spacing.md,
    },
    stageIconContainer: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.base,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: Spacing.md,
    },
    stageInfo: {
        flex: 1,
    },
    stageLabel: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.success.default,
        textTransform: 'uppercase',
        letterSpacing: Typography.letterSpacing.wide,
    },
    stageName: {
        fontSize: Typography.fontSize.lg,
        fontFamily: 'Inter-Bold',
        color: Colors.text.primary,
        marginTop: Spacing.xs,
    },
    description: {
        fontSize: Typography.fontSize.sm,
        fontFamily: 'Inter-Regular',
        color: Colors.text.secondary,
        textAlign: 'center',
        lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
        marginBottom: Spacing.md,
    },
    blockchainBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary.muted,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.lg,
        gap: Spacing.xs,
    },
    blockchainText: {
        fontSize: Typography.fontSize.xs,
        fontFamily: 'Inter-Medium',
        color: Colors.primary.light,
    },
    buttonContainer: {
        width: '100%',
    },
})
