// Game Events - Life decisions for each stage
import type { GameEvent, StageId } from './game-config'

// ============================================================================
// STUDENT EVENTS
// ============================================================================
const STUDENT_EVENTS: GameEvent[] = [
  {
    id: 'student_1',
    stage: 'student',
    title: 'Study Session',
    description: 'Finals are coming up. How do you prepare?',
    choices: [
      {
        id: 'study_hard',
        text: 'Pull an all-nighter studying',
        effects: { intelligence: 8, fitness: -3, discipline: 5 },
        outcome: 'You aced the exam but feel exhausted.',
      },
      {
        id: 'study_balanced',
        text: 'Study in moderation, get good sleep',
        effects: { intelligence: 5, fitness: 2, discipline: 3 },
        outcome: 'Balanced approach paid off.',
      },
      {
        id: 'skip_study',
        text: 'Wing it and go to a party instead',
        effects: { intelligence: -5, charisma: 8, fitness: -2 },
        outcome: 'Made great connections but bombed the test.',
      },
    ],
  },
  {
    id: 'student_2',
    stage: 'student',
    title: 'Part-Time Job',
    description: 'A local business is hiring. Do you apply?',
    choices: [
      {
        id: 'take_job',
        text: 'Take the job for extra cash',
        effects: { money: 10, discipline: 5, intelligence: -2 },
        outcome: 'Started earning money but studies suffered slightly.',
      },
      {
        id: 'focus_studies',
        text: 'Focus on studies instead',
        effects: { intelligence: 6, discipline: 3 },
        outcome: 'Maintained academic excellence.',
      },
    ],
  },
  {
    id: 'student_3',
    stage: 'student',
    title: 'Gym Membership',
    description: "Your university offers a free gym membership. You've never been athletic.",
    choices: [
      {
        id: 'start_gym',
        text: 'Start hitting the gym regularly',
        effects: { fitness: 10, discipline: 6, charisma: 3 },
        outcome: 'Physical gains and mental discipline improved.',
      },
      {
        id: 'skip_gym',
        text: 'Use that time for other things',
        effects: { intelligence: 4, discipline: -2 },
        outcome: 'More time for studies, but missed out on health.',
      },
    ],
  },
  {
    id: 'student_4',
    stage: 'student',
    title: 'Networking Event',
    description: "There's a tech meetup happening downtown. Should you go?",
    choices: [
      {
        id: 'attend_event',
        text: 'Attend and practice networking',
        effects: { charisma: 8, intelligence: 3, money: -2 },
        outcome: 'Made valuable connections for the future.',
      },
      {
        id: 'stay_home',
        text: 'Stay home and work on a side project',
        effects: { intelligence: 6, discipline: 4 },
        outcome: 'Project skills improved significantly.',
      },
    ],
  },
  {
    id: 'student_5',
    stage: 'student',
    title: 'Crypto Discovery',
    description: 'A friend tells you about cryptocurrency investing.',
    choices: [
      {
        id: 'invest_small',
        text: 'Invest a small amount to learn',
        effects: { investments: 5, intelligence: 4, money: -5 },
        outcome: 'Started learning about DeFi and blockchain.',
      },
      {
        id: 'research_first',
        text: 'Research extensively before investing',
        effects: { intelligence: 6, investments: 3 },
        outcome: 'Built a solid knowledge foundation.',
      },
      {
        id: 'ignore_crypto',
        text: 'Focus on traditional career path',
        effects: { discipline: 4, intelligence: 2 },
        outcome: 'Stayed focused on conventional success.',
      },
    ],
  },
]

// ============================================================================
// INTERN EVENTS
// ============================================================================
const INTERN_EVENTS: GameEvent[] = [
  {
    id: 'intern_1',
    stage: 'intern',
    title: 'Extra Hours',
    description: "Your manager asks if you can work late to finish a project. It's Friday.",
    choices: [
      {
        id: 'work_late',
        text: 'Stay and impress them',
        effects: { discipline: 8, money: 5, charisma: 4, fitness: -3 },
        outcome: 'Manager noticed your dedication.',
      },
      {
        id: 'set_boundary',
        text: 'Politely decline, maintain work-life balance',
        effects: { fitness: 4, discipline: 2, charisma: -2 },
        outcome: 'Maintained balance but missed visibility.',
      },
    ],
  },
  {
    id: 'intern_2',
    stage: 'intern',
    title: 'Learning Opportunity',
    description: "There's an advanced certification course. Your company won't pay for it.",
    choices: [
      {
        id: 'pay_yourself',
        text: 'Pay for it yourself',
        effects: { intelligence: 10, money: -8, discipline: 5 },
        outcome: 'Investment in yourself pays off.',
      },
      {
        id: 'free_resources',
        text: 'Learn from free online resources',
        effects: { intelligence: 5, discipline: 4 },
        outcome: 'Self-taught but still progressed.',
      },
    ],
  },
  {
    id: 'intern_3',
    stage: 'intern',
    title: 'Office Politics',
    description: 'A colleague takes credit for your work in a meeting.',
    choices: [
      {
        id: 'speak_up',
        text: 'Diplomatically correct the record',
        effects: { charisma: 6, discipline: 4, intelligence: 2 },
        outcome: 'Stood your ground professionally.',
      },
      {
        id: 'let_it_go',
        text: 'Let it slide this time',
        effects: { discipline: 3, charisma: -3 },
        outcome: 'Avoided conflict but felt frustrated.',
      },
      {
        id: 'document_everything',
        text: 'Start documenting all your contributions',
        effects: { intelligence: 5, discipline: 6 },
        outcome: 'Built a paper trail for future reference.',
      },
    ],
  },
  {
    id: 'intern_4',
    stage: 'intern',
    title: 'Side Project',
    description: 'You have an idea for an app. When do you work on it?',
    choices: [
      {
        id: 'nights_weekends',
        text: 'Grind nights and weekends',
        effects: { intelligence: 7, investments: 5, fitness: -4, discipline: 6 },
        outcome: 'Built something real while keeping your job.',
      },
      {
        id: 'wait_for_later',
        text: 'Focus on career first, ideas can wait',
        effects: { money: 4, discipline: 3 },
        outcome: 'Played it safe for now.',
      },
    ],
  },
]

// ============================================================================
// EMPLOYEE EVENTS
// ============================================================================
const EMPLOYEE_EVENTS: GameEvent[] = [
  {
    id: 'employee_1',
    stage: 'employee',
    title: 'Promotion Opportunity',
    description: 'A senior position opened up. You could apply or wait for more experience.',
    choices: [
      {
        id: 'apply_now',
        text: 'Go for it aggressively',
        effects: { charisma: 7, discipline: 5, money: 8 },
        outcome: 'Boldness paid off with a promotion.',
      },
      {
        id: 'wait_prepare',
        text: 'Wait and prepare for next time',
        effects: { intelligence: 5, discipline: 4 },
        outcome: 'Built more skills for a stronger future bid.',
      },
    ],
  },
  {
    id: 'employee_2',
    stage: 'employee',
    title: 'Investment Decision',
    description: "You've saved some money. What do you do with it?",
    choices: [
      {
        id: 'aggressive_invest',
        text: 'Invest aggressively in crypto',
        effects: { investments: 12, money: -5, intelligence: 3 },
        outcome: 'High risk, potential high reward.',
      },
      {
        id: 'balanced_portfolio',
        text: 'Build a balanced portfolio',
        effects: { investments: 7, intelligence: 4, discipline: 3 },
        outcome: 'Steady growth with calculated risk.',
      },
      {
        id: 'save_cash',
        text: 'Keep it in savings for emergencies',
        effects: { money: 5, discipline: 4 },
        outcome: 'Conservative but secure.',
      },
    ],
  },
  {
    id: 'employee_3',
    stage: 'employee',
    title: 'Health Wake-Up Call',
    description: 'Annual checkup shows you need to take better care of yourself.',
    choices: [
      {
        id: 'lifestyle_change',
        text: 'Commit to a complete lifestyle overhaul',
        effects: { fitness: 12, discipline: 8, money: -4 },
        outcome: 'Transformation begins.',
      },
      {
        id: 'small_changes',
        text: 'Make small, sustainable changes',
        effects: { fitness: 6, discipline: 4 },
        outcome: 'Gradual improvement is still improvement.',
      },
      {
        id: 'ignore_it',
        text: 'Too busy right now, deal with it later',
        effects: { money: 3, fitness: -5 },
        outcome: 'Prioritized work over health.',
      },
    ],
  },
  {
    id: 'employee_4',
    stage: 'employee',
    title: 'Public Speaking',
    description: "You're asked to present at a company all-hands meeting.",
    choices: [
      {
        id: 'embrace_challenge',
        text: 'Prepare thoroughly and nail it',
        effects: { charisma: 10, intelligence: 4, discipline: 5 },
        outcome: 'Became known as a great communicator.',
      },
      {
        id: 'avoid_spotlight',
        text: 'Delegate to someone else',
        effects: { charisma: -4, discipline: 2 },
        outcome: 'Missed a growth opportunity.',
      },
    ],
  },
]

// ============================================================================
// SIDE HUSTLER EVENTS
// ============================================================================
const SIDE_HUSTLER_EVENTS: GameEvent[] = [
  {
    id: 'side_hustler_1',
    stage: 'side_hustler',
    title: 'First Customer',
    description: 'Someone wants to pay for your side project! But they want customizations.',
    choices: [
      {
        id: 'take_deal',
        text: 'Take the deal and customize',
        effects: { money: 10, charisma: 5, discipline: 4, fitness: -3 },
        outcome: 'First paying customer! The grind is real.',
      },
      {
        id: 'stick_to_vision',
        text: 'Stick to your product vision, say no',
        effects: { discipline: 6, intelligence: 3 },
        outcome: 'Maintained product integrity.',
      },
    ],
  },
  {
    id: 'side_hustler_2',
    stage: 'side_hustler',
    title: 'Time Crunch',
    description: 'Day job is demanding more. Side hustle is taking off. Something has to give.',
    choices: [
      {
        id: 'quit_job',
        text: 'Take the leap, quit the day job',
        effects: { discipline: 10, investments: 8, money: -10, charisma: 5 },
        outcome: 'All in on the entrepreneurial path.',
      },
      {
        id: 'hire_help',
        text: 'Hire part-time help for side hustle',
        effects: { money: -5, intelligence: 5, discipline: 4 },
        outcome: 'Learned to delegate and scale.',
      },
      {
        id: 'scale_back',
        text: 'Scale back side hustle temporarily',
        effects: { money: 5, discipline: -3, investments: -2 },
        outcome: 'Played it safe but lost momentum.',
      },
    ],
  },
  {
    id: 'side_hustler_3',
    stage: 'side_hustler',
    title: 'Crypto Opportunity',
    description: 'A DeFi protocol offers to integrate your product. High upside, high risk.',
    choices: [
      {
        id: 'go_crypto',
        text: 'Embrace the crypto integration',
        effects: { investments: 12, intelligence: 6, money: 5 },
        outcome: 'Entered the Web3 space.',
      },
      {
        id: 'stay_traditional',
        text: 'Stick with traditional business model',
        effects: { money: 6, discipline: 4 },
        outcome: 'Steady but potentially slower growth.',
      },
    ],
  },
  {
    id: 'side_hustler_4',
    stage: 'side_hustler',
    title: 'Burnout Warning',
    description: "You're exhausted. Haven't taken a day off in months.",
    choices: [
      {
        id: 'take_break',
        text: 'Take a week off to recharge',
        effects: { fitness: 8, discipline: -2, charisma: 4 },
        outcome: 'Came back refreshed and creative.',
      },
      {
        id: 'push_through',
        text: 'Push through, rest is for later',
        effects: { discipline: 6, fitness: -8, money: 5 },
        outcome: 'Short-term gains, long-term risk.',
      },
    ],
  },
]

// ============================================================================
// ENTREPRENEUR EVENTS
// ============================================================================
const ENTREPRENEUR_EVENTS: GameEvent[] = [
  {
    id: 'entrepreneur_1',
    stage: 'entrepreneur',
    title: 'Funding Round',
    description: 'VCs are interested. Do you take their money?',
    choices: [
      {
        id: 'take_vc',
        text: 'Take VC funding, grow fast',
        effects: { money: 15, investments: 10, charisma: 5, discipline: -3 },
        outcome: 'Rocket fuel acquired. Pressure increased.',
      },
      {
        id: 'bootstrap',
        text: 'Bootstrap and maintain control',
        effects: { discipline: 10, intelligence: 5, money: 3 },
        outcome: 'Slower growth but full ownership.',
      },
    ],
  },
  {
    id: 'entrepreneur_2',
    stage: 'entrepreneur',
    title: 'Hiring Decision',
    description: 'Need to hire your first employee. Budget is tight.',
    choices: [
      {
        id: 'hire_senior',
        text: 'Hire expensive senior talent',
        effects: { money: -8, intelligence: 8, investments: 5 },
        outcome: 'Quality team member accelerates growth.',
      },
      {
        id: 'hire_junior',
        text: 'Hire eager junior and train them',
        effects: { money: -3, discipline: 6, charisma: 4 },
        outcome: 'Built loyalty and developed talent.',
      },
    ],
  },
  {
    id: 'entrepreneur_3',
    stage: 'entrepreneur',
    title: 'Competition',
    description: 'A well-funded competitor enters your market.',
    choices: [
      {
        id: 'differentiate',
        text: 'Double down on differentiation',
        effects: { intelligence: 8, discipline: 6, charisma: 4 },
        outcome: 'Found your unique position.',
      },
      {
        id: 'compete_price',
        text: 'Compete on price aggressively',
        effects: { money: -5, discipline: 5, investments: -3 },
        outcome: 'Race to bottom but survived.',
      },
      {
        id: 'pivot',
        text: 'Pivot to an adjacent market',
        effects: { intelligence: 10, investments: 5, charisma: 3 },
        outcome: 'Found blue ocean opportunity.',
      },
    ],
  },
  {
    id: 'entrepreneur_4',
    stage: 'entrepreneur',
    title: 'Media Attention',
    description: 'A major publication wants to feature your story.',
    choices: [
      {
        id: 'embrace_media',
        text: 'Become the face of your brand',
        effects: { charisma: 12, investments: 5, discipline: 3 },
        outcome: 'Personal brand amplified business.',
      },
      {
        id: 'stay_humble',
        text: 'Keep low profile, let product speak',
        effects: { discipline: 6, intelligence: 4 },
        outcome: 'Stayed focused on execution.',
      },
    ],
  },
]

// ============================================================================
// CEO EVENTS
// ============================================================================
const CEO_EVENTS: GameEvent[] = [
  {
    id: 'ceo_1',
    stage: 'ceo',
    title: 'Acquisition Offer',
    description: "A big company wants to acquire you. It's a life-changing sum.",
    choices: [
      {
        id: 'sell',
        text: 'Take the money and exit',
        effects: { money: 20, investments: 15, discipline: -5 },
        outcome: 'Financial freedom achieved. What now?',
      },
      {
        id: 'decline',
        text: 'Decline and keep building',
        effects: { discipline: 10, charisma: 8, intelligence: 5 },
        outcome: "Bet on yourself. Let's see how far this goes.",
      },
    ],
  },
  {
    id: 'ceo_2',
    stage: 'ceo',
    title: 'Global Expansion',
    description: 'Opportunity to expand internationally. High cost, high reward.',
    choices: [
      {
        id: 'expand',
        text: 'Go global aggressively',
        effects: { money: -10, investments: 12, charisma: 8, intelligence: 5 },
        outcome: 'Now operating on the world stage.',
      },
      {
        id: 'consolidate',
        text: 'Consolidate current markets first',
        effects: { money: 8, discipline: 6, investments: 4 },
        outcome: 'Strengthened foundation before scaling.',
      },
    ],
  },
  {
    id: 'ceo_3',
    stage: 'ceo',
    title: 'Executive Health',
    description: 'Running a company takes its toll. Doctor recommends lifestyle changes.',
    choices: [
      {
        id: 'prioritize_health',
        text: 'Hire executive coach, prioritize wellness',
        effects: { fitness: 12, discipline: 6, money: -5, charisma: 4 },
        outcome: 'Optimized performance at all levels.',
      },
      {
        id: 'later',
        text: 'Company needs me now, health can wait',
        effects: { money: 5, discipline: 3, fitness: -8 },
        outcome: 'Short-term focus, long-term risk.',
      },
    ],
  },
  {
    id: 'ceo_4',
    stage: 'ceo',
    title: 'Philanthropy',
    description: 'You have resources now. Time to give back?',
    choices: [
      {
        id: 'start_foundation',
        text: 'Start a charitable foundation',
        effects: { charisma: 10, money: -8, discipline: 4, intelligence: 3 },
        outcome: 'Legacy beyond business begins.',
      },
      {
        id: 'strategic_giving',
        text: 'Strategic giving that aligns with business',
        effects: { charisma: 6, investments: 5, money: -3 },
        outcome: 'Purpose and profit aligned.',
      },
    ],
  },
]

// ============================================================================
// INVESTOR EVENTS
// ============================================================================
const INVESTOR_EVENTS: GameEvent[] = [
  {
    id: 'investor_1',
    stage: 'investor',
    title: 'Angel Investment',
    description: 'A promising startup founder pitches you. Reminds you of your younger self.',
    choices: [
      {
        id: 'invest_big',
        text: 'Make a significant investment',
        effects: { investments: 12, money: -10, charisma: 6, intelligence: 4 },
        outcome: 'Mentoring the next generation.',
      },
      {
        id: 'invest_small',
        text: 'Small check, observe from distance',
        effects: { investments: 5, money: -3, intelligence: 3 },
        outcome: 'Diversified bet with limited exposure.',
      },
      {
        id: 'pass',
        text: 'Pass on this one',
        effects: { discipline: 4, money: 2 },
        outcome: 'Preserved capital for better opportunities.',
      },
    ],
  },
  {
    id: 'investor_2',
    stage: 'investor',
    title: 'Market Crash',
    description: 'Markets are down 40%. Your portfolio is bleeding.',
    choices: [
      {
        id: 'buy_dip',
        text: 'Buy the dip aggressively',
        effects: { investments: 15, money: -12, discipline: 8 },
        outcome: 'Contrarian bet. Time will tell.',
      },
      {
        id: 'hold',
        text: 'Hold positions, stay the course',
        effects: { discipline: 10, intelligence: 4 },
        outcome: 'Emotional control preserved capital.',
      },
      {
        id: 'panic_sell',
        text: 'Reduce exposure, protect capital',
        effects: { money: 5, investments: -8, discipline: -4 },
        outcome: 'Preserved some capital, missed recovery.',
      },
    ],
  },
  {
    id: 'investor_3',
    stage: 'investor',
    title: 'Crypto Protocol',
    description: 'Opportunity to become a major stakeholder in a new L1 blockchain.',
    choices: [
      {
        id: 'go_all_in',
        text: 'Major allocation to this bet',
        effects: { investments: 18, money: -15, intelligence: 5 },
        outcome: 'High conviction bet on the future.',
      },
      {
        id: 'moderate_position',
        text: 'Take a moderate position',
        effects: { investments: 8, money: -5, discipline: 4 },
        outcome: 'Balanced risk-reward approach.',
      },
    ],
  },
  {
    id: 'investor_4',
    stage: 'investor',
    title: 'Speaking Engagement',
    description: 'Invited to speak at a major investment conference.',
    choices: [
      {
        id: 'accept',
        text: 'Share your wisdom with the world',
        effects: { charisma: 12, intelligence: 5, investments: 4 },
        outcome: 'Became a thought leader in the space.',
      },
      {
        id: 'decline',
        text: 'Stay private, focus on returns',
        effects: { discipline: 6, investments: 5 },
        outcome: 'Maintained mystique and focus.',
      },
    ],
  },
]

// ============================================================================
// SIGMA ELITE EVENTS
// ============================================================================
const SIGMA_ELITE_EVENTS: GameEvent[] = [
  {
    id: 'sigma_1',
    stage: 'sigma_elite',
    title: 'Ultimate Choice',
    description: "You've reached the top. What's the meaning of all this?",
    choices: [
      {
        id: 'keep_grinding',
        text: 'The grind never stops',
        effects: { discipline: 5, investments: 5, fitness: 3 },
        outcome: 'True sigma energy. No ceiling.',
      },
      {
        id: 'help_others',
        text: 'Help others reach their potential',
        effects: { charisma: 8, intelligence: 5, discipline: 3 },
        outcome: 'Legacy through impact on others.',
      },
      {
        id: 'balance',
        text: 'Finally find balance and peace',
        effects: { fitness: 8, charisma: 5, discipline: 2 },
        outcome: 'Inner peace achieved. You won.',
      },
    ],
  },
  {
    id: 'sigma_2',
    stage: 'sigma_elite',
    title: 'Global Impact',
    description: 'Your wealth could solve major world problems. How do you deploy it?',
    choices: [
      {
        id: 'moonshot',
        text: 'Fund moonshot technology',
        effects: { investments: 10, intelligence: 8, money: -10 },
        outcome: 'Betting on humanity-changing tech.',
      },
      {
        id: 'education',
        text: 'Build schools and educate millions',
        effects: { charisma: 10, discipline: 5, money: -8 },
        outcome: 'Knowledge as the ultimate gift.',
      },
      {
        id: 'preserve_wealth',
        text: 'Preserve wealth for future generations',
        effects: { money: 5, investments: 5, discipline: 5 },
        outcome: 'Dynasty building mode activated.',
      },
    ],
  },
  {
    id: 'sigma_3',
    stage: 'sigma_elite',
    title: 'Peak Performance',
    description: 'You operate at elite levels. How do you maintain it?',
    choices: [
      {
        id: 'biohacking',
        text: 'Cutting-edge biohacking and optimization',
        effects: { fitness: 10, intelligence: 6, money: -5 },
        outcome: 'Pushing human limits.',
      },
      {
        id: 'mindfulness',
        text: 'Meditation and ancient wisdom',
        effects: { discipline: 8, charisma: 6, fitness: 4 },
        outcome: 'Inner strength is true strength.',
      },
    ],
  },
]

// ============================================================================
// EVENTS REGISTRY
// ============================================================================
export const ALL_EVENTS: GameEvent[] = [
  ...STUDENT_EVENTS,
  ...INTERN_EVENTS,
  ...EMPLOYEE_EVENTS,
  ...SIDE_HUSTLER_EVENTS,
  ...ENTREPRENEUR_EVENTS,
  ...CEO_EVENTS,
  ...INVESTOR_EVENTS,
  ...SIGMA_ELITE_EVENTS,
]

export function getEventsForStage(stageId: StageId): GameEvent[] {
  return ALL_EVENTS.filter((event) => event.stage === stageId)
}

export function getRandomEvent(stageId: StageId): GameEvent | null {
  const stageEvents = getEventsForStage(stageId)
  if (stageEvents.length === 0) return null
  const randomIndex = Math.floor(Math.random() * stageEvents.length)
  return stageEvents[randomIndex]
}
