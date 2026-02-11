"use client"

import { FloatingHearts } from "./floating-hearts"
import { ChevronDown, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 text-center px-4">
        <p className="text-lg md:text-xl font-sans text-muted-foreground mb-4 animate-fade-in-up">
          A little something, just for you...
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {"Hey You "}
          <span className="inline-block animate-pulse-heart text-primary">
            <Heart className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 fill-current inline-block" />
          </span>
        </h1>

        <p
          className="text-lg md:text-2xl font-sans text-muted-foreground max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Scroll down to take a walk through our story together
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute bottom-12 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-fade-in-up"
        style={{ animationDelay: "0.8s" }}
        aria-label="Scroll to timeline"
      >
        <span className="text-sm font-sans">Scroll Down</span>
        <ChevronDown className="w-6 h-6 animate-bounce-gentle" />
      </button>
    </section>
  )
}
