"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Heart } from "lucide-react"

function ConfettiPiece({ index }: { index: number }) {
  const colors = [
    "hsl(346, 60%, 55%)",
    "hsl(350, 80%, 60%)",
    "hsl(0, 40%, 70%)",
    "hsl(40, 90%, 65%)",
    "hsl(0, 20%, 97%)",
  ]
  const color = colors[index % colors.length]
  const left = Math.random() * 100
  const delay = Math.random() * 2
  const duration = Math.random() * 2 + 2
  const size = Math.random() * 8 + 4
  const rotation = Math.random() * 360

  return (
    <div
      className="fixed top-0 z-50 pointer-events-none"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size * 1.5}px`,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animation: `confetti-fall ${duration}s linear ${delay}s forwards`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  )
}

export function QuestionSection() {
  const [answered, setAnswered] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const dodgeCount = useRef(0)

  const dodgeButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const button = noButtonRef.current.getBoundingClientRect()

    const maxX = container.width - button.width - 20
    const maxY = container.height - button.height - 20

    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2

    setNoPosition({ x: newX, y: newY })
    setHasMoved(true)
    dodgeCount.current += 1
  }, [])

  const handleYes = () => {
    setAnswered(true)
    setShowConfetti(true)
  }

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timeout)
    }
  }, [showConfetti])

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Please?",
    "Pretty please?",
    "With a cherry on top?",
    "You're breaking my heart!",
    "I'll be sad...",
    "Just say yes!",
  ]

  const noText = noMessages[Math.min(dodgeCount.current, noMessages.length - 1)]
  const yesScale = 1 + Math.min(dodgeCount.current * 0.08, 0.6)

  if (answered) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {showConfetti && (
          <div aria-hidden="true">
            {Array.from({ length: 80 }, (_, i) => (
              <ConfettiPiece key={i} index={i} />
            ))}
          </div>
        )}

        <div className="text-center relative z-10 animate-fade-in-up">
          <div className="text-7xl md:text-9xl mb-8 animate-pulse-heart inline-block text-primary">
            <Heart className="w-24 h-24 md:w-32 md:h-32 fill-current" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 text-balance">
            {"Yay! I knew you'd say yes!"}
          </h2>
          <p className="text-lg md:text-2xl font-sans text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            {"You just made me the happiest person in the world. I can't wait to spend this Valentine's Day with you. Here's to us, to our story, and to every beautiful chapter still to come."}
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="w-5 h-5 fill-current animate-pulse-heart" />
            <span className="font-serif text-xl italic">Forever yours</span>
            <Heart className="w-5 h-5 fill-current animate-pulse-heart" style={{ animationDelay: "0.3s" }} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center mb-12 animate-fade-in-up">
        <p className="text-lg font-sans text-muted-foreground mb-4">
          And now, the moment of truth (I know we cannot do anyth on the day but fuck 14th feb)
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground text-balance">
          {"So... Will you be "}
          <span className="text-primary">my Valentine everdyay</span>
          {"?"}
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative flex flex-col sm:flex-row items-center gap-6 w-full max-w-lg h-64 justify-center"
      >
        <button
          type="button"
          onClick={handleYes}
          className="px-10 py-4 bg-primary text-primary-foreground font-sans font-semibold text-lg rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl z-20"
          style={{ transform: `scale(${yesScale})` }}
        >
          {"Yes!"}
        </button>

        <button
          ref={noButtonRef}
          type="button"
          onMouseEnter={dodgeButton}
          onTouchStart={dodgeButton}
          onClick={dodgeButton}
          className="px-10 py-4 bg-secondary text-secondary-foreground font-sans font-semibold text-lg rounded-lg transition-all duration-300 ease-out shadow-md z-20"
          style={
            hasMoved
              ? {
                  position: "absolute",
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }
              : {}
          }
        >
          {noText}
        </button>
      </div>

      {hasMoved && (
        <p className="text-sm text-muted-foreground font-sans mt-8 animate-fade-in-up">
          {"Hehe, that button seems to have a mind of its own..."}
        </p>
      )}
    </section>
  )
}
