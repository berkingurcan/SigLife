// Game Storage - AsyncStorage helpers for persisting game state
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { GameState } from '@/constants/game-config'
import { createInitialGameState } from '@/constants/game-config'

const GAME_STATE_KEY = '@sigma_man_game_state'

/**
 * Save game state to AsyncStorage
 */
export async function saveGameState(state: GameState): Promise<void> {
  try {
    const jsonValue = JSON.stringify({
      ...state,
      updatedAt: Date.now(),
    })
    await AsyncStorage.setItem(GAME_STATE_KEY, jsonValue)
  } catch (error) {
    console.error('Failed to save game state:', error)
    throw error
  }
}

/**
 * Load game state from AsyncStorage
 * Returns null if no saved state exists
 */
export async function loadGameState(): Promise<GameState | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_STATE_KEY)
    if (jsonValue === null) return null
    return JSON.parse(jsonValue) as GameState
  } catch (error) {
    console.error('Failed to load game state:', error)
    return null
  }
}

/**
 * Load game state or create new one if none exists
 */
export async function loadOrCreateGameState(): Promise<GameState> {
  const existingState = await loadGameState()
  if (existingState) return existingState

  const newState = createInitialGameState()
  await saveGameState(newState)
  return newState
}

/**
 * Delete saved game state (for new game)
 */
export async function deleteGameState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GAME_STATE_KEY)
  } catch (error) {
    console.error('Failed to delete game state:', error)
    throw error
  }
}

/**
 * Check if a saved game exists
 */
export async function hasSavedGame(): Promise<boolean> {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_STATE_KEY)
    return jsonValue !== null
  } catch (error) {
    console.error('Failed to check saved game:', error)
    return false
  }
}
