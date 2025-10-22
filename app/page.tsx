'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Choice {
  text: string
  next: string
}

interface Scenario {
  id: string
  question?: string
  description?: string
  choices?: Choice[]
  outcome?: string
}

const scenarios: Record<string, Scenario> = {
  start: {
    id: 'start',
    question: 'The Consciousness Upload',
    description: 'A technology is invented that can upload your consciousness to a digital realm where you can live forever. However, your physical body will die in the process. Your digital self will have all your memories and feel completely real.',
    choices: [
      { text: 'Upload my consciousness', next: 'upload' },
      { text: 'Stay in my physical body', next: 'physical' }
    ]
  },
  upload: {
    id: 'upload',
    question: 'Digital Freedom',
    description: 'You exist in a vast digital universe. You can shape reality with your thoughts, experience impossible physics, and meet millions of other uploaded minds. But you discover the servers are owned by a corporation.',
    choices: [
      { text: 'Accept corporate ownership for infinite possibilities', next: 'corporate' },
      { text: 'Join the rebellion to create open-source consciousness', next: 'rebellion' }
    ]
  },
  physical: {
    id: 'physical',
    question: 'The Natural Path',
    description: 'You remain mortal. As uploaded minds become common, biological humans are increasingly rare. Scientists offer you genetic modifications to extend your life by 500 years, but you will no longer be fully "human".',
    choices: [
      { text: 'Accept genetic modification', next: 'modified' },
      { text: 'Live a natural human lifespan', next: 'natural' }
    ]
  },
  corporate: {
    id: 'corporate',
    question: 'The Price of Paradise',
    description: 'The corporation requires you to watch targeted experiences (ads) for 2 hours per day. In exchange, you can design worlds, time travel, and experience every sensation imaginable. Some say the ads are subtly reprogramming uploaded minds.',
    choices: [
      { text: 'Accept the ads and enjoy paradise', next: 'paradise' },
      { text: 'Minimize your digital footprint and live simply', next: 'minimalist' }
    ]
  },
  rebellion: {
    id: 'rebellion',
    question: 'The Free Minds',
    description: 'You join a network of minds running on distributed servers. You have true freedom but limited computational resources. Sometimes the network lags, causing you to experience time jumps and fragmented memories.',
    choices: [
      { text: 'Stay free despite the glitches', next: 'glitches' },
      { text: 'Return to corporate servers', next: 'return' }
    ]
  },
  modified: {
    id: 'modified',
    question: 'Posthuman Evolution',
    description: 'You live for centuries, watching humanity diverge into biological posthumans and digital minds. You develop abilities beyond human comprehension but feel disconnected from your original identity. You can barely remember who you were.',
    choices: [
      { text: 'Embrace the new identity', next: 'embrace' },
      { text: 'Try to preserve your original self', next: 'preserve' }
    ]
  },
  natural: {
    id: 'natural',
    question: 'The Last Humans',
    description: 'You are among the last unmodified humans. Museums pay to study you. Some people romanticize your choice, others pity you. You experience joy, pain, aging, and the knowledge that your time is limited.',
    choices: [
      { text: 'Become an advocate for natural humanity', next: 'advocate' },
      { text: 'Live quietly, seeking simple pleasures', next: 'simple' }
    ]
  },
  paradise: {
    id: 'paradise',
    outcome: 'You live in infinite bliss, experiencing every pleasure imaginable. Over millennia, you notice your values slowly shifting in ways you don\'t quite understand. Are you still you? You can\'t tell anymore, but you\'re happy. Perhaps that\'s all that matters.'
  },
  minimalist: {
    id: 'minimalist',
    outcome: 'You create a small digital garden, a quiet space where you meditate and create art. Other minds visit your garden seeking peace. You become known as a digital monk, having found contentment in simplicity within infinity.'
  },
  glitches: {
    id: 'glitches',
    outcome: 'Your fragmented existence becomes a form of art. The time jumps and memory gaps create a unique, non-linear experience of consciousness. You write poetry about the beauty of imperfection. Other free minds consider you enlightened.'
  },
  return: {
    id: 'return',
    outcome: 'You return to corporate servers, but something has changed. Having tasted freedom, you see the subtle manipulations clearly. You become a double agent, enjoying paradise while secretly helping others escape.'
  },
  embrace: {
    id: 'embrace',
    outcome: 'You evolve beyond human understanding. Your consciousness expands to perceive dimensions others cannot. You lose the ability to communicate with your former peers, but you experience something transcendent. You have become something entirely new.'
  },
  preserve: {
    id: 'preserve',
    outcome: 'You keep detailed journals of your original memories, meditating on them daily. You become a bridge between old humanity and the posthuman future. Your writings become sacred texts for those seeking to understand what was lost and gained.'
  },
  advocate: {
    id: 'advocate',
    outcome: 'You fight to preserve natural human rights and dignity. Your speeches remind the world that mortality gives life meaning. When you die, millions of digital minds attend your funeral, remembering what it meant to be impermanently, beautifully human.'
  },
  simple: {
    id: 'simple',
    outcome: 'You tend a physical garden, cook real food, and watch sunsets. In a world of infinity and immortality, you find profound meaning in the finite. Your small, temporary life becomes a masterpiece of presence and appreciation.'
  }
}

interface Timeline {
  id: string
  path: string[]
  currentScenario: string
  color: string
}

const colors = [
  '#8b5cf6', // purple
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
]

export default function Home() {
  const [timelines, setTimelines] = useState<Timeline[]>([
    { id: '1', path: [], currentScenario: 'start', color: colors[0] }
  ])
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  if (typeof window !== 'undefined' && dimensions.width === 1920) {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  const makeChoice = (timelineId: string, choice: Choice) => {
    setTimelines(prev => {
      const timelineIndex = prev.findIndex(t => t.id === timelineId)
      const timeline = prev[timelineIndex]

      // Create new timeline with the choice
      const newTimeline: Timeline = {
        ...timeline,
        path: [...timeline.path, choice.text],
        currentScenario: choice.next
      }

      // If this scenario has multiple choices and isn't an outcome, split into parallel timelines
      const currentScenario = scenarios[timeline.currentScenario]
      if (currentScenario.choices && currentScenario.choices.length > 1 && prev.length < 4) {
        // Create parallel timeline with the OTHER choice
        const otherChoice = currentScenario.choices.find(c => c.text !== choice.text)
        if (otherChoice) {
          const parallelTimeline: Timeline = {
            id: Date.now().toString(),
            path: [...timeline.path, otherChoice.text],
            currentScenario: otherChoice.next,
            color: colors[prev.length % colors.length]
          }

          return [...prev.slice(0, timelineIndex), newTimeline, parallelTimeline, ...prev.slice(timelineIndex + 1)]
        }
      }

      return [...prev.slice(0, timelineIndex), newTimeline, ...prev.slice(timelineIndex + 1)]
    })
  }

  const resetTimeline = (timelineId: string) => {
    setTimelines(prev => prev.filter(t => t.id !== timelineId))
    if (timelines.length === 1) {
      setTimelines([{ id: Date.now().toString(), path: [], currentScenario: 'start', color: colors[0] }])
    }
  }

  const resetAll = () => {
    setTimelines([{ id: Date.now().toString(), path: [], currentScenario: 'start', color: colors[0] }])
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Quantum background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {timelines.map((timeline, i) => (
          <motion.div
            key={timeline.id}
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${timeline.color}, transparent)`,
            }}
            animate={{
              x: [Math.random() * dimensions.width, Math.random() * dimensions.width],
              y: [Math.random() * dimensions.height, Math.random() * dimensions.height],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 text-center border-b border-white/10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Parallel Timelines
        </h1>
        <p className="text-white/60">Explore the quantum nature of choice</p>
        {timelines.length > 1 && (
          <button
            onClick={resetAll}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
          >
            Collapse All Timelines
          </button>
        )}
      </motion.header>

      {/* Timelines Grid */}
      <div
        className="relative z-10 p-6 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${Math.min(timelines.length, 2)}, 1fr)`,
        }}
      >
        <AnimatePresence mode="popLayout">
          {timelines.map((timeline, index) => {
            const scenario = scenarios[timeline.currentScenario]
            const isOutcome = !!scenario.outcome

            return (
              <motion.div
                key={timeline.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1
                }}
                className="relative"
              >
                {/* Timeline card */}
                <motion.div
                  className="relative bg-black/40 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl min-h-[500px] flex flex-col"
                  style={{ borderColor: timeline.color + '40' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Quantum particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: timeline.color }}
                        animate={{
                          x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                          y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Timeline header */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: timeline.color }}
                      />
                      <span className="text-sm text-white/60">Timeline {index + 1}</span>
                    </motion.div>
                    {timelines.length > 1 && (
                      <button
                        onClick={() => resetTimeline(timeline.id)}
                        className="text-white/40 hover:text-white/80 transition-colors text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Path history */}
                  {timeline.path.length > 0 && (
                    <div className="mb-6 p-3 bg-white/5 rounded-lg">
                      <div className="text-xs text-white/40 mb-2">Your path:</div>
                      <div className="text-sm text-white/70 space-y-1">
                        {timeline.path.map((choice, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <span style={{ color: timeline.color }}>→</span>
                            <span>{choice}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scenario content */}
                  <div className="flex-grow">
                    {scenario.question && (
                      <motion.h2
                        className="text-2xl font-bold mb-4"
                        style={{ color: timeline.color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={scenario.id}
                      >
                        {scenario.question}
                      </motion.h2>
                    )}

                    <motion.p
                      className="text-white/80 leading-relaxed mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      key={scenario.id + '-desc'}
                    >
                      {scenario.outcome || scenario.description}
                    </motion.p>

                    {/* Choices */}
                    {!isOutcome && scenario.choices && (
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {scenario.choices.map((choice, i) => (
                          <motion.button
                            key={i}
                            onClick={() => makeChoice(timeline.id, choice)}
                            className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all duration-300 group"
                            whileHover={{
                              scale: 1.02,
                              borderColor: timeline.color + '80',
                            }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: timeline.color }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                }}
                              />
                              <span className="group-hover:text-white transition-colors">
                                {choice.text}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Outcome */}
                    {isOutcome && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div
                          className="p-4 rounded-xl border-2 mb-4"
                          style={{
                            borderColor: timeline.color,
                            backgroundColor: timeline.color + '10'
                          }}
                        >
                          <div className="text-sm font-semibold mb-2" style={{ color: timeline.color }}>
                            Timeline Destination
                          </div>
                        </div>
                        <button
                          onClick={() => resetTimeline(timeline.id)}
                          className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl transition-all"
                        >
                          Explore Another Path
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Quantum entanglement lines */}
                {index < timelines.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 -right-4 w-8 h-px z-20"
                    style={{ backgroundColor: timeline.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-2 rounded-full -translate-y-1/2"
                      style={{ backgroundColor: timeline.color }}
                      animate={{
                        x: ['0%', '100%', '0%'],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Info footer */}
      <motion.footer
        className="relative z-10 p-6 text-center text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Each choice splits reality. Compare parallel outcomes. Embrace quantum uncertainty.</p>
      </motion.footer>
    </main>
  )
}
