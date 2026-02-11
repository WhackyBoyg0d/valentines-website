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
    date: "January 15, 2023",
    title: "The Day We Met",
    description:
      "Two strangers in the same place at the same time. Little did we know, this chance encounter would change everything. From the very first hello, something just felt right.",
    image: "/images/milestone-meet.jpg",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    date: "February 14, 2023",
    title: "Our First Date",
    description:
      "Nervous butterflies, endless conversations, and the moment we both knew this was something special. Time stood still and the world faded away.",
    image: "/images/milestone-date.jpg",
  },
  {
    icon: <Plane className="w-5 h-5" />,
    date: "June 20, 2023",
    title: "The First Trip Together",
    description:
      "New places, new memories, and the realization that every adventure is better with you by my side. We discovered the world together, one step at a time.",
    image: "/images/milestone-trip.jpg",
  },
  {
    icon: <Laugh className="w-5 h-5" />,
    date: "September 5, 2023",
    title: "That Inside Joke Moment",
    description:
      "You know the one. The thing that still makes us both burst out laughing no matter where we are. Nobody else gets it, and that makes it even more ours.",
    image: "/images/milestone-laugh.jpg",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    date: "And every day since...",
    title: "And Many More...",
    description:
      "Every single day with you adds another beautiful chapter to our story. The best moments are the quiet ones, the silly ones, and everything in between.",
    image: "/images/milestone-more.jpg",
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
        <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image
              src={milestone.image || "/placeholder.svg"}
              alt={milestone.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 md:p-6">
            <div
              className={`flex items-center gap-2 mb-2 md:hidden`}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {milestone.icon}
              </div>
              <span className="text-sm font-sans text-muted-foreground">
                {milestone.date}
              </span>
            </div>
            <span className="hidden md:block text-sm font-sans text-muted-foreground mb-1">
              {milestone.date}
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
              {milestone.title}
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed">
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
