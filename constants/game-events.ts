// Game Events - Life decisions for each stage
// BitLife-style events with both positive and negative effects
import type { GameEvent, StageId } from './game-config'

// ============================================================================
// STUDENT EVENTS (25 events)
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
  {
    id: 'student_6',
    stage: 'student',
    title: 'Online Course',
    description: 'You found an online course that could boost your skills. It costs money and time.',
    choices: [
      {
        id: 'enroll_course',
        text: 'Enroll and commit to finishing it',
        effects: { intelligence: 7, discipline: 5, money: -3 },
        outcome: 'Gained valuable new skills.',
      },
      {
        id: 'free_youtube',
        text: 'Learn from free YouTube tutorials instead',
        effects: { intelligence: 4, discipline: 2 },
        outcome: 'Self-taught with mixed results.',
      },
    ],
  },
  {
    id: 'student_7',
    stage: 'student',
    title: 'Study Group',
    description: 'Some classmates invite you to join their study group.',
    choices: [
      {
        id: 'join_group',
        text: 'Join and contribute regularly',
        effects: { intelligence: 5, charisma: 6, discipline: 3 },
        outcome: 'Made friends and improved academically.',
      },
      {
        id: 'solo_study',
        text: 'Prefer to study alone',
        effects: { intelligence: 6, discipline: 4, charisma: -2 },
        outcome: 'Focused study but missed social connections.',
      },
    ],
  },
  {
    id: 'student_8',
    stage: 'student',
    title: 'Campus Club',
    description: 'A tech club on campus is recruiting new members.',
    choices: [
      {
        id: 'join_club',
        text: 'Join and take on leadership role',
        effects: { charisma: 8, intelligence: 4, discipline: 3 },
        outcome: 'Developed leadership and networking skills.',
      },
      {
        id: 'skip_club',
        text: 'Too busy, maybe next semester',
        effects: { discipline: 3, intelligence: 2 },
        outcome: 'Stayed focused on academics.',
      },
    ],
  },
  {
    id: 'student_9',
    stage: 'student',
    title: 'Morning Routine',
    description: "Your sleep schedule is a mess. Time to make a change?",
    choices: [
      {
        id: 'wake_early',
        text: 'Start waking up at 6 AM consistently',
        effects: { discipline: 8, fitness: 5, intelligence: 3 },
        outcome: 'Became a morning person with more productive days.',
      },
      {
        id: 'night_owl',
        text: 'Embrace being a night owl',
        effects: { intelligence: 4, discipline: -2, charisma: 2 },
        outcome: 'Creative at night but irregular schedule.',
      },
    ],
  },
  {
    id: 'student_10',
    stage: 'student',
    title: 'Internship Application',
    description: 'A great summer internship opportunity just opened up.',
    choices: [
      {
        id: 'apply_intern',
        text: 'Apply and prepare intensively',
        effects: { intelligence: 5, discipline: 6, charisma: 4 },
        outcome: 'Got interview experience and learned valuable skills.',
      },
      {
        id: 'summer_break',
        text: 'Take the summer off to relax',
        effects: { fitness: 5, charisma: 3, discipline: -3 },
        outcome: 'Recharged but missed an opportunity.',
      },
    ],
  },
  {
    id: 'student_11',
    stage: 'student',
    title: 'Campus Drama',
    description: 'Your roommate starts dating your crush. How do you handle it?',
    choices: [
      {
        id: 'mature_response',
        text: 'Accept it maturely and move on',
        effects: { discipline: 8, charisma: 4, fitness: -2 },
        outcome: 'Showed emotional maturity. It still hurts though.',
      },
      {
        id: 'confront_them',
        text: 'Confront your roommate about it',
        effects: { charisma: -5, discipline: -3, fitness: 2 },
        outcome: 'The confrontation was awkward. Lost a friend.',
      },
      {
        id: 'channel_energy',
        text: 'Channel frustration into self-improvement',
        effects: { fitness: 10, intelligence: 5, discipline: 6 },
        outcome: 'Used the pain as fuel. You glow up hard.',
      },
    ],
  },
  {
    id: 'student_12',
    stage: 'student',
    title: 'Cheating Opportunity',
    description: 'A classmate offers you stolen exam answers before the final.',
    choices: [
      {
        id: 'refuse_cheat',
        text: 'Refuse and report to professor',
        effects: { discipline: 10, intelligence: 3, charisma: -4 },
        outcome: 'Did the right thing. Some classmates call you a snitch.',
      },
      {
        id: 'take_answers',
        text: 'Take the answers',
        effects: { intelligence: -5, money: 5, discipline: -8 },
        outcome: 'Passed the exam but live with guilt.',
      },
      {
        id: 'refuse_quietly',
        text: 'Refuse but keep quiet about it',
        effects: { discipline: 5, intelligence: 2 },
        outcome: 'Stayed neutral. Some call it wisdom, some cowardice.',
      },
    ],
  },
  {
    id: 'student_13',
    stage: 'student',
    title: 'Health Scare',
    description: 'You feel chest pain after an all-nighter fueled by energy drinks.',
    choices: [
      {
        id: 'see_doctor',
        text: 'Go to the campus health center',
        effects: { fitness: 5, discipline: 6, money: -3 },
        outcome: 'Doctor says you need to reduce caffeine. A wake-up call.',
      },
      {
        id: 'ignore_it',
        text: 'Push through, deadlines wait for no one',
        effects: { intelligence: 3, fitness: -8, discipline: -2 },
        outcome: 'Finished your project but your body is screaming.',
      },
    ],
  },
  {
    id: 'student_14',
    stage: 'student',
    title: 'Group Project Nightmare',
    description: 'Your group project partners are doing zero work. Deadline is tomorrow.',
    choices: [
      {
        id: 'do_everything',
        text: 'Pull an all-nighter and do everything yourself',
        effects: { intelligence: 6, discipline: 8, fitness: -5, charisma: -3 },
        outcome: 'You carried the team. Resentment builds.',
      },
      {
        id: 'confront_team',
        text: 'Call an emergency meeting and confront them',
        effects: { charisma: 5, discipline: 4, intelligence: 3 },
        outcome: 'The confrontation worked. Team stepped up.',
      },
      {
        id: 'email_professor',
        text: 'Email the professor about the situation',
        effects: { discipline: 3, charisma: -5, intelligence: 2 },
        outcome: 'Professor intervenes. You get individual grades now.',
      },
    ],
  },
  {
    id: 'student_15',
    stage: 'student',
    title: 'Startup Competition',
    description: 'There is a hackathon with a $5,000 prize. Entry requires skipping a class.',
    choices: [
      {
        id: 'join_hackathon',
        text: 'Skip class and compete',
        effects: { intelligence: 8, investments: 5, discipline: -2, charisma: 6 },
        outcome: "You didn't win but learned tons and made connections.",
      },
      {
        id: 'skip_hackathon',
        text: 'Attend class, GPA matters more',
        effects: { intelligence: 4, discipline: 5 },
        outcome: 'Safe choice. The class was boring anyway.',
      },
    ],
  },
  {
    id: 'student_16',
    stage: 'student',
    title: 'Family Emergency',
    description: 'Your parent calls - they need help at home for a week. Midterms are next week.',
    choices: [
      {
        id: 'go_home',
        text: 'Go home to help family',
        effects: { charisma: 8, discipline: -4, intelligence: -5 },
        outcome: 'Family appreciates it. Grades took a hit.',
      },
      {
        id: 'stay_study',
        text: 'Stay and study, send money instead',
        effects: { intelligence: 5, money: -8, charisma: -3, discipline: 4 },
        outcome: 'Aced midterms but feel guilty.',
      },
    ],
  },
  {
    id: 'student_17',
    stage: 'student',
    title: 'Social Media Fame',
    description: 'A meme you posted goes viral. People want to follow your content.',
    choices: [
      {
        id: 'become_influencer',
        text: 'Start creating content seriously',
        effects: { charisma: 10, money: 5, discipline: -4, intelligence: -2 },
        outcome: 'Growing a following! Studies suffer though.',
      },
      {
        id: 'ignore_fame',
        text: 'Ignore it and focus on school',
        effects: { discipline: 6, intelligence: 4 },
        outcome: 'Fifteen minutes of fame passed. Back to the grind.',
      },
    ],
  },
  {
    id: 'student_18',
    stage: 'student',
    title: 'Substance Temptation',
    description: 'Classmates offer you study drugs to help focus during finals week.',
    choices: [
      {
        id: 'take_drugs',
        text: 'Try them just this once',
        effects: { intelligence: 8, fitness: -10, discipline: -5 },
        outcome: 'Incredible focus but you feel terrible after.',
      },
      {
        id: 'refuse_drugs',
        text: 'Politely decline',
        effects: { discipline: 8, fitness: 3, charisma: 2 },
        outcome: 'Kept your integrity. Natural focus improves.',
      },
    ],
  },
  {
    id: 'student_19',
    stage: 'student',
    title: 'Coding Competition',
    description: 'A big tech company is hosting a coding challenge. Top performers get interviews.',
    choices: [
      {
        id: 'compete_hard',
        text: 'Grind LeetCode for weeks to prepare',
        effects: { intelligence: 10, discipline: 8, fitness: -4, charisma: -2 },
        outcome: 'Made it to the final round. Companies are interested.',
      },
      {
        id: 'casual_attempt',
        text: 'Give it a casual try',
        effects: { intelligence: 4, discipline: 2 },
        outcome: 'Decent showing. Learned where your gaps are.',
      },
    ],
  },
  {
    id: 'student_20',
    stage: 'student',
    title: 'Mentor Opportunity',
    description: 'A successful alumni offers to mentor you but expects serious commitment.',
    choices: [
      {
        id: 'accept_mentor',
        text: 'Accept and commit fully',
        effects: { intelligence: 8, charisma: 7, discipline: 5, investments: 3 },
        outcome: 'The mentorship opens doors you never knew existed.',
      },
      {
        id: 'too_busy',
        text: "Politely decline, you're too busy",
        effects: { discipline: 2, intelligence: 1 },
        outcome: 'Missed a big opportunity. Regret sets in.',
      },
    ],
  },
  {
    id: 'student_21',
    stage: 'student',
    title: 'Dorm Theft',
    description: 'Your laptop gets stolen from your dorm. Insurance does not cover it.',
    choices: [
      {
        id: 'buy_new',
        text: 'Buy a new one with savings',
        effects: { money: -15, discipline: 3 },
        outcome: 'Back to work but savings took a hit.',
      },
      {
        id: 'use_library',
        text: 'Use library computers until you save up',
        effects: { discipline: 8, intelligence: 4, charisma: -2 },
        outcome: 'Inconvenient but built character. Library becomes your home.',
      },
    ],
  },
  {
    id: 'student_22',
    stage: 'student',
    title: 'Dating Distraction',
    description: "You've been spending all your time with a new romantic interest.",
    choices: [
      {
        id: 'balance_dating',
        text: 'Set boundaries for study time',
        effects: { discipline: 6, charisma: 4, intelligence: 3 },
        outcome: 'Found a healthy balance. Relationship thrives.',
      },
      {
        id: 'all_in_love',
        text: 'Love conquers all, right?',
        effects: { charisma: 10, intelligence: -6, discipline: -5 },
        outcome: 'Amazing memories but your grades crashed.',
      },
      {
        id: 'breakup_focus',
        text: 'End it to focus on yourself',
        effects: { discipline: 8, intelligence: 5, charisma: -4, fitness: -2 },
        outcome: 'Cold but effective. Back on the grind path.',
      },
    ],
  },
  {
    id: 'student_23',
    stage: 'student',
    title: 'Professor Conflict',
    description: 'You got a grade you believe is unfair. The professor seems dismissive.',
    choices: [
      {
        id: 'fight_grade',
        text: 'Formally appeal the grade',
        effects: { discipline: 5, charisma: -3, intelligence: 3 },
        outcome: 'Grade was adjusted. Professor now dislikes you.',
      },
      {
        id: 'accept_grade',
        text: 'Accept it and move on',
        effects: { discipline: 4, charisma: 2 },
        outcome: 'Let it go. Energy saved for future battles.',
      },
    ],
  },
  {
    id: 'student_24',
    stage: 'student',
    title: 'Freelance Gig',
    description: 'Someone offers you $500 to build a website. Deadline conflicts with exams.',
    choices: [
      {
        id: 'take_gig',
        text: 'Take the gig and figure it out',
        effects: { money: 12, intelligence: 5, discipline: -3, fitness: -3 },
        outcome: 'Delivered and got paid! Barely slept for two weeks.',
      },
      {
        id: 'decline_gig',
        text: 'Decline, academics come first',
        effects: { discipline: 5, intelligence: 4 },
        outcome: 'Smart choice. Exams went well.',
      },
    ],
  },
  {
    id: 'student_25',
    stage: 'student',
    title: 'Imposter Syndrome',
    description: "Everyone seems smarter than you. You're doubting if you belong here.",
    choices: [
      {
        id: 'seek_help',
        text: 'Talk to a counselor about it',
        effects: { charisma: 4, discipline: 5, intelligence: 3, fitness: 2 },
        outcome: 'Therapy helped. You learn everyone feels this way.',
      },
      {
        id: 'prove_wrong',
        text: 'Use doubt as fuel to work harder',
        effects: { discipline: 8, intelligence: 6, fitness: -3 },
        outcome: 'Channeled anxiety into productivity. Results speak.',
      },
      {
        id: 'ignore_feelings',
        text: 'Suppress feelings and push through',
        effects: { discipline: 3, intelligence: 2, fitness: -4, charisma: -2 },
        outcome: 'Not healthy but functional. For now.',
      },
    ],
  },
]

// ============================================================================
// INTERN EVENTS (18 events)
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
  {
    id: 'intern_5',
    stage: 'intern',
    title: 'Toxic Coworker',
    description: 'A senior employee constantly belittles you in front of others.',
    choices: [
      {
        id: 'report_hr',
        text: 'Report to HR',
        effects: { discipline: 5, charisma: -4, fitness: 3 },
        outcome: 'HR investigates. Workplace gets awkward.',
      },
      {
        id: 'confront_directly',
        text: 'Confront them privately',
        effects: { charisma: 6, discipline: 7, fitness: 2 },
        outcome: 'They backed down. Earned some respect.',
      },
      {
        id: 'endure_silently',
        text: 'Keep your head down and endure',
        effects: { discipline: 3, fitness: -5, charisma: -3 },
        outcome: 'Soul-crushing but you kept the peace.',
      },
    ],
  },
  {
    id: 'intern_6',
    stage: 'intern',
    title: 'Competing Offer',
    description: 'Another company offers you a slightly better internship role.',
    choices: [
      {
        id: 'switch_jobs',
        text: 'Take the new offer',
        effects: { money: 6, intelligence: 4, charisma: -3, discipline: 2 },
        outcome: 'Fresh start. Some bridges burned.',
      },
      {
        id: 'stay_loyal',
        text: 'Stay loyal to current company',
        effects: { charisma: 5, discipline: 6 },
        outcome: 'Loyalty noted. Trust builds.',
      },
      {
        id: 'negotiate',
        text: 'Use offer to negotiate better terms',
        effects: { money: 8, charisma: 4, discipline: 3 },
        outcome: 'Bold move paid off. Got a raise.',
      },
    ],
  },
  {
    id: 'intern_7',
    stage: 'intern',
    title: 'Failed Deployment',
    description: 'Your code caused a production bug. Users are affected.',
    choices: [
      {
        id: 'own_mistake',
        text: 'Immediately own up to it',
        effects: { charisma: 8, discipline: 6, intelligence: 3 },
        outcome: 'Team appreciated your honesty. Fixed it together.',
      },
      {
        id: 'blame_others',
        text: 'Blame the code review process',
        effects: { charisma: -8, discipline: -4, intelligence: 2 },
        outcome: 'No one bought it. Trust damaged.',
      },
      {
        id: 'fix_silently',
        text: 'Try to fix it before anyone notices',
        effects: { intelligence: 5, discipline: 4, charisma: -2 },
        outcome: 'Fixed it but your nervous sweat gave it away.',
      },
    ],
  },
  {
    id: 'intern_8',
    stage: 'intern',
    title: 'Mentor Conflict',
    description: 'Your mentor suggests a tech stack you think is outdated.',
    choices: [
      {
        id: 'follow_mentor',
        text: 'Trust their experience',
        effects: { discipline: 5, charisma: 4, intelligence: 3 },
        outcome: 'Learned there was wisdom in the old ways.',
      },
      {
        id: 'push_new_tech',
        text: 'Advocate strongly for modern approach',
        effects: { intelligence: 6, charisma: -2, discipline: 4 },
        outcome: 'Proved your point but ruffled feathers.',
      },
    ],
  },
  {
    id: 'intern_9',
    stage: 'intern',
    title: 'Crypto Side Income',
    description: 'Your DeFi investments start generating passive income.',
    choices: [
      {
        id: 'reinvest_all',
        text: 'Reinvest all profits',
        effects: { investments: 10, money: -3, discipline: 5 },
        outcome: 'Compound growth activated.',
      },
      {
        id: 'take_profits',
        text: 'Take profits, enjoy life',
        effects: { money: 10, investments: -2, fitness: 3 },
        outcome: 'Treated yourself. Balanced approach.',
      },
      {
        id: 'diversify',
        text: 'Diversify into different protocols',
        effects: { investments: 8, intelligence: 4, discipline: 3 },
        outcome: 'Spread risk wisely. Learning fast.',
      },
    ],
  },
  {
    id: 'intern_10',
    stage: 'intern',
    title: 'Return Offer Pressure',
    description: 'Company hints at a return offer but wants you to commit early.',
    choices: [
      {
        id: 'commit_early',
        text: 'Accept and lock it in',
        effects: { money: 8, discipline: 5, charisma: -2 },
        outcome: 'Security gained but options limited.',
      },
      {
        id: 'keep_options',
        text: 'Ask for time to explore other offers',
        effects: { charisma: 4, intelligence: 3, discipline: 2 },
        outcome: 'They respect your candor. Door stays open.',
      },
    ],
  },
  {
    id: 'intern_11',
    stage: 'intern',
    title: 'Imposter Syndrome Returns',
    description: "Senior devs discuss concepts you don't understand. Panic sets in.",
    choices: [
      {
        id: 'ask_questions',
        text: 'Ask questions and admit gaps',
        effects: { intelligence: 8, charisma: 5, discipline: 4 },
        outcome: 'Everyone was happy to explain. You level up.',
      },
      {
        id: 'pretend_understand',
        text: 'Nod along and Google it later',
        effects: { intelligence: 4, discipline: 2, charisma: -2 },
        outcome: 'Figured it out eventually. Stressful though.',
      },
    ],
  },
  {
    id: 'intern_12',
    stage: 'intern',
    title: 'Networking Event',
    description: "Your company is hosting a mixer. You're terrible at small talk.",
    choices: [
      {
        id: 'force_networking',
        text: 'Push through discomfort and network',
        effects: { charisma: 8, discipline: 5, fitness: -2 },
        outcome: 'Awkward at first but made great connections.',
      },
      {
        id: 'skip_event',
        text: 'Skip it and work on your project',
        effects: { intelligence: 5, discipline: 4, charisma: -4 },
        outcome: 'Missed opportunities but shipped features.',
      },
    ],
  },
  {
    id: 'intern_13',
    stage: 'intern',
    title: 'Health Insurance Decision',
    description: 'Your company offers different insurance plans. It is confusing.',
    choices: [
      {
        id: 'comprehensive',
        text: 'Go with comprehensive coverage',
        effects: { money: -5, fitness: 4, discipline: 3 },
        outcome: 'Peace of mind is worth it.',
      },
      {
        id: 'minimal_coverage',
        text: 'Choose minimal coverage, save money',
        effects: { money: 5, fitness: -2 },
        outcome: 'More cash now. Risky bet on your health.',
      },
    ],
  },
  {
    id: 'intern_14',
    stage: 'intern',
    title: 'Open Source Contribution',
    description: 'You find a bug in a popular library. Fixing it would take a weekend.',
    choices: [
      {
        id: 'contribute_fix',
        text: 'Submit a fix and contribute',
        effects: { intelligence: 8, charisma: 6, fitness: -3 },
        outcome: 'PR merged. Your name is in the commit history forever.',
      },
      {
        id: 'just_report',
        text: 'Just file an issue report',
        effects: { intelligence: 3, discipline: 2 },
        outcome: 'Helped out without the heavy lift.',
      },
    ],
  },
  {
    id: 'intern_15',
    stage: 'intern',
    title: 'Relocation Offer',
    description: 'Company offers permanent role but requires relocating to another city.',
    choices: [
      {
        id: 'relocate',
        text: 'Take the leap and move',
        effects: { money: 8, intelligence: 4, charisma: -3, fitness: 2 },
        outcome: 'New city, new life. Adventure awaits.',
      },
      {
        id: 'stay_local',
        text: 'Decline and look for local opportunities',
        effects: { charisma: 5, discipline: 3 },
        outcome: 'Comfort zone preserved. Other doors will open.',
      },
    ],
  },
  {
    id: 'intern_16',
    stage: 'intern',
    title: 'Code Review Roast',
    description: 'A senior dev publicly tears apart your code in a review.',
    choices: [
      {
        id: 'take_feedback',
        text: 'Thank them and improve',
        effects: { intelligence: 8, discipline: 6, charisma: 3 },
        outcome: 'Turned harsh feedback into rapid growth.',
      },
      {
        id: 'defend_code',
        text: 'Defend your implementation choices',
        effects: { intelligence: 3, charisma: -4, discipline: 2 },
        outcome: 'Lost that battle but learned diplomacy.',
      },
    ],
  },
  {
    id: 'intern_17',
    stage: 'intern',
    title: 'Startup Recruiter',
    description: 'A fast-growing startup reaches out. High risk, high reward equity.',
    choices: [
      {
        id: 'join_startup',
        text: 'Take the startup leap',
        effects: { investments: 10, intelligence: 6, money: -4, charisma: 4 },
        outcome: 'Joined the chaos. Either genius or disaster.',
      },
      {
        id: 'stay_corporate',
        text: 'Stick with stable corporate track',
        effects: { money: 5, discipline: 4, investments: 2 },
        outcome: 'Safe path. Stability has its rewards.',
      },
    ],
  },
  {
    id: 'intern_18',
    stage: 'intern',
    title: 'Conference Speaking',
    description: 'You are invited to give a lightning talk at a local tech meetup.',
    choices: [
      {
        id: 'accept_talk',
        text: 'Accept despite the terror',
        effects: { charisma: 10, intelligence: 5, fitness: -2 },
        outcome: 'Nerves of steel. Great reception.',
      },
      {
        id: 'decline_talk',
        text: 'Too scary, decline politely',
        effects: { discipline: 2, charisma: -3 },
        outcome: 'Comfort zone intact. Growth opportunity missed.',
      },
    ],
  },
]

// ============================================================================
// EMPLOYEE EVENTS (18 events)
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
  {
    id: 'employee_5',
    stage: 'employee',
    title: 'Team Lead Offer',
    description: 'You are offered a team lead role. More responsibility, same pay initially.',
    choices: [
      {
        id: 'accept_lead',
        text: 'Accept the challenge',
        effects: { charisma: 8, intelligence: 5, discipline: 6, fitness: -3 },
        outcome: 'Leadership journey begins. Steep learning curve.',
      },
      {
        id: 'decline_lead',
        text: 'Stay as an individual contributor',
        effects: { intelligence: 4, discipline: 3, fitness: 2 },
        outcome: 'Happy in your lane. Deep expertise builds.',
      },
    ],
  },
  {
    id: 'employee_6',
    stage: 'employee',
    title: 'Layoff Survivor',
    description: "Company did layoffs. You survived but friends didn't. Workload doubled.",
    choices: [
      {
        id: 'absorb_work',
        text: 'Absorb the extra work, prove value',
        effects: { discipline: 10, intelligence: 5, fitness: -6, charisma: 3 },
        outcome: 'Survived and proved indispensable. Exhausted.',
      },
      {
        id: 'push_back',
        text: 'Push back on unrealistic expectations',
        effects: { charisma: 4, discipline: 3, fitness: 2 },
        outcome: 'Maintained boundaries. Some tension with management.',
      },
      {
        id: 'start_looking',
        text: 'Quietly start job searching',
        effects: { intelligence: 4, discipline: 2, charisma: 2 },
        outcome: 'Options are always good. Never hurts to look.',
      },
    ],
  },
  {
    id: 'employee_7',
    stage: 'employee',
    title: 'Remote Work Drama',
    description: 'Company mandates return to office. You love working from home.',
    choices: [
      {
        id: 'comply_return',
        text: 'Comply and return to office',
        effects: { discipline: 5, charisma: 4, fitness: -4, money: -3 },
        outcome: 'Back to commuting. Adapting slowly.',
      },
      {
        id: 'negotiate_hybrid',
        text: 'Negotiate a hybrid arrangement',
        effects: { charisma: 6, discipline: 4, intelligence: 2 },
        outcome: 'Compromised successfully. 3 days remote.',
      },
      {
        id: 'job_search',
        text: 'Find a fully remote job elsewhere',
        effects: { money: 5, fitness: 4, charisma: -3, discipline: 3 },
        outcome: 'Freedom regained at a new company.',
      },
    ],
  },
  {
    id: 'employee_8',
    stage: 'employee',
    title: 'Equity vs Cash',
    description: 'Company offers new compensation: more equity but less cash.',
    choices: [
      {
        id: 'take_equity',
        text: 'Bet on the company with equity',
        effects: { investments: 10, money: -5, discipline: 4 },
        outcome: 'Long-term bet placed. Belief in the mission.',
      },
      {
        id: 'keep_cash',
        text: 'Prefer cash stability',
        effects: { money: 5, discipline: 3 },
        outcome: 'Cash in hand beats promises. Safe choice.',
      },
    ],
  },
  {
    id: 'employee_9',
    stage: 'employee',
    title: 'Manager Conflict',
    description: 'Your new manager micromanages everything. It is driving you crazy.',
    choices: [
      {
        id: 'adapt_style',
        text: 'Adapt to their management style',
        effects: { discipline: 6, charisma: 3, fitness: -3 },
        outcome: 'Found ways to work within the system.',
      },
      {
        id: 'honest_conversation',
        text: 'Have an honest conversation',
        effects: { charisma: 5, discipline: 4, intelligence: 2 },
        outcome: 'Cleared the air. Relationship improved.',
      },
      {
        id: 'transfer_team',
        text: 'Request a team transfer',
        effects: { charisma: -3, discipline: 3, fitness: 4 },
        outcome: 'New team, fresh start. Some awkwardness remains.',
      },
    ],
  },
  {
    id: 'employee_10',
    stage: 'employee',
    title: 'Burnout Warning',
    description: "You haven't taken time off in months. Energy is depleting.",
    choices: [
      {
        id: 'take_vacation',
        text: 'Take a proper two-week vacation',
        effects: { fitness: 10, charisma: 4, discipline: -2 },
        outcome: 'Came back recharged. Should have done this sooner.',
      },
      {
        id: 'staycation',
        text: 'Take a few mental health days',
        effects: { fitness: 5, discipline: 2, charisma: 2 },
        outcome: 'Quick recharge. Better than nothing.',
      },
      {
        id: 'push_through',
        text: 'Power through, vacation can wait',
        effects: { discipline: 4, fitness: -8, charisma: -3 },
        outcome: 'Still standing but barely. Something has to give.',
      },
    ],
  },
  {
    id: 'employee_11',
    stage: 'employee',
    title: 'Industry Conference',
    description: 'Big industry conference coming up. Company can sponsor attendance.',
    choices: [
      {
        id: 'attend_conf',
        text: 'Go and network aggressively',
        effects: { charisma: 10, intelligence: 6, money: -3 },
        outcome: 'Made industry connections. Ideas flowing.',
      },
      {
        id: 'watch_online',
        text: 'Watch the sessions online instead',
        effects: { intelligence: 4, discipline: 2 },
        outcome: 'Got the content, missed the hallway conversations.',
      },
    ],
  },
  {
    id: 'employee_12',
    stage: 'employee',
    title: 'Side Hustle Discovery',
    description: 'Your employer found out about your weekend consulting gig.',
    choices: [
      {
        id: 'be_transparent',
        text: 'Be fully transparent about it',
        effects: { charisma: 5, discipline: 4, money: 3 },
        outcome: 'They are okay with it as long as it does not compete.',
      },
      {
        id: 'shut_it_down',
        text: 'End the side hustle immediately',
        effects: { discipline: 6, investments: -3 },
        outcome: 'Closed one door but kept the day job secure.',
      },
    ],
  },
  {
    id: 'employee_13',
    stage: 'employee',
    title: 'Technical Debt Battle',
    description: 'Legacy code is slowing everything down. You propose a major refactor.',
    choices: [
      {
        id: 'fight_for_refactor',
        text: 'Push hard for the refactor project',
        effects: { intelligence: 8, discipline: 6, charisma: -2 },
        outcome: 'Won the battle. Months of cleanup ahead.',
      },
      {
        id: 'incremental_fix',
        text: 'Propose incremental improvements',
        effects: { intelligence: 5, charisma: 4, discipline: 3 },
        outcome: 'Slow and steady approach approved.',
      },
    ],
  },
  {
    id: 'employee_14',
    stage: 'employee',
    title: 'Competitor Recruiter',
    description: 'A competitor offers 40% more salary. Your current company cannot match.',
    choices: [
      {
        id: 'take_offer',
        text: 'Accept the competitor offer',
        effects: { money: 15, charisma: -4, intelligence: 3 },
        outcome: 'Money talks. Bridges may burn.',
      },
      {
        id: 'stay_loyal',
        text: 'Stay for the team and culture',
        effects: { charisma: 8, discipline: 5 },
        outcome: 'Loyalty noted. Long-term relationships matter.',
      },
      {
        id: 'negotiate_other_perks',
        text: 'Negotiate for non-monetary perks',
        effects: { money: 3, charisma: 5, fitness: 3 },
        outcome: 'Got more vacation and flexibility instead.',
      },
    ],
  },
  {
    id: 'employee_15',
    stage: 'employee',
    title: 'Patent Opportunity',
    description: 'Your idea could be patented. Company would own it but you get recognition.',
    choices: [
      {
        id: 'submit_patent',
        text: 'Submit the patent application',
        effects: { intelligence: 8, charisma: 6, money: 5 },
        outcome: 'Patent filed. Your name is on it. Resume gold.',
      },
      {
        id: 'keep_quiet',
        text: 'Keep the idea to yourself for later',
        effects: { intelligence: 4, investments: 3 },
        outcome: 'Saved it for your own future ventures.',
      },
    ],
  },
  {
    id: 'employee_16',
    stage: 'employee',
    title: 'Work BFF Leaves',
    description: 'Your closest work friend is leaving for another company.',
    choices: [
      {
        id: 'stay_focused',
        text: 'Stay focused on your own path',
        effects: { discipline: 6, charisma: -2, intelligence: 3 },
        outcome: 'Sad to see them go but your path is clear.',
      },
      {
        id: 'explore_together',
        text: 'Ask if their new company is hiring',
        effects: { charisma: 5, intelligence: 3, money: 4 },
        outcome: 'Got a referral. Options expanding.',
      },
    ],
  },
  {
    id: 'employee_17',
    stage: 'employee',
    title: 'MBA Consideration',
    description: 'You are thinking about getting an MBA. Big investment of time and money.',
    choices: [
      {
        id: 'start_mba',
        text: 'Enroll in a part-time MBA program',
        effects: { intelligence: 10, money: -12, discipline: 8, fitness: -4 },
        outcome: 'Academic grind begins again. Investment in future.',
      },
      {
        id: 'skip_mba',
        text: 'Learn through experience instead',
        effects: { discipline: 4, intelligence: 3, money: 3 },
        outcome: 'Experience is a teacher too. Saved the tuition.',
      },
    ],
  },
  {
    id: 'employee_18',
    stage: 'employee',
    title: 'Ethical Dilemma',
    description: 'You discover your company is doing something legally gray.',
    choices: [
      {
        id: 'whistleblow',
        text: 'Report it to authorities',
        effects: { discipline: 10, charisma: -8, money: -5 },
        outcome: 'Did the right thing. Career got complicated.',
      },
      {
        id: 'raise_internally',
        text: 'Raise concerns internally first',
        effects: { discipline: 6, charisma: 3, intelligence: 2 },
        outcome: 'Started internal dialogue. Wait and see approach.',
      },
      {
        id: 'look_away',
        text: 'Not your problem, focus on your work',
        effects: { discipline: -5, money: 3 },
        outcome: 'Cognitive dissonance is uncomfortable.',
      },
    ],
  },
]

// ============================================================================
// SIDE HUSTLER EVENTS (18 events)
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
  {
    id: 'side_hustler_5',
    stage: 'side_hustler',
    title: 'Viral Moment',
    description: 'Your product gets mentioned by a popular influencer. Traffic exploding.',
    choices: [
      {
        id: 'capitalize_fast',
        text: 'Capitalize immediately, scale up',
        effects: { money: 15, investments: 8, fitness: -6, discipline: 5 },
        outcome: 'Rode the wave. Exhausting but lucrative.',
      },
      {
        id: 'careful_growth',
        text: 'Manage growth carefully, sustainable pace',
        effects: { money: 8, discipline: 6, intelligence: 4 },
        outcome: 'Steady scaling. Some opportunity cost.',
      },
    ],
  },
  {
    id: 'side_hustler_6',
    stage: 'side_hustler',
    title: 'Copycat Competition',
    description: 'Someone launched an exact clone of your product. They are aggressive.',
    choices: [
      {
        id: 'innovate_faster',
        text: 'Innovate faster, stay ahead',
        effects: { intelligence: 10, discipline: 8, fitness: -5 },
        outcome: 'Competition fueled innovation. You win on quality.',
      },
      {
        id: 'legal_action',
        text: 'Consider legal action',
        effects: { money: -8, charisma: -3, discipline: 4 },
        outcome: 'Legal battle begins. Draining but necessary.',
      },
      {
        id: 'differentiate',
        text: 'Pivot to a different niche',
        effects: { intelligence: 7, charisma: 4, investments: 5 },
        outcome: 'Found blue ocean. Competition becomes irrelevant.',
      },
    ],
  },
  {
    id: 'side_hustler_7',
    stage: 'side_hustler',
    title: 'Partner Proposal',
    description: 'Someone wants to become your business partner. They bring capital.',
    choices: [
      {
        id: 'accept_partner',
        text: 'Accept and split equity',
        effects: { money: 10, investments: 8, charisma: 5, discipline: -3 },
        outcome: 'Partnership formed. Now you answer to someone.',
      },
      {
        id: 'decline_partner',
        text: 'Decline, maintain full ownership',
        effects: { discipline: 8, intelligence: 4 },
        outcome: 'Solo path. All the risk, all the reward.',
      },
    ],
  },
  {
    id: 'side_hustler_8',
    stage: 'side_hustler',
    title: 'Product Hunt Launch',
    description: 'Ready to launch on Product Hunt. Big opportunity but high stakes.',
    choices: [
      {
        id: 'launch_now',
        text: 'Launch and go all out on promotion',
        effects: { charisma: 10, investments: 8, fitness: -4 },
        outcome: 'Top 5 of the day! Massive exposure.',
      },
      {
        id: 'delay_polish',
        text: 'Delay to polish the product more',
        effects: { intelligence: 6, discipline: 5 },
        outcome: 'Better product, missed the momentum.',
      },
    ],
  },
  {
    id: 'side_hustler_9',
    stage: 'side_hustler',
    title: 'Customer Complaint',
    description: 'An angry customer is threatening to destroy your reputation online.',
    choices: [
      {
        id: 'go_above_beyond',
        text: 'Go above and beyond to fix it',
        effects: { charisma: 8, money: -4, discipline: 5 },
        outcome: 'Turned hater into biggest fan. Crisis averted.',
      },
      {
        id: 'stand_ground',
        text: 'Stand your ground, they are being unreasonable',
        effects: { discipline: 4, charisma: -6 },
        outcome: 'Negative review posted. Thick skin required.',
      },
    ],
  },
  {
    id: 'side_hustler_10',
    stage: 'side_hustler',
    title: 'Pricing Dilemma',
    description: 'Users love your product but complain about pricing.',
    choices: [
      {
        id: 'lower_price',
        text: 'Lower prices to grow faster',
        effects: { charisma: 6, money: -3, investments: 5 },
        outcome: 'More users, less margin. Volume play.',
      },
      {
        id: 'raise_price',
        text: 'Actually, raise prices for premium positioning',
        effects: { money: 8, charisma: -2, discipline: 5 },
        outcome: 'Lost some users, kept the serious ones.',
      },
      {
        id: 'freemium_model',
        text: 'Introduce a freemium tier',
        effects: { intelligence: 6, charisma: 4, investments: 4 },
        outcome: 'Balancing act begins. Learning funnel economics.',
      },
    ],
  },
  {
    id: 'side_hustler_11',
    stage: 'side_hustler',
    title: 'Tech Stack Crisis',
    description: 'Your MVP tech stack is not scaling. Need to rewrite or patch.',
    choices: [
      {
        id: 'full_rewrite',
        text: 'Commit to a full rewrite',
        effects: { intelligence: 10, discipline: 8, money: -5, fitness: -4 },
        outcome: 'Months of work but solid foundation now.',
      },
      {
        id: 'patch_forward',
        text: 'Patch it and keep moving',
        effects: { intelligence: 4, money: 3, discipline: -2 },
        outcome: 'Tech debt accumulating. Faster for now.',
      },
    ],
  },
  {
    id: 'side_hustler_12',
    stage: 'side_hustler',
    title: 'Investor Interest',
    description: 'An angel investor reaches out. Interested in early stage.',
    choices: [
      {
        id: 'take_meeting',
        text: 'Take the meeting and pitch',
        effects: { charisma: 8, investments: 10, money: 5 },
        outcome: 'Promising conversation. Due diligence begins.',
      },
      {
        id: 'bootstrap_more',
        text: 'Not ready, continue bootstrapping',
        effects: { discipline: 6, intelligence: 4 },
        outcome: 'Maintained independence. Growing organically.',
      },
    ],
  },
  {
    id: 'side_hustler_13',
    stage: 'side_hustler',
    title: 'Feature Creep',
    description: 'Users keep requesting features. Product is becoming bloated.',
    choices: [
      {
        id: 'say_no',
        text: 'Learn to say no, stay focused',
        effects: { discipline: 8, intelligence: 5, charisma: -2 },
        outcome: 'Maintained product focus. Some users unhappy.',
      },
      {
        id: 'build_everything',
        text: 'Build what users want',
        effects: { intelligence: 3, charisma: 6, discipline: -4 },
        outcome: 'Feature-rich but complex. Identity blurring.',
      },
    ],
  },
  {
    id: 'side_hustler_14',
    stage: 'side_hustler',
    title: 'Imposter Syndrome Peak',
    description: 'Successful founders make it look easy. You feel like a fraud.',
    choices: [
      {
        id: 'join_community',
        text: 'Join a founder community for support',
        effects: { charisma: 8, discipline: 5, fitness: 3 },
        outcome: 'Realized everyone feels this way. Community helps.',
      },
      {
        id: 'double_down',
        text: 'Prove yourself wrong with results',
        effects: { discipline: 10, intelligence: 6, fitness: -4 },
        outcome: 'Channeled doubt into productivity. Numbers speak.',
      },
    ],
  },
  {
    id: 'side_hustler_15',
    stage: 'side_hustler',
    title: 'Trademark Issue',
    description: 'A big company claims your product name infringes their trademark.',
    choices: [
      {
        id: 'fight_trademark',
        text: 'Fight it, you were here first',
        effects: { money: -10, discipline: 6, charisma: -3 },
        outcome: 'Legal fees mounting. Stressful battle.',
      },
      {
        id: 'rebrand',
        text: 'Rebrand and move on',
        effects: { intelligence: 5, charisma: 4, money: -3 },
        outcome: 'New name, fresh start. Sometimes retreat is smart.',
      },
    ],
  },
  {
    id: 'side_hustler_16',
    stage: 'side_hustler',
    title: 'Acquisition Interest',
    description: 'A bigger company wants to acquire your side project.',
    choices: [
      {
        id: 'sell_early',
        text: 'Take the offer and cash out',
        effects: { money: 20, investments: 5, discipline: -5 },
        outcome: 'Life-changing check. What now?',
      },
      {
        id: 'keep_building',
        text: 'Decline and keep building',
        effects: { discipline: 10, intelligence: 6, charisma: 5 },
        outcome: 'Bet on yourself. Bigger things ahead.',
      },
    ],
  },
  {
    id: 'side_hustler_17',
    stage: 'side_hustler',
    title: 'Remote Team Building',
    description: 'You can afford to hire your first contractor.',
    choices: [
      {
        id: 'hire_dev',
        text: 'Hire a developer',
        effects: { intelligence: 8, money: -6, investments: 5 },
        outcome: 'Building capacity. Learning to manage.',
      },
      {
        id: 'hire_marketing',
        text: 'Hire for marketing/sales',
        effects: { charisma: 8, money: -6, investments: 5 },
        outcome: 'Growth focus. Learning distribution.',
      },
      {
        id: 'stay_solo',
        text: 'Stay solo for now',
        effects: { discipline: 5, money: 3 },
        outcome: 'Lean and mean. All profit yours.',
      },
    ],
  },
  {
    id: 'side_hustler_18',
    stage: 'side_hustler',
    title: 'Work-Life Explosion',
    description: 'Your partner gives an ultimatum: them or the side hustle.',
    choices: [
      {
        id: 'prioritize_relationship',
        text: 'Scale back hustle, prioritize relationship',
        effects: { charisma: 8, fitness: 5, investments: -5, discipline: -3 },
        outcome: 'Relationship saved. Hustle slowed.',
      },
      {
        id: 'choose_hustle',
        text: 'The hustle is the priority right now',
        effects: { discipline: 8, investments: 6, charisma: -8 },
        outcome: 'Relationship ended. Focus intensifies.',
      },
      {
        id: 'find_balance',
        text: 'Commit to finding a better balance',
        effects: { discipline: 5, charisma: 4, intelligence: 3 },
        outcome: 'Trying to have it all. Exhausting but possible.',
      },
    ],
  },
]

// ============================================================================
// ENTREPRENEUR EVENTS (18 events)
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
  {
    id: 'entrepreneur_5',
    stage: 'entrepreneur',
    title: 'Co-founder Conflict',
    description: "You and your co-founder disagree on the company's direction.",
    choices: [
      {
        id: 'compromise',
        text: 'Find a compromise',
        effects: { charisma: 6, discipline: 4, intelligence: 3 },
        outcome: 'Middle ground found. Partnership preserved.',
      },
      {
        id: 'stand_firm',
        text: 'Stand firm on your vision',
        effects: { discipline: 8, charisma: -5, intelligence: 4 },
        outcome: 'Your way or highway. Co-founder tensions rise.',
      },
      {
        id: 'buyout',
        text: 'Propose a buyout',
        effects: { money: -10, discipline: 6, investments: 5 },
        outcome: 'Expensive but now you have full control.',
      },
    ],
  },
  {
    id: 'entrepreneur_6',
    stage: 'entrepreneur',
    title: 'Product Launch Disaster',
    description: 'Your big launch had major bugs. Users are furious.',
    choices: [
      {
        id: 'war_room',
        text: 'All-hands war room until fixed',
        effects: { intelligence: 8, discipline: 10, fitness: -8 },
        outcome: 'Fixed in 48 hours. Team bonded through crisis.',
      },
      {
        id: 'transparent_comms',
        text: 'Transparent communication with users',
        effects: { charisma: 8, discipline: 5, intelligence: 4 },
        outcome: 'Honesty appreciated. Trust maintained.',
      },
    ],
  },
  {
    id: 'entrepreneur_7',
    stage: 'entrepreneur',
    title: 'Key Employee Leaving',
    description: 'Your best engineer got an offer from a big tech company.',
    choices: [
      {
        id: 'counter_offer',
        text: 'Make a strong counter-offer',
        effects: { money: -8, investments: 5, charisma: 4 },
        outcome: 'They stayed. Expensive but worth it.',
      },
      {
        id: 'let_go',
        text: 'Wish them well and let them go',
        effects: { charisma: 6, discipline: 3, intelligence: -3 },
        outcome: 'Graceful exit. Need to find replacement fast.',
      },
    ],
  },
  {
    id: 'entrepreneur_8',
    stage: 'entrepreneur',
    title: 'Partnership Opportunity',
    description: 'A larger company wants a strategic partnership.',
    choices: [
      {
        id: 'accept_partnership',
        text: 'Accept and integrate',
        effects: { investments: 10, charisma: 6, money: 8 },
        outcome: 'Access to their customers. Growth accelerates.',
      },
      {
        id: 'negotiate_terms',
        text: 'Negotiate better terms first',
        effects: { intelligence: 6, discipline: 5, charisma: 3 },
        outcome: 'Better deal secured. Patience paid off.',
      },
      {
        id: 'decline_partnership',
        text: 'Decline to maintain independence',
        effects: { discipline: 7, intelligence: 4 },
        outcome: 'Independence preserved. Slower path.',
      },
    ],
  },
  {
    id: 'entrepreneur_9',
    stage: 'entrepreneur',
    title: 'Runway Pressure',
    description: 'Burn rate is high. Six months of runway left.',
    choices: [
      {
        id: 'cut_costs',
        text: 'Aggressive cost cutting',
        effects: { money: 10, charisma: -5, discipline: 6 },
        outcome: 'Runway extended. Team morale took a hit.',
      },
      {
        id: 'raise_emergency',
        text: 'Emergency fundraise',
        effects: { investments: 8, money: 5, charisma: 4 },
        outcome: 'Bridge round secured. Dilution hurts.',
      },
      {
        id: 'revenue_push',
        text: 'All-out push on revenue',
        effects: { money: 8, discipline: 10, fitness: -5 },
        outcome: 'Sales focus pays off. Breathing room gained.',
      },
    ],
  },
  {
    id: 'entrepreneur_10',
    stage: 'entrepreneur',
    title: 'International Expansion',
    description: 'Opportunity to expand to European market.',
    choices: [
      {
        id: 'expand_europe',
        text: 'Go for European expansion',
        effects: { investments: 10, intelligence: 6, money: -8 },
        outcome: 'New market entered. Compliance headaches abound.',
      },
      {
        id: 'focus_domestic',
        text: 'Focus on domestic market first',
        effects: { discipline: 6, money: 5 },
        outcome: 'Strengthened home base. Europe can wait.',
      },
    ],
  },
  {
    id: 'entrepreneur_11',
    stage: 'entrepreneur',
    title: 'PR Crisis',
    description: 'Negative press about your company going viral.',
    choices: [
      {
        id: 'pr_blitz',
        text: 'Launch aggressive PR counter-campaign',
        effects: { charisma: 5, money: -6, discipline: 4 },
        outcome: 'Narrative somewhat controlled. Expensive lesson.',
      },
      {
        id: 'stay_quiet',
        text: 'Stay quiet and let it blow over',
        effects: { discipline: 5, charisma: -4 },
        outcome: 'It eventually passed. Some reputation damage.',
      },
      {
        id: 'address_directly',
        text: 'Address concerns directly and honestly',
        effects: { charisma: 8, discipline: 6, intelligence: 3 },
        outcome: 'Transparency won people over. Crisis turned opportunity.',
      },
    ],
  },
  {
    id: 'entrepreneur_12',
    stage: 'entrepreneur',
    title: 'Board Disagreement',
    description: 'Your board wants you to fire a popular executive.',
    choices: [
      {
        id: 'follow_board',
        text: 'Follow board recommendation',
        effects: { money: 5, charisma: -6, discipline: 4 },
        outcome: 'Difficult decision made. Team trust shaken.',
      },
      {
        id: 'defend_executive',
        text: 'Defend the executive',
        effects: { charisma: 6, discipline: 5, investments: -3 },
        outcome: 'Won this battle. Board relationship strained.',
      },
    ],
  },
  {
    id: 'entrepreneur_13',
    stage: 'entrepreneur',
    title: 'Technical Debt Reckoning',
    description: 'Years of quick fixes are haunting you. System is fragile.',
    choices: [
      {
        id: 'major_refactor',
        text: 'Major refactor, pause features',
        effects: { intelligence: 10, discipline: 8, money: -5 },
        outcome: 'Solid foundation rebuilt. Painful pause.',
      },
      {
        id: 'hire_experts',
        text: 'Hire consulting experts to help',
        effects: { intelligence: 6, money: -10, discipline: 4 },
        outcome: 'Expert help accelerated the fix. Expensive.',
      },
    ],
  },
  {
    id: 'entrepreneur_14',
    stage: 'entrepreneur',
    title: 'Talent War',
    description: 'Competing for talent against companies with deeper pockets.',
    choices: [
      {
        id: 'equity_heavy',
        text: 'Offer equity-heavy compensation',
        effects: { investments: 8, charisma: 6, money: 3 },
        outcome: 'Attracted believers. Dilution continues.',
      },
      {
        id: 'culture_sell',
        text: 'Sell the mission and culture',
        effects: { charisma: 10, discipline: 5, intelligence: 3 },
        outcome: 'Right people joined for right reasons.',
      },
    ],
  },
  {
    id: 'entrepreneur_15',
    stage: 'entrepreneur',
    title: 'Customer Concentration',
    description: 'One customer is 40% of revenue. They want better terms.',
    choices: [
      {
        id: 'give_in',
        text: 'Give them what they want',
        effects: { money: -3, charisma: 4, discipline: -2 },
        outcome: 'Kept the customer. Margin pressure.',
      },
      {
        id: 'diversify_push',
        text: 'Refuse and push to diversify',
        effects: { discipline: 8, intelligence: 6, money: -5 },
        outcome: 'Risky but necessary. Finding new customers.',
      },
    ],
  },
  {
    id: 'entrepreneur_16',
    stage: 'entrepreneur',
    title: 'Imposter Syndrome at Scale',
    description: 'Company is growing but you feel unqualified to lead it.',
    choices: [
      {
        id: 'executive_coach',
        text: 'Hire an executive coach',
        effects: { intelligence: 8, charisma: 6, money: -4, discipline: 5 },
        outcome: 'Coach helped you level up. Growth mindset.',
      },
      {
        id: 'hire_coo',
        text: 'Hire experienced COO to complement you',
        effects: { money: -8, intelligence: 5, investments: 6 },
        outcome: 'Complementary skills. Delegation improves.',
      },
    ],
  },
  {
    id: 'entrepreneur_17',
    stage: 'entrepreneur',
    title: 'Patent Troll',
    description: 'A company with vague patents is threatening to sue.',
    choices: [
      {
        id: 'settle',
        text: 'Settle quickly to avoid distraction',
        effects: { money: -8, discipline: 3 },
        outcome: 'Paid the toll. Back to building.',
      },
      {
        id: 'fight_troll',
        text: 'Fight it on principle',
        effects: { money: -12, discipline: 8, charisma: 4 },
        outcome: 'Long battle but won. Established precedent.',
      },
    ],
  },
  {
    id: 'entrepreneur_18',
    stage: 'entrepreneur',
    title: 'Scaling Culture',
    description: 'Company culture is diluting as you hire fast.',
    choices: [
      {
        id: 'slow_hiring',
        text: 'Slow down hiring, focus on culture',
        effects: { charisma: 8, discipline: 6, money: -3 },
        outcome: 'Culture preserved. Growth slowed.',
      },
      {
        id: 'culture_team',
        text: 'Create a culture and HR team',
        effects: { money: -5, charisma: 5, intelligence: 4 },
        outcome: 'Systematic approach to culture. Evolving.',
      },
    ],
  },
]

// ============================================================================
// CEO EVENTS (16 events)
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
  {
    id: 'ceo_5',
    stage: 'ceo',
    title: 'IPO Consideration',
    description: 'Bankers are pitching an IPO. Public markets beckon.',
    choices: [
      {
        id: 'go_public',
        text: 'Pursue the IPO',
        effects: { investments: 15, money: 10, discipline: -3, charisma: 8 },
        outcome: 'Public company CEO now. Quarterly pressure begins.',
      },
      {
        id: 'stay_private',
        text: 'Stay private for now',
        effects: { discipline: 8, investments: 5 },
        outcome: 'Flexibility preserved. Long-term thinking.',
      },
    ],
  },
  {
    id: 'ceo_6',
    stage: 'ceo',
    title: 'Regulatory Challenge',
    description: 'Government is scrutinizing your industry.',
    choices: [
      {
        id: 'lobby_hard',
        text: 'Invest in lobbying efforts',
        effects: { money: -10, charisma: 6, investments: 5 },
        outcome: 'Seat at the regulatory table. Influence gained.',
      },
      {
        id: 'comply_adapt',
        text: 'Focus on compliance and adaptation',
        effects: { discipline: 8, intelligence: 6, money: -3 },
        outcome: 'Played by the rules. Competitors struggle.',
      },
    ],
  },
  {
    id: 'ceo_7',
    stage: 'ceo',
    title: 'Succession Planning',
    description: "You can't run this forever. Who takes over?",
    choices: [
      {
        id: 'groom_internal',
        text: 'Groom internal successor',
        effects: { discipline: 8, charisma: 6, intelligence: 4 },
        outcome: 'Building next generation of leadership.',
      },
      {
        id: 'hire_external',
        text: 'Plan to hire external CEO eventually',
        effects: { intelligence: 5, investments: 4, discipline: 3 },
        outcome: 'Open to fresh perspectives when the time comes.',
      },
      {
        id: 'stay_forever',
        text: 'Plan to run it forever',
        effects: { discipline: -3, fitness: -4, charisma: 3 },
        outcome: 'Founder CEO until the end. Succession? What succession?',
      },
    ],
  },
  {
    id: 'ceo_8',
    stage: 'ceo',
    title: 'Market Downturn',
    description: 'Economic recession hits. Revenue dropping.',
    choices: [
      {
        id: 'layoffs',
        text: 'Conduct necessary layoffs',
        effects: { money: 10, charisma: -8, discipline: 6 },
        outcome: 'Painful but company survives. Trust shaken.',
      },
      {
        id: 'salary_cuts',
        text: 'Company-wide salary cuts instead',
        effects: { money: 6, charisma: 4, discipline: 5 },
        outcome: 'Everyone sacrificed together. Morale preserved.',
      },
      {
        id: 'double_down',
        text: 'Double down on growth',
        effects: { investments: 10, money: -8, discipline: 8 },
        outcome: 'Contrarian bet. Either genius or disaster.',
      },
    ],
  },
  {
    id: 'ceo_9',
    stage: 'ceo',
    title: 'Board Politics',
    description: 'Board members are pushing their own agenda.',
    choices: [
      {
        id: 'assert_control',
        text: 'Assert founder authority',
        effects: { discipline: 10, charisma: -4, investments: 5 },
        outcome: 'Made clear who runs the show. Some tension.',
      },
      {
        id: 'build_consensus',
        text: 'Build consensus and align',
        effects: { charisma: 8, intelligence: 5, discipline: 4 },
        outcome: 'Diplomatic approach worked. Alignment achieved.',
      },
    ],
  },
  {
    id: 'ceo_10',
    stage: 'ceo',
    title: 'Strategic Acquisition',
    description: 'Opportunity to acquire a competitor.',
    choices: [
      {
        id: 'acquire',
        text: 'Make the acquisition',
        effects: { investments: 12, money: -15, intelligence: 6 },
        outcome: 'Market share gained. Integration begins.',
      },
      {
        id: 'organic_growth',
        text: 'Focus on organic growth instead',
        effects: { discipline: 6, money: 5 },
        outcome: 'Stayed focused on core business.',
      },
    ],
  },
  {
    id: 'ceo_11',
    stage: 'ceo',
    title: 'Personal Brand',
    description: 'Advisors suggest building your personal brand as CEO.',
    choices: [
      {
        id: 'thought_leader',
        text: 'Become an industry thought leader',
        effects: { charisma: 12, intelligence: 5, fitness: -3 },
        outcome: 'Conference keynotes and media appearances. Famous now.',
      },
      {
        id: 'product_focused',
        text: 'Stay product-focused, avoid spotlight',
        effects: { discipline: 6, intelligence: 4 },
        outcome: 'Let the work speak for itself.',
      },
    ],
  },
  {
    id: 'ceo_12',
    stage: 'ceo',
    title: 'Family Tension',
    description: "Family complains you're never present.",
    choices: [
      {
        id: 'schedule_family',
        text: 'Block family time religiously',
        effects: { fitness: 6, charisma: 5, discipline: -2 },
        outcome: 'Finding balance. Family appreciates effort.',
      },
      {
        id: 'explain_phase',
        text: "Explain it's a temporary phase",
        effects: { discipline: 4, charisma: -4 },
        outcome: 'They heard that before. Tension remains.',
      },
    ],
  },
  {
    id: 'ceo_13',
    stage: 'ceo',
    title: 'Crypto Treasury',
    description: 'CFO suggests putting company treasury in crypto.',
    choices: [
      {
        id: 'crypto_treasury',
        text: 'Allocate 10% to crypto',
        effects: { investments: 12, money: -5, intelligence: 4 },
        outcome: 'Bold move. Treasury strategy evolving.',
      },
      {
        id: 'traditional_treasury',
        text: 'Keep traditional treasury management',
        effects: { discipline: 5, money: 3 },
        outcome: 'Conservative approach. Board approves.',
      },
    ],
  },
  {
    id: 'ceo_14',
    stage: 'ceo',
    title: 'Executive Team Expansion',
    description: 'Growing fast. Need to expand the C-suite.',
    choices: [
      {
        id: 'hire_star',
        text: 'Hire industry star CMO',
        effects: { money: -10, charisma: 10, investments: 6 },
        outcome: 'Star power acquired. Expectations high.',
      },
      {
        id: 'promote_internal',
        text: 'Promote from within',
        effects: { charisma: 6, discipline: 5, money: -3 },
        outcome: 'Loyalty rewarded. Learning curve acceptable.',
      },
    ],
  },
  {
    id: 'ceo_15',
    stage: 'ceo',
    title: 'Industry Award',
    description: 'Nominated for prestigious industry award.',
    choices: [
      {
        id: 'campaign',
        text: 'Campaign actively for it',
        effects: { charisma: 8, money: -3, discipline: 3 },
        outcome: 'Won the award. Great PR.',
      },
      {
        id: 'humble',
        text: 'Let merit speak for itself',
        effects: { discipline: 5, intelligence: 3 },
        outcome: "Didn't win but maintained integrity.",
      },
    ],
  },
  {
    id: 'ceo_16',
    stage: 'ceo',
    title: 'Technology Bet',
    description: 'New technology could disrupt your entire industry.',
    choices: [
      {
        id: 'embrace_tech',
        text: 'Go all-in on the new tech',
        effects: { intelligence: 12, investments: 10, money: -8 },
        outcome: 'Leading the disruption now.',
      },
      {
        id: 'wait_see',
        text: 'Wait and see how it develops',
        effects: { discipline: 5, money: 5 },
        outcome: 'Watching from sidelines. Risk of falling behind.',
      },
    ],
  },
]

// ============================================================================
// INVESTOR EVENTS (16 events)
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
  {
    id: 'investor_5',
    stage: 'investor',
    title: 'Fund Launch',
    description: 'LPs want you to launch your own fund.',
    choices: [
      {
        id: 'launch_fund',
        text: 'Launch a formal fund',
        effects: { investments: 15, charisma: 8, money: 10, discipline: -4 },
        outcome: 'Fund manager now. New responsibilities.',
      },
      {
        id: 'stay_independent',
        text: 'Continue investing independently',
        effects: { discipline: 6, investments: 5 },
        outcome: 'Freedom preserved. No LP obligations.',
      },
    ],
  },
  {
    id: 'investor_6',
    stage: 'investor',
    title: 'Portfolio Company Crisis',
    description: 'One of your investments is in trouble. They need more money.',
    choices: [
      {
        id: 'double_down',
        text: 'Double down with follow-on investment',
        effects: { investments: 8, money: -10, discipline: 5 },
        outcome: 'Showed conviction. Sinking ship or turnaround?',
      },
      {
        id: 'cut_losses',
        text: 'Cut losses and move on',
        effects: { money: -3, discipline: 6, intelligence: 3 },
        outcome: 'Painful but rational. Capital preserved.',
      },
    ],
  },
  {
    id: 'investor_7',
    stage: 'investor',
    title: 'Emerging Market',
    description: 'Opportunity to invest in emerging markets. Higher risk, higher potential.',
    choices: [
      {
        id: 'emerging_bet',
        text: 'Make significant emerging market allocation',
        effects: { investments: 12, money: -8, intelligence: 5 },
        outcome: 'Geographic diversification. New frontier.',
      },
      {
        id: 'stick_developed',
        text: 'Stick to developed markets',
        effects: { discipline: 5, investments: 3 },
        outcome: 'Stayed in comfort zone. Lower risk, lower reward.',
      },
    ],
  },
  {
    id: 'investor_8',
    stage: 'investor',
    title: 'Tax Optimization',
    description: 'Advisors suggest aggressive tax strategies.',
    choices: [
      {
        id: 'aggressive_tax',
        text: 'Pursue aggressive optimization',
        effects: { money: 10, discipline: -3, investments: 3 },
        outcome: 'Saved significantly. Staying legal but edgy.',
      },
      {
        id: 'conservative_tax',
        text: 'Stay conservative on taxes',
        effects: { money: -3, discipline: 5 },
        outcome: 'Sleep well at night. Paid your share.',
      },
    ],
  },
  {
    id: 'investor_9',
    stage: 'investor',
    title: 'Mentor Request',
    description: 'Young entrepreneurs constantly ask for your time.',
    choices: [
      {
        id: 'give_back',
        text: 'Dedicate time to mentoring',
        effects: { charisma: 10, intelligence: 4, fitness: -2 },
        outcome: 'Giving back to the ecosystem. Fulfilling.',
      },
      {
        id: 'protect_time',
        text: 'Protect your time, politely decline',
        effects: { discipline: 5, investments: 4 },
        outcome: 'Time is finite. Stayed focused.',
      },
    ],
  },
  {
    id: 'investor_10',
    stage: 'investor',
    title: 'Real Estate Diversification',
    description: 'Opportunity to diversify into commercial real estate.',
    choices: [
      {
        id: 'real_estate',
        text: 'Allocate to real estate',
        effects: { investments: 8, money: -10, discipline: 4 },
        outcome: 'Tangible assets. Portfolio diversified.',
      },
      {
        id: 'stay_liquid',
        text: 'Prefer liquid investments',
        effects: { money: 3, investments: 3 },
        outcome: 'Liquidity preserved. Flexibility maintained.',
      },
    ],
  },
  {
    id: 'investor_11',
    stage: 'investor',
    title: 'Family Office',
    description: 'Wealth is complex enough to warrant a family office.',
    choices: [
      {
        id: 'establish_fo',
        text: 'Establish family office',
        effects: { money: -8, intelligence: 6, discipline: 5, investments: 5 },
        outcome: 'Professional wealth management. New complexity.',
      },
      {
        id: 'keep_simple',
        text: 'Keep things simple',
        effects: { discipline: 4, money: 3 },
        outcome: 'Simplicity has value. Self-managed.',
      },
    ],
  },
  {
    id: 'investor_12',
    stage: 'investor',
    title: 'Book Deal',
    description: 'Publisher wants you to write about your investment philosophy.',
    choices: [
      {
        id: 'write_book',
        text: 'Write the book',
        effects: { charisma: 12, intelligence: 6, fitness: -4 },
        outcome: 'Became an author. Legacy in print.',
      },
      {
        id: 'decline_book',
        text: 'Decline, focus on investing',
        effects: { discipline: 5, investments: 5 },
        outcome: 'Let the returns be the statement.',
      },
    ],
  },
  {
    id: 'investor_13',
    stage: 'investor',
    title: 'LP Drama',
    description: 'A major LP wants to pull out of your fund.',
    choices: [
      {
        id: 'accommodate',
        text: 'Accommodate their exit',
        effects: { money: -5, charisma: 4, discipline: 3 },
        outcome: 'Maintained relationship. Some pain.',
      },
      {
        id: 'enforce_terms',
        text: 'Enforce the fund terms',
        effects: { money: 3, charisma: -5, discipline: 6 },
        outcome: 'Rules are rules. Professional but cold.',
      },
    ],
  },
  {
    id: 'investor_14',
    stage: 'investor',
    title: 'Governance Role',
    description: 'Offered a board seat at a major DAO.',
    choices: [
      {
        id: 'join_dao',
        text: 'Accept the DAO governance role',
        effects: { investments: 8, intelligence: 6, charisma: 5 },
        outcome: 'Part of decentralized governance. Interesting times.',
      },
      {
        id: 'observe_dao',
        text: 'Decline but observe from distance',
        effects: { discipline: 4, intelligence: 3 },
        outcome: 'Learning without commitment.',
      },
    ],
  },
  {
    id: 'investor_15',
    stage: 'investor',
    title: 'Media Scrutiny',
    description: 'Journalists are investigating wealthy investors like you.',
    choices: [
      {
        id: 'transparent',
        text: 'Be fully transparent',
        effects: { charisma: 6, discipline: 5 },
        outcome: 'Nothing to hide. Reputation intact.',
      },
      {
        id: 'no_comment',
        text: 'No comment, protect privacy',
        effects: { discipline: 4, charisma: -4 },
        outcome: 'Privacy preserved. Some speculation.',
      },
    ],
  },
  {
    id: 'investor_16',
    stage: 'investor',
    title: 'Generation Wealth Transfer',
    description: 'Time to think about passing wealth to next generation.',
    choices: [
      {
        id: 'early_transfer',
        text: 'Begin structured wealth transfer now',
        effects: { discipline: 8, intelligence: 5, money: -5 },
        outcome: 'Planning for legacy. Tax efficient.',
      },
      {
        id: 'delay_transfer',
        text: 'Keep control for now',
        effects: { money: 5, discipline: 3 },
        outcome: 'Maintaining control. Transfer can wait.',
      },
    ],
  },
]

// ============================================================================
// SIGMA ELITE EVENTS (15 events)
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
  {
    id: 'sigma_4',
    stage: 'sigma_elite',
    title: 'Political Influence',
    description: 'Your resources could shape policy and politics.',
    choices: [
      {
        id: 'stay_out',
        text: 'Stay out of politics',
        effects: { discipline: 6, charisma: -2 },
        outcome: 'Avoided the mess. Business focused.',
      },
      {
        id: 'influence_policy',
        text: 'Use influence for causes you believe in',
        effects: { charisma: 10, money: -8, investments: 5 },
        outcome: 'Political capital deployed. Mixed reactions.',
      },
    ],
  },
  {
    id: 'sigma_5',
    stage: 'sigma_elite',
    title: 'Space Venture',
    description: 'Opportunity to invest in commercial space exploration.',
    choices: [
      {
        id: 'go_space',
        text: 'Fund a space venture',
        effects: { investments: 15, money: -15, intelligence: 8 },
        outcome: 'Looking beyond Earth. Ultimate moonshot.',
      },
      {
        id: 'earth_first',
        text: 'Focus on earthly problems first',
        effects: { discipline: 5, charisma: 4, intelligence: 3 },
        outcome: 'Grounded approach. Plenty to fix down here.',
      },
    ],
  },
  {
    id: 'sigma_6',
    stage: 'sigma_elite',
    title: 'Media Empire',
    description: 'Opportunity to acquire or start a media company.',
    choices: [
      {
        id: 'media_mogul',
        text: 'Become a media mogul',
        effects: { charisma: 15, money: -12, investments: 8 },
        outcome: 'Controlling narratives now. Great power, great responsibility.',
      },
      {
        id: 'stay_out_media',
        text: 'Media is too messy, pass',
        effects: { discipline: 5, money: 3 },
        outcome: 'Avoided the headaches. Peace preserved.',
      },
    ],
  },
  {
    id: 'sigma_7',
    stage: 'sigma_elite',
    title: 'Longevity Research',
    description: 'Cutting-edge longevity research needs funding.',
    choices: [
      {
        id: 'fund_longevity',
        text: 'Fund longevity research',
        effects: { intelligence: 10, fitness: 8, money: -10 },
        outcome: 'Investing in extending human life. Including yours.',
      },
      {
        id: 'accept_mortality',
        text: 'Accept mortality, focus on legacy',
        effects: { discipline: 6, charisma: 5 },
        outcome: 'Some things are beyond control. Legacy matters more.',
      },
    ],
  },
  {
    id: 'sigma_8',
    stage: 'sigma_elite',
    title: 'Decentralization Champion',
    description: 'You could use your influence to advance decentralization.',
    choices: [
      {
        id: 'fund_decentralization',
        text: 'Fund decentralization projects',
        effects: { investments: 12, intelligence: 8, charisma: 6 },
        outcome: 'Building infrastructure for a decentralized future.',
      },
      {
        id: 'pragmatic',
        text: 'Stay pragmatic, use whatever works',
        effects: { discipline: 5, money: 5 },
        outcome: 'Tools are just tools. Results matter.',
      },
    ],
  },
  {
    id: 'sigma_9',
    stage: 'sigma_elite',
    title: 'Ultimate Mentorship',
    description: 'A young entrepreneur wants to dedicate years to learning from you.',
    choices: [
      {
        id: 'take_apprentice',
        text: 'Take them as an apprentice',
        effects: { charisma: 10, intelligence: 5, discipline: 3 },
        outcome: 'Passing on decades of wisdom. Legacy continues.',
      },
      {
        id: 'decline_mentorship',
        text: "Point them to resources, you're too busy",
        effects: { discipline: 4, money: 3 },
        outcome: 'Time is your scarcest resource. Boundaries necessary.',
      },
    ],
  },
  {
    id: 'sigma_10',
    stage: 'sigma_elite',
    title: 'Documentary Offer',
    description: 'Famous filmmaker wants to make a documentary about your life.',
    choices: [
      {
        id: 'allow_documentary',
        text: 'Allow full access',
        effects: { charisma: 12, discipline: -3, intelligence: 3 },
        outcome: 'Story told to the world. Vulnerable but authentic.',
      },
      {
        id: 'decline_documentary',
        text: 'Decline, protect privacy',
        effects: { discipline: 6, charisma: -3 },
        outcome: 'Privacy preserved. Mystique maintained.',
      },
    ],
  },
  {
    id: 'sigma_11',
    stage: 'sigma_elite',
    title: 'Climate Crisis',
    description: 'Your resources could significantly impact climate change.',
    choices: [
      {
        id: 'climate_all_in',
        text: 'Go all-in on climate solutions',
        effects: { investments: 10, charisma: 10, money: -12 },
        outcome: "Fighting for the planet's future. Defining cause.",
      },
      {
        id: 'diversified_giving',
        text: 'Diversify giving across causes',
        effects: { charisma: 6, investments: 5, money: -5 },
        outcome: 'Spreading impact across multiple fronts.',
      },
    ],
  },
  {
    id: 'sigma_12',
    stage: 'sigma_elite',
    title: 'Health Crisis',
    description: 'Despite success, your health takes a serious hit.',
    choices: [
      {
        id: 'full_recovery',
        text: 'Dedicate everything to recovery',
        effects: { fitness: 15, money: -10, discipline: 8 },
        outcome: 'Health is the ultimate wealth. Full focus on recovery.',
      },
      {
        id: 'keep_working',
        text: 'Keep working through it',
        effects: { money: 5, fitness: -10, discipline: -5 },
        outcome: 'Workaholic to the end. Body screams, mind ignores.',
      },
    ],
  },
  {
    id: 'sigma_13',
    stage: 'sigma_elite',
    title: 'Philosophy of Success',
    description: 'Asked to define your philosophy of success for a new generation.',
    choices: [
      {
        id: 'share_philosophy',
        text: 'Share openly and authentically',
        effects: { charisma: 10, intelligence: 6, discipline: 4 },
        outcome: 'Wisdom shared. Impact immeasurable.',
      },
      {
        id: 'each_own_path',
        text: 'Everyone must find their own path',
        effects: { discipline: 5, intelligence: 4 },
        outcome: 'Refused to prescribe. Autonomy respected.',
      },
    ],
  },
  {
    id: 'sigma_14',
    stage: 'sigma_elite',
    title: 'Ultimate Competition',
    description: 'A new player enters your space with unlimited resources.',
    choices: [
      {
        id: 'compete_fiercely',
        text: 'Compete fiercely, defend your position',
        effects: { discipline: 10, intelligence: 8, fitness: -5 },
        outcome: 'Back to war mode. Competition fuel.',
      },
      {
        id: 'collaborate',
        text: 'Find ways to collaborate',
        effects: { charisma: 8, investments: 6, intelligence: 4 },
        outcome: 'Competition into partnership. Rising tide.',
      },
      {
        id: 'move_on',
        text: "You've won enough, move to new challenges",
        effects: { discipline: 5, charisma: 4, fitness: 3 },
        outcome: 'Nothing left to prove. New horizons beckon.',
      },
    ],
  },
  {
    id: 'sigma_15',
    stage: 'sigma_elite',
    title: 'The End Game',
    description: "You've achieved everything. What now?",
    choices: [
      {
        id: 'never_retire',
        text: 'Never retire, work until the end',
        effects: { discipline: 8, investments: 5, fitness: -3 },
        outcome: 'Work is life. No regrets.',
      },
      {
        id: 'enjoy_fruits',
        text: 'Finally enjoy the fruits of labor',
        effects: { fitness: 10, charisma: 8, discipline: -4 },
        outcome: 'Living well is the best revenge. Enjoying every moment.',
      },
      {
        id: 'start_over',
        text: 'Start something completely new from scratch',
        effects: { intelligence: 8, discipline: 8, investments: 6 },
        outcome: "Beginner's mind. The journey is the destination.",
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

export function getRandomEvent(stageId: StageId, answeredEventIds: string[] = []): GameEvent | null {
  const stageEvents = getEventsForStage(stageId)
  if (stageEvents.length === 0) return null

  // Filter out already answered events
  const unansweredEvents = stageEvents.filter((event) => !answeredEventIds.includes(event.id))

  // If all events answered, reset and pick from all
  const availableEvents = unansweredEvents.length > 0 ? unansweredEvents : stageEvents

  const randomIndex = Math.floor(Math.random() * availableEvents.length)
  return availableEvents[randomIndex]
}
