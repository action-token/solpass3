"use client"

import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { MainDashboard } from "@/components/main-dashboard"

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnboardingComplete = () => {
    setIsLoading(true)
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false)
      setShowOnboarding(false)
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1421] flex items-center justify-center relative overflow-hidden">
        {/* Floating NFT icons in background */}
        <div className="absolute inset-0">
          {/* Top left icons */}
          <div className="absolute top-32 left-32 w-16 h-16 rounded-full bg-blue-500 opacity-30" />
          <div className="absolute top-64 left-16 w-12 h-12 rounded-full bg-purple-500 opacity-20" />

          {/* Top right icons */}
          <div className="absolute top-20 right-32 w-20 h-20 rounded-lg bg-orange-500 opacity-25" />
          <div className="absolute top-48 right-16 w-14 h-14 rounded-full bg-green-500 opacity-30" />

          {/* Bottom icons */}
          <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-lg bg-pink-500 opacity-20" />
          <div className="absolute bottom-48 right-1/3 w-18 h-18 rounded-full bg-teal-500 opacity-25" />

          {/* Center scattered */}
          <div className="absolute top-1/3 right-1/2 w-10 h-10 rounded-full bg-yellow-500 opacity-15" />
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 rounded-lg bg-red-500 opacity-20" />
        </div>

        <div className="text-center z-10">
          <div className="w-16 h-16 bg-[#2081e2] rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-10 h-10 text-white" viewBox="0 0 90 90" fill="currentColor">
              <path d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zm22.5 45c0 12.4-10.1 22.5-22.5 22.5S22.5 57.4 22.5 45 32.6 22.5 45 22.5 67.5 32.6 67.5 45z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-[#2081e2]" viewBox="0 0 90 90" fill="currentColor">
              <path d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zm22.5 45c0 12.4-10.1 22.5-22.5 22.5S22.5 57.4 22.5 45 32.6 22.5 45 22.5 67.5 32.6 67.5 45z" />
            </svg>
            solpass
          </h1>
          <div className="w-80 h-1 bg-[#1e2a3a] rounded-full mx-auto mb-6">
            <div className="h-full bg-white rounded-full animate-pulse" style={{ width: "65%" }} />
          </div>
          <p className="text-[#8a939b] text-sm tracking-[0.2em] font-mono">CHARTING INITIAL VOYAGES...</p>
        </div>
      </div>
    )
  }

  // if (showOnboarding) {
  //   return <OnboardingFlow onComplete={handleOnboardingComplete} />
  // }

  return <MainDashboard />
}
