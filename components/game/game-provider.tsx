// Game Provider - State management for Sigma Man game
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import type { GameState, StageId, Stats, HistoryEntry, GameEvent, EventChoice } from '@/constants/game-config'
import {
  createInitialGameState,
  applyStatChanges,
  canAdvanceToNextStage,
  getNextStage,
  getStageById,
} from '@/constants/game-config'
import { getRandomEvent } from '@/constants/game-events'
import { saveGameState, loadOrCreateGameState, deleteGameState } from '@/utils/game-storage'

// ============================================================================
// TYPES
// ============================================================================
export interface GameContextValue {
  // State
  gameState: GameState | null
  isLoading: boolean
  currentEvent: GameEvent | null
  canGraduate: boolean

  // Actions
  startNewGame: () => Promise<void>
  triggerRandomEvent: () => void
  makeChoice: (choice: EventChoice) => Promise<void>
  dismissEvent: () => void
  advanceStage: () => Promise<void>
  recordMint: (stageId: StageId) => Promise<void>
  resetGame: () => Promise<void>
}

// ============================================================================
// CONTEXT
// ============================================================================
const GameContext = createContext<GameContextValue | null>(null)

// ============================================================================
// PROVIDER
// ============================================================================
export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null)

  // Load game state on mount
  useEffect(() => {
    loadOrCreateGameState()
      .then((state) => {
        setGameState(state)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load game state:', error)
        setIsLoading(false)
      })
  }, [])

  // Auto-save when game state changes
  useEffect(() => {
    if (gameState && !isLoading) {
      saveGameState(gameState).catch((error) => {
        console.error('Failed to save game state:', error)
      })
    }
  }, [gameState, isLoading])

  // Check if player can graduate to next stage
  const canGraduate = useMemo(() => {
    if (!gameState) return false
    return canAdvanceToNextStage(gameState.stats, gameState.currentStage)
  }, [gameState])

  // Start a new game
  const startNewGame = useCallback(async () => {
    const newState = createInitialGameState()
    setGameState(newState)
    setCurrentEvent(null)
    await saveGameState(newState)
  }, [])

  // Trigger a random event for the current stage
  const triggerRandomEvent = useCallback(() => {
    if (!gameState) return
    const event = getRandomEvent(gameState.currentStage)
    setCurrentEvent(event)
  }, [gameState])

  // Make a choice in the current event
  const makeChoice = useCallback(
    async (choice: EventChoice) => {
      if (!gameState || !currentEvent) return

      const newStats = applyStatChanges(gameState.stats, choice.effects)

      const historyEntry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: 'event',
        title: currentEvent.title,
        description: choice.outcome,
        statChanges: choice.effects,
      }

      const newState: GameState = {
        ...gameState,
        stats: newStats,
        history: [...gameState.history, historyEntry],
        updatedAt: Date.now(),
      }

      setGameState(newState)
      setCurrentEvent(null)
    },
    [gameState, currentEvent],
  )

  // Dismiss current event without making a choice
  const dismissEvent = useCallback(() => {
    setCurrentEvent(null)
  }, [])

  // Advance to the next stage
  const advanceStage = useCallback(async () => {
    if (!gameState) return

    const nextStage = getNextStage(gameState.currentStage)
    if (!nextStage) return

    const currentStageName = getStageById(gameState.currentStage).name

    const historyEntry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type: 'graduation',
      title: `Graduated from ${currentStageName}`,
      description: `Advanced to ${nextStage.name}!`,
    }

    const newState: GameState = {
      ...gameState,
      currentStage: nextStage.id,
      history: [...gameState.history, historyEntry],
      updatedAt: Date.now(),
    }

    setGameState(newState)
  }, [gameState])

  // Record that a stage NFT was minted
  const recordMint = useCallback(
    async (stageId: StageId) => {
      if (!gameState) return

      const stage = getStageById(stageId)

      const historyEntry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: 'mint',
        title: `Minted ${stage.name} NFT`,
        description: `Commemorated your ${stage.name} achievement on-chain.`,
      }

      const newState: GameState = {
        ...gameState,
        mintedStages: [...gameState.mintedStages, stageId],
        totalMinted: gameState.totalMinted + 1,
        history: [...gameState.history, historyEntry],
        updatedAt: Date.now(),
      }

      setGameState(newState)
    },
    [gameState],
  )

  // Reset game (delete saved state and start fresh)
  const resetGame = useCallback(async () => {
    await deleteGameState()
    await startNewGame()
  }, [startNewGame])

  const value: GameContextValue = useMemo(
    () => ({
      gameState,
      isLoading,
      currentEvent,
      canGraduate,
      startNewGame,
      triggerRandomEvent,
      makeChoice,
      dismissEvent,
      advanceStage,
      recordMint,
      resetGame,
    }),
    [
      gameState,
      isLoading,
      currentEvent,
      canGraduate,
      startNewGame,
      triggerRandomEvent,
      makeChoice,
      dismissEvent,
      advanceStage,
      recordMint,
      resetGame,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// ============================================================================
// HOOK
// ============================================================================
export function useGame(): GameContextValue {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
