"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { Heart, MapPin, Coffee, Plane, Laugh, Sparkles } from "lucide-react"
import Image from "next/image"

interface Milestone {
  icon: React.ReactNode
  date: string
  title: string
  description: string
  image: string
}

const milestones: Milestone[] = [
  {
    icon: <Coffee className="w-5 h-5" />,
    date: "July, 2024",
    title: "The First Time We (Actually) Go Close",
    description:
      "After a turbulent but interesting summer, we finally felt closer to each other than ever before and it was then when I decided to never let you go.",
    image: "/images/1.jpg",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    date: "October, 2024",
    title: "The best date/day ever",
    description:
      "I felt closest to you in every possible way. I realized how lucky I am to have you and I wanted the day to not end :).",
    image: "/images/2.jpg",
  },
  {
    icon: <Plane className="w-5 h-5" />,
    date: "June, 2025",
    title: "Our First Trip Together",
    description:
      "New places, new memories, and the realization that travelling is just so much more fun with you. I cannot wait on going on a trip and booking our next hotel room together ;)",
    image: "/images/3.jpg",
  },
  {
    icon: <Laugh className="w-5 h-5" />,
    date: "December, 2025",
    title: "Bittersweet Goodbyes",
    description:
      "This winter trip was one of the best that I have ever had with you. I was so happy to see after being apart for the longest we have ever had and saying bye had never been harder.",
    image: "/images/4.jpg",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    date: "2026 - Inifinity",
    title: "Happily Ever After",
    description:
      "The start of the year has been rocky but I really hope that this way we got done with all the fighting/negativity of the year. I am really sorry for hurting you and not treating how you deserve at times. I am really happy that you are pushing yourself and never forget how proud I am of you everyday. To forever and ever (heart emoji hehe)",
    image: "/images/5.jpg",
  },
]

function TimelineCard({
  milestone,
  index,
}: {
  milestone: Milestone
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )

    const current = ref.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full mb-12 md:mb-16 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:gap-8`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
          {milestone.icon}
        </div>
      </div>

      {/* Card */}
      <div
        className={`w-full md:w-[calc(50%-3rem)] transition-all duration-700 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : `opacity-0 translate-y-8 ${isLeft ? "md:-translate-x-8" : "md:translate-x-8"}`
        } ${isLeft ? "md:text-right md:pr-0" : "md:text-left md:pl-0"}`}
      >
        <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border flex flex-col h-[420px] md:h-[500px]">
          <div className="relative flex-[4] min-h-0 overflow-hidden">
            <Image
              src={milestone.image || "/placeholder.svg"}
              alt={milestone.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1 md:hidden">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {milestone.icon}
              </div>
              <span className="text-xs font-sans text-muted-foreground">
                {milestone.date}
              </span>
            </div>
            <span className="hidden md:block text-xs font-sans text-muted-foreground mb-0.5">
              {milestone.date}
            </span>
            <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-1 text-balance">
              {milestone.title}
            </h3>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed line-clamp-5">
              {milestone.description}
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
    </div>
  )
}

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center text-foreground mb-4">
          Our Story So Far
        </h2>
        <p className="text-center text-muted-foreground font-sans mb-16 md:mb-24 max-w-lg mx-auto">
          Every love story is beautiful, but ours is my favorite
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          {milestones.map((milestone, index) => (
            <TimelineCard key={milestone.title} milestone={milestone} index={index} />
          ))}

          {/* End heart */}
          <div className="flex justify-center mt-8">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg animate-pulse-heart">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
          <p className="text-center text-muted-foreground font-sans mt-4 text-sm">
            You are here
          </p>
        </div>
      </div>
    </section>
  )
}
