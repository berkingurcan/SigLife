// Event Screen - Life decision modal
import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { AppText } from '@/components/app-text'
import { GameButton } from '@/components/game/game-action-buttons'
import { useGame } from '@/components/game/game-provider'
import { GameColors, type EventChoice } from '@/constants/game-config'

export default function EventScreen() {
  const router = useRouter()
  const { currentEvent, makeChoice, dismissEvent } = useGame()

  if (!currentEvent) {
    return (
      <View style={styles.container}>
        <View style={styles.noEventContainer}>
          <AppText style={styles.noEventEmoji}>🎲</AppText>
          <AppText style={styles.noEventText}>No event available</AppText>
          <GameButton title="Go Back" onPress={() => router.back()} variant="secondary" />
        </View>
      </View>
    )
  }

  const handleChoice = async (choice: EventChoice) => {
    await makeChoice(choice)
    router.back()
  }

  const handleSkip = () => {
    dismissEvent()
    router.back()
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Event Header */}
      <View style={styles.header}>
        <AppText style={styles.title}>{currentEvent.title}</AppText>
        <AppText style={styles.description}>{currentEvent.description}</AppText>
      </View>

      {/* Choices */}
      <View style={styles.choicesContainer}>
        <AppText style={styles.choicesTitle}>What do you do?</AppText>
        {currentEvent.choices.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            style={styles.choiceCard}
            onPress={() => handleChoice(choice)}
            activeOpacity={0.8}
          >
            <AppText style={styles.choiceText}>{choice.text}</AppText>
            <View style={styles.effectsRow}>
              {Object.entries(choice.effects).map(([stat, value]) => (
                <View
                  key={stat}
                  style={[
                    styles.effectBadge,
                    {
                      backgroundColor: value > 0 ? GameColors.success + '30' : GameColors.danger + '30',
                    },
                  ]}
                >
                  <AppText style={[styles.effectText, { color: value > 0 ? GameColors.success : GameColors.danger }]}>
                    {stat}: {value > 0 ? '+' : ''}
                    {value}
                  </AppText>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Skip Button */}
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <AppText style={styles.skipText}>Skip this event</AppText>
        </TouchableOpacity>
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
  },
  noEventContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noEventEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  noEventText: {
    fontSize: 18,
    color: GameColors.textSecondary,
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: GameColors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: GameColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  choicesContainer: {
    gap: 12,
  },
  choicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: GameColors.textAccent,
    marginBottom: 8,
  },
  choiceCard: {
    backgroundColor: GameColors.surface,
    borderWidth: 1,
    borderColor: GameColors.border,
    borderRadius: 12,
    padding: 16,
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '600',
    color: GameColors.textPrimary,
    marginBottom: 12,
  },
  effectsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  effectBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  effectText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  skipContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  skipButton: {
    padding: 12,
  },
  skipText: {
    fontSize: 14,
    color: GameColors.textSecondary,
  },
})
