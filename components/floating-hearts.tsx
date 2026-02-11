"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const generated: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 12,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.left}%`,
            opacity: heart.opacity,
            animation: `float-up ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          <Heart
            style={{ width: heart.size, height: heart.size }}
            className="fill-current"
          />
        </span>
      ))}
    </div>
  )
}
