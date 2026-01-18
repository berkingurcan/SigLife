// Event Screen - Life decision modal
// Redesigned with modern 2025-2026 UI/UX trends

import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useGame } from '@/components/game/game-provider'
import { type EventChoice } from '@/constants/game-config'
import { Colors, Spacing, BorderRadius, Typography, TabBar } from '@/constants/design-system'
import { PlayIcon, SkipIcon, ArrowUpIcon, ArrowDownIcon, StatIcons } from '@/components/ui/icons'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export default function EventScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { currentEvent, makeChoice, dismissEvent } = useGame()

  if (!currentEvent) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={[Colors.background.secondary, Colors.background.primary]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.noEventContainer}>
          <Animated.View entering={FadeIn}>
            <View style={styles.noEventIconContainer}>
              <PlayIcon size={48} color={Colors.text.tertiary} />
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(100)} style={styles.noEventText}>
            No event available
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(200)} style={styles.noEventButton}>
            <Button title="Go Back" onPress={() => router.back()} variant="secondary" size="lg" />
          </Animated.View>
        </View>
      </View>
    )
  }

  const handleChoice = async (choice: EventChoice) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    await makeChoice(choice)
    router.back()
  }

  const handleSkip = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    dismissEvent()
    router.back()
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
      >
        {/* Event Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.eventBadge}>
            <Animated.Text style={styles.eventBadgeText}>Life Event</Animated.Text>
          </View>
          <Animated.Text entering={FadeInDown.delay(200)} style={styles.title}>
            {currentEvent.title}
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(300)} style={styles.description}>
            {currentEvent.description}
          </Animated.Text>
        </Animated.View>

        {/* Choices Section */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.choicesSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Animated.Text style={styles.sectionTitle}>What do you do?</Animated.Text>
          </View>

          <View style={styles.choicesContainer}>
            {currentEvent.choices.map((choice, index) => (
              <AnimatedTouchable
                key={choice.id}
                entering={SlideInRight.delay(500 + index * 100)}
                onPress={() => handleChoice(choice)}
                activeOpacity={0.8}
                style={styles.choiceCardWrapper}
              >
                <Card variant="elevated" padding="md" style={styles.choiceCard}>
                  <Animated.Text style={styles.choiceText}>{choice.text}</Animated.Text>

                  {/* Effects preview */}
                  <View style={styles.effectsContainer}>
                    {Object.entries(choice.effects).map(([stat, value]) => {
                      const statKey = stat as keyof typeof StatIcons
                      const IconComponent = StatIcons[statKey]
                      const isPositive = value > 0
                      const effectColor = isPositive ? Colors.success.default : Colors.danger.default
                      const bgColor = isPositive ? Colors.success.muted : Colors.danger.muted

                      return (
                        <View key={stat} style={[styles.effectBadge, { backgroundColor: bgColor }]}>
                          {IconComponent && <IconComponent size={14} color={effectColor} />}
                          <Animated.Text style={[styles.effectText, { color: effectColor }]}>
                            {isPositive ? '+' : ''}{value}
                          </Animated.Text>
                        </View>
                      )
                    })}
                  </View>

                  {/* Arrow indicator */}
                  <View style={styles.choiceArrow}>
                    <View style={styles.arrowCircle}>
                      <ArrowUpIcon size={14} color={Colors.primary.default} />
                    </View>
                  </View>
                </Card>
              </AnimatedTouchable>
            ))}
          </View>
        </Animated.View>

        {/* Skip Button */}
        <Animated.View entering={FadeInUp.delay(800)} style={styles.skipContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton} activeOpacity={0.7}>
            <SkipIcon size={18} color={Colors.text.tertiary} />
            <Animated.Text style={styles.skipText}>Skip this event</Animated.Text>
          </TouchableOpacity>
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
  },
  noEventContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  noEventIconContainer: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface.default,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  noEventText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
  noEventButton: {
    width: '100%',
    maxWidth: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  eventBadge: {
    backgroundColor: Colors.primary.muted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  eventBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary.light,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wider,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.tight,
  },
  description: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
    maxWidth: 320,
  },
  choicesSection: {
    marginBottom: Spacing.lg,
  },
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
  choicesContainer: {
    gap: Spacing.md,
  },
  choiceCardWrapper: {
    width: '100%',
  },
  choiceCard: {
    position: 'relative',
  },
  choiceText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    paddingRight: Spacing['2xl'],
    lineHeight: Typography.fontSize.md * Typography.lineHeight.normal,
  },
  effectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  effectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  effectText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
  },
  choiceArrow: {
    position: 'absolute',
    right: Spacing.md,
    top: '50%',
    marginTop: -14,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.muted,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  skipContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  skipText: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Medium',
    color: Colors.text.tertiary,
  },
})
