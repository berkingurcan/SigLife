// Design System - Sigma Man: Professional UI/UX Constants
// Following 2025-2026 mobile game UI trends

import { Platform } from 'react-native'

// ============================================================================
// COLOR PALETTE - Enhanced Dark Sigma Theme
// ============================================================================
export const Colors = {
  // Backgrounds with depth
  background: {
    primary: '#0A0A0F',
    secondary: '#0E0E15',
    tertiary: '#12121A',
    elevated: '#16161F',
  },

  // Surface colors for cards and containers
  surface: {
    default: '#12121A',
    elevated: '#1A1A24',
    hover: '#1E1E2A',
    pressed: '#141420',
  },

  // Border colors with varying opacity
  border: {
    subtle: '#1E1E2E',
    default: '#2A2A3A',
    strong: '#3A3A4A',
    accent: 'rgba(139, 92, 246, 0.3)',
  },

  // Primary purple palette
  primary: {
    default: '#8B5CF6',
    light: '#A78BFA',
    lighter: '#C4B5FD',
    dark: '#7C3AED',
    darker: '#6D28D9',
    muted: 'rgba(139, 92, 246, 0.15)',
    glow: 'rgba(139, 92, 246, 0.4)',
  },

  // Semantic colors
  success: {
    default: '#10B981',
    light: '#34D399',
    dark: '#059669',
    muted: 'rgba(16, 185, 129, 0.15)',
  },

  danger: {
    default: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    muted: 'rgba(239, 68, 68, 0.15)',
  },

  warning: {
    default: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    muted: 'rgba(245, 158, 11, 0.15)',
  },

  info: {
    default: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    muted: 'rgba(59, 130, 246, 0.15)',
  },

  // Text hierarchy
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    tertiary: '#71717A',
    muted: '#52525B',
    accent: '#C4B5FD',
    inverse: '#0A0A0F',
  },

  // Stat colors (refined)
  stat: {
    money: '#10B981',
    fitness: '#EF4444',
    intelligence: '#3B82F6',
    charisma: '#EC4899',
    discipline: '#8B5CF6',
    investments: '#F59E0B',
  },

  // Glass effect overlay
  glass: {
    background: 'rgba(18, 18, 26, 0.8)',
    border: 'rgba(255, 255, 255, 0.08)',
    highlight: 'rgba(255, 255, 255, 0.05)',
  },
} as const

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export const Typography = {
  // Font families
  fontFamily: {
    regular: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter-Regular',
      default: 'Inter-Regular',
    }),
    medium: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter-Medium',
      default: 'Inter-Medium',
    }),
    semibold: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter-SemiBold',
      default: 'Inter-SemiBold',
    }),
    bold: Platform.select({
      ios: 'Inter-Bold',
      android: 'Inter-Bold',
      default: 'Inter-Bold',
    }),
    mono: 'SpaceMono',
  },

  // Font sizes - 8pt scale
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const

// ============================================================================
// SPACING - 4pt grid system
// ============================================================================
export const Spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const

// ============================================================================
// BORDER RADIUS
// ============================================================================
export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  base: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const

// ============================================================================
// SHADOWS - Layered shadow system
// ============================================================================
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  }),
  primaryGlow: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
} as const

// ============================================================================
// GRADIENTS - For LinearGradient components
// ============================================================================
export const Gradients = {
  // Primary gradient (purple)
  primary: {
    colors: ['#8B5CF6', '#7C3AED'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  primarySubtle: {
    colors: ['rgba(139, 92, 246, 0.2)', 'rgba(124, 58, 237, 0.1)'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Success gradient (green)
  success: {
    colors: ['#10B981', '#059669'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Danger gradient (red)
  danger: {
    colors: ['#EF4444', '#DC2626'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Surface gradient (subtle depth)
  surface: {
    colors: ['#16161F', '#12121A'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },

  // Card highlight (top edge glow)
  cardHighlight: {
    colors: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0)'],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 0.3 },
  },

  // Stage-specific gradients
  stage: {
    student: ['#3B82F6', '#2563EB'],
    intern: ['#F59E0B', '#D97706'],
    employee: ['#6366F1', '#4F46E5'],
    side_hustler: ['#8B5CF6', '#7C3AED'],
    entrepreneur: ['#EC4899', '#DB2777'],
    ceo: ['#14B8A6', '#0D9488'],
    investor: ['#F59E0B', '#D97706'],
    sigma_elite: ['#8B5CF6', '#6D28D9'],
  },
} as const

// ============================================================================
// ANIMATIONS
// ============================================================================
export const Animation = {
  // Duration in ms
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
  },

  // Spring configs for reanimated
  spring: {
    gentle: {
      damping: 20,
      stiffness: 100,
      mass: 1,
    },
    bouncy: {
      damping: 12,
      stiffness: 180,
      mass: 1,
    },
    stiff: {
      damping: 30,
      stiffness: 300,
      mass: 1,
    },
  },
} as const

// ============================================================================
// COMPONENT SIZES
// ============================================================================
export const ComponentSize = {
  button: {
    sm: { height: 36, paddingHorizontal: 12, fontSize: 13 },
    md: { height: 44, paddingHorizontal: 16, fontSize: 14 },
    lg: { height: 52, paddingHorizontal: 20, fontSize: 16 },
    xl: { height: 56, paddingHorizontal: 24, fontSize: 16 },
  },
  icon: {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 32,
  },
  avatar: {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  },
  progressBar: {
    sm: 6,
    md: 10,
    lg: 14,
  },
} as const

// ============================================================================
// TAB BAR
// ============================================================================
export const TabBar = {
  height: 64,
  iconSize: 24,
  labelSize: 11,
  margin: 16,
  borderRadius: 24,
  activeIndicatorSize: 48,
} as const
