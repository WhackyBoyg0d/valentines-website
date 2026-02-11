import { HeroSection } from "@/components/hero-section"
import { TimelineSection } from "@/components/timeline-section"
import { QuestionSection } from "@/components/question-section"

export default function ValentinePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <TimelineSection />
      <QuestionSection />
    </main>
  )
}
