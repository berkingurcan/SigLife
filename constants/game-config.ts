// Game Configuration - Sigma Man: BitLife-Style Simulation Game

// ============================================================================
// TREASURY CONFIGURATION
// ============================================================================
export const TREASURY_WALLET = 'CbKsPJZXVbMv2z4meUFWdVmih7zYjcQbLYB2j64pkTVY'

// ============================================================================
// COLOR PALETTE - Dark Sigma Theme
// ============================================================================
export const GameColors = {
  // Backgrounds
  background: '#0A0A0F',
  surface: '#12121A',
  border: '#1E1E2E',

  // Primary
  primary: '#8B5CF6',
  primaryHover: '#7C3AED',

  // Feedback
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textAccent: '#C4B5FD',

  // Stat Colors
  statMoney: '#10B981',
  statFitness: '#EF4444',
  statIntelligence: '#3B82F6',
  statCharisma: '#EC4899',
  statDiscipline: '#8B5CF6',
  statInvestments: '#F59E0B',
} as const

// ============================================================================
// TYPES
// ============================================================================
export type StageId =
  | 'student'
  | 'intern'
  | 'employee'
  | 'side_hustler'
  | 'entrepreneur'
  | 'ceo'
  | 'investor'
  | 'sigma_elite'

export type StatId = 'money' | 'fitness' | 'intelligence' | 'charisma' | 'discipline' | 'investments'

export interface Stats {
  money: number
  fitness: number
  intelligence: number
  charisma: number
  discipline: number
  investments: number
}

export interface StageRequirements {
  money?: number
  fitness?: number
  intelligence?: number
  charisma?: number
  discipline?: number
  investments?: number
}

export interface Stage {
  id: StageId
  name: string
  description: string
  emoji: string // Kept for backward compatibility
  icon: StageId // Maps to icon component
  index: number
  requirements: StageRequirements
}

export interface EventChoice {
  id: string
  text: string
  effects: Partial<Stats>
  outcome: string
}

export interface GameEvent {
  id: string
  stage: StageId
  title: string
  description: string
  choices: EventChoice[]
}

export interface HistoryEntry {
  id: string
  timestamp: number
  type: 'event' | 'graduation' | 'mint'
  title: string
  description: string
  statChanges?: Partial<Stats>
}

export interface GameState {
  currentStage: StageId
  stats: Stats
  history: HistoryEntry[]
  mintedStages: StageId[]
  totalMinted: number
  createdAt: number
  updatedAt: number
}

// ============================================================================
// STAT CONFIGURATION
// ============================================================================
export interface StatConfig {
  id: StatId
  name: string
  emoji: string // Kept for backward compatibility
  icon: StatId // Maps to icon component
  color: string
}

export const STAT_CONFIGS: StatConfig[] = [
  { id: 'money', name: 'Money', emoji: '', icon: 'money', color: GameColors.statMoney },
  { id: 'fitness', name: 'Fitness', emoji: '', icon: 'fitness', color: GameColors.statFitness },
  { id: 'intelligence', name: 'Intelligence', emoji: '', icon: 'intelligence', color: GameColors.statIntelligence },
  { id: 'charisma', name: 'Charisma', emoji: '', icon: 'charisma', color: GameColors.statCharisma },
  { id: 'discipline', name: 'Discipline', emoji: '', icon: 'discipline', color: GameColors.statDiscipline },
  { id: 'investments', name: 'Investments', emoji: '', icon: 'investments', color: GameColors.statInvestments },
]

// ============================================================================
// INITIAL STATS
// ============================================================================
export const INITIAL_STATS: Stats = {
  money: 10,
  fitness: 20,
  intelligence: 15,
  charisma: 15,
  discipline: 10,
  investments: 0,
}

// ============================================================================
// STAGE DEFINITIONS
// ============================================================================
export const STAGES: Stage[] = [
  {
    id: 'student',
    name: 'Student',
    description: 'Just starting your journey. Time to grind.',
    emoji: '',
    icon: 'student',
    index: 0,
    requirements: {},
  },
  {
    id: 'intern',
    name: 'Intern',
    description: 'First taste of the corporate world.',
    emoji: '',
    icon: 'intern',
    index: 1,
    requirements: {
      intelligence: 30,
      discipline: 25,
    },
  },
  {
    id: 'employee',
    name: 'Employee',
    description: 'Climbing the corporate ladder.',
    emoji: '',
    icon: 'employee',
    index: 2,
    requirements: {
      money: 20,
      intelligence: 40,
      discipline: 35,
      charisma: 25,
    },
  },
  {
    id: 'side_hustler',
    name: 'Side Hustler',
    description: 'Building something on the side.',
    emoji: '',
    icon: 'side_hustler',
    index: 3,
    requirements: {
      money: 35,
      intelligence: 50,
      discipline: 45,
      charisma: 35,
    },
  },
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    description: 'Taking the leap into full-time founder mode.',
    emoji: '',
    icon: 'entrepreneur',
    index: 4,
    requirements: {
      money: 50,
      intelligence: 60,
      discipline: 55,
      charisma: 50,
      investments: 20,
    },
  },
  {
    id: 'ceo',
    name: 'CEO',
    description: 'Leading your empire.',
    emoji: '',
    icon: 'ceo',
    index: 5,
    requirements: {
      money: 65,
      intelligence: 70,
      discipline: 65,
      charisma: 65,
      investments: 40,
    },
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'Your money works harder than you.',
    emoji: '',
    icon: 'investor',
    index: 6,
    requirements: {
      money: 80,
      intelligence: 75,
      discipline: 70,
      investments: 60,
    },
  },
  {
    id: 'sigma_elite',
    name: 'Sigma Elite',
    description: 'Peak performance. Ultimate grindset achieved.',
    emoji: '',
    icon: 'sigma_elite',
    index: 7,
    requirements: {
      money: 90,
      fitness: 70,
      intelligence: 85,
      charisma: 80,
      discipline: 85,
      investments: 80,
    },
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
export function getStageById(id: StageId): Stage {
  const stage = STAGES.find((s) => s.id === id)
  if (!stage) throw new Error(`Stage not found: ${id}`)
  return stage
}

export function getNextStage(currentStageId: StageId): Stage | null {
  const currentStage = getStageById(currentStageId)
  const nextIndex = currentStage.index + 1
  return STAGES.find((s) => s.index === nextIndex) ?? null
}

export function checkStageRequirements(stats: Stats, stage: Stage): boolean {
  const { requirements } = stage
  if (requirements.money !== undefined && stats.money < requirements.money) return false
  if (requirements.fitness !== undefined && stats.fitness < requirements.fitness) return false
  if (requirements.intelligence !== undefined && stats.intelligence < requirements.intelligence) return false
  if (requirements.charisma !== undefined && stats.charisma < requirements.charisma) return false
  if (requirements.discipline !== undefined && stats.discipline < requirements.discipline) return false
  if (requirements.investments !== undefined && stats.investments < requirements.investments) return false
  return true
}

export function canAdvanceToNextStage(stats: Stats, currentStageId: StageId): boolean {
  const nextStage = getNextStage(currentStageId)
  if (!nextStage) return false
  return checkStageRequirements(stats, nextStage)
}

export function getStatColor(statId: StatId): string {
  const config = STAT_CONFIGS.find((s) => s.id === statId)
  return config?.color ?? GameColors.textPrimary
}

export function clampStat(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function applyStatChanges(stats: Stats, changes: Partial<Stats>): Stats {
  return {
    money: clampStat(stats.money + (changes.money ?? 0)),
    fitness: clampStat(stats.fitness + (changes.fitness ?? 0)),
    intelligence: clampStat(stats.intelligence + (changes.intelligence ?? 0)),
    charisma: clampStat(stats.charisma + (changes.charisma ?? 0)),
    discipline: clampStat(stats.discipline + (changes.discipline ?? 0)),
    investments: clampStat(stats.investments + (changes.investments ?? 0)),
  }
}

export function createInitialGameState(): GameState {
  const now = Date.now()
  return {
    currentStage: 'student',
    stats: { ...INITIAL_STATS },
    history: [],
    mintedStages: [],
    totalMinted: 0,
    createdAt: now,
    updatedAt: now,
  }
}
