// SVG Icons Library - Abstract icons to replace emojis
// Professional, minimal icon design following 2025-2026 UI trends

import React from 'react'
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg'
import { Colors } from '@/constants/design-system'

interface IconProps {
  size?: number
  color?: string
  secondaryColor?: string
}

// ============================================================================
// STAT ICONS
// ============================================================================

export function MoneyIcon({ size = 24, color = Colors.stat.money }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <Path
        d="M12 6V18M15 9.5C15 8.12 13.66 7 12 7C10.34 7 9 8.12 9 9.5S10.34 12 12 12C13.66 12 15 13.12 15 14.5S13.66 17 12 17C10.34 17 9 15.88 9 14.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function FitnessIcon({ size = 24, color = Colors.stat.fitness }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
    </Svg>
  )
}

export function IntelligenceIcon({ size = 24, color = Colors.stat.intelligence }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <Path d="M9 21h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M10 17v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M14 17v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  )
}

export function CharismaIcon({ size = 24, color = Colors.stat.charisma }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
    </Svg>
  )
}

export function DisciplineIcon({ size = 24, color = Colors.stat.discipline }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
    </Svg>
  )
}

export function InvestmentsIcon({ size = 24, color = Colors.stat.investments }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 21L3 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M8 21L8 11" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M13 21L13 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M18 21L18 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M21 3L18 6L15 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

// ============================================================================
// STAGE ICONS
// ============================================================================

export function StudentIcon({ size = 24, color = Colors.primary.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3L2 9L12 15L22 9L12 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <Path d="M2 9V15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M6 11.5V17C6 17 9 20 12 20C15 20 18 17 18 17V11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export function InternIcon({ size = 24, color = Colors.warning.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}15`}
      />
      <Path d="M6 1v3M10 1v3M14 1v3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export function EmployeeIcon({ size = 24, color = Colors.info.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="2" fill={`${color}15`} />
      <Path d="M16 4V2H8V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    </Svg>
  )
}

export function SideHustlerIcon({ size = 24, color = Colors.primary.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}15`} />
      <Path d="M12 2a7.5 7.5 0 000 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Circle cx="12" cy="12" r="2" fill={color} />
    </Svg>
  )
}

export function EntrepreneurIcon({ size = 24, color = '#EC4899' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L4 7V12C4 16.42 7.4 20.55 12 22C16.6 20.55 20 16.42 20 12V7L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}15`}
      />
      <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export function CEOIcon({ size = 24, color = '#14B8A6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 15C16.4183 15 20 12.5376 20 9.5C20 6.46243 16.4183 4 12 4C7.58172 4 4 6.46243 4 9.5C4 12.5376 7.58172 15 12 15Z"
        stroke={color}
        strokeWidth="2"
        fill={`${color}15`}
      />
      <Path d="M4 9.5V15C4 18.04 7.58 20.5 12 20.5C16.42 20.5 20 18.04 20 15V9.5" stroke={color} strokeWidth="2" />
      <Path d="M4 15C4 18.04 7.58 20.5 12 20.5C16.42 20.5 20 18.04 20 15" stroke={color} strokeWidth="2" />
    </Svg>
  )
}

export function InvestorIcon({ size = 24, color = Colors.warning.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}25`}
      />
    </Svg>
  )
}

export function SigmaEliteIcon({ size = 24, color = Colors.primary.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="sigmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#8B5CF6" />
          <Stop offset="100%" stopColor="#6D28D9" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill="url(#sigmaGrad)"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M2 17L12 22L22 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 12L12 17L22 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

// ============================================================================
// ACTION ICONS
// ============================================================================

export function PlayIcon({ size = 24, color = Colors.text.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}10`} />
      <Path d="M10 8L16 12L10 16V8Z" fill={color} />
    </Svg>
  )
}

export function HistoryIcon({ size = 24, color = Colors.text.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export function GraduateIcon({ size = 24, color = Colors.success.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 10L12 5L2 10L12 15L22 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <Path d="M6 12V17C6 17 9 20 12 20C15 20 18 17 18 17V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 10V16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export function MintIcon({ size = 24, color = Colors.primary.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="2" fill={`${color}15`} />
      <Path d="M12 7V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M7 12H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export function SkipIcon({ size = 24, color = Colors.text.secondary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 4L15 12L5 20V4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export function ResetIcon({ size = 24, color = Colors.danger.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M1 4V10H7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M3.51 15C4.15 17.12 5.59 18.96 7.61 20.06C9.63 21.16 12.01 21.43 14.26 20.82C16.5 20.21 18.39 18.75 19.53 16.73C20.67 14.71 20.97 12.32 20.36 10.08C19.75 7.84 18.29 5.95 16.28 4.81C14.26 3.67 11.87 3.38 9.62 3.99C7.38 4.6 5.49 6.06 4.35 8.07C3.2 10.09 2.91 12.48 3.51 14.72L3.51 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function CheckIcon({ size = 24, color = Colors.success.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`} />
      <Path d="M8 12L11 15L16 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export function AlertIcon({ size = 24, color = Colors.warning.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L2 20H22L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <Path d="M12 9V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Circle cx="12" cy="17" r="1" fill={color} />
    </Svg>
  )
}

export function TrophyIcon({ size = 24, color = Colors.warning.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9H4C2.9 9 2 8.1 2 7V6C2 4.9 2.9 4 4 4H6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 9H20C21.1 9 22 8.1 22 7V6C22 4.9 21.1 4 20 4H18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 4H18V11C18 14.31 15.31 17 12 17C8.69 17 6 14.31 6 11V4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <Path d="M12 17V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M8 22H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export function TargetIcon({ size = 24, color = Colors.primary.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" />
      <Circle cx="12" cy="12" r="2" fill={color} />
    </Svg>
  )
}

export function CelebrationIcon({ size = 24, color = Colors.warning.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill={color} />
      <Path d="M5 5L6 7L8 8L6 9L5 11L4 9L2 8L4 7L5 5Z" fill={color} opacity={0.7} />
      <Path d="M19 13L20 15L22 16L20 17L19 19L18 17L16 16L18 15L19 13Z" fill={color} opacity={0.7} />
    </Svg>
  )
}

// ============================================================================
// NAV ICONS
// ============================================================================

export function GamepadIcon({ size = 24, color = Colors.text.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="6" width="20" height="12" rx="4" stroke={color} strokeWidth="2" fill={`${color}10`} />
      <Circle cx="8" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <Circle cx="16" cy="10" r="1" fill={color} />
      <Circle cx="18" cy="12" r="1" fill={color} />
      <Circle cx="16" cy="14" r="1" fill={color} />
      <Circle cx="14" cy="12" r="1" fill={color} />
    </Svg>
  )
}

export function WalletIcon({ size = 24, color = Colors.text.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="5" width="20" height="14" rx="3" stroke={color} strokeWidth="2" fill={`${color}10`} />
      <Path d="M2 10H22" stroke={color} strokeWidth="2" />
      <Circle cx="17" cy="14" r="1.5" fill={color} />
    </Svg>
  )
}

export function SettingsIcon({ size = 24, color = Colors.text.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <Path
        d="M12 1V4M12 20V23M4.22 4.22L6.34 6.34M17.66 17.66L19.78 19.78M1 12H4M20 12H23M4.22 19.78L6.34 17.66M17.66 6.34L19.78 4.22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function BugIcon({ size = 24, color = Colors.text.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 9V8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8V9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path
        d="M8 9H16C17.1 9 18 9.9 18 11V16C18 18.21 16.21 20 14 20H10C7.79 20 6 18.21 6 16V11C6 9.9 6.9 9 8 9Z"
        stroke={color}
        strokeWidth="2"
        fill={`${color}10`}
      />
      <Path d="M6 12H3M21 12H18M6 16H3M21 16H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M12 9V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  )
}

export function ChevronRightIcon({ size = 24, color = Colors.text.secondary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export function ArrowUpIcon({ size = 24, color = Colors.success.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 19V5M12 5L5 12M12 5L19 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export function ArrowDownIcon({ size = 24, color = Colors.danger.default }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5V19M12 19L5 12M12 19L19 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

// ============================================================================
// ICON MAPPING HELPERS
// ============================================================================

export const StatIcons = {
  money: MoneyIcon,
  fitness: FitnessIcon,
  intelligence: IntelligenceIcon,
  charisma: CharismaIcon,
  discipline: DisciplineIcon,
  investments: InvestmentsIcon,
} as const

export const StageIcons = {
  student: StudentIcon,
  intern: InternIcon,
  employee: EmployeeIcon,
  side_hustler: SideHustlerIcon,
  entrepreneur: EntrepreneurIcon,
  ceo: CEOIcon,
  investor: InvestorIcon,
  sigma_elite: SigmaEliteIcon,
} as const

export type StatIconName = keyof typeof StatIcons
export type StageIconName = keyof typeof StageIcons
