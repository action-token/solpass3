"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Choose your display currency",
      subtitle: "You can change this at any time",
      component: <CurrencySelection onNext={() => setStep(1)} />,
    },
    {
      title: "Embark on Voyages",
      subtitle: "Earn as you collect, trade, engage, and explore both NFTs and tokens on the new solpass.",
      component: <VoyagesIntro onNext={onComplete} />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0d1421] text-white relative overflow-hidden">
      {/* Background dots indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {steps.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-white" : "bg-[#353840]"}`} />
        ))}
        <div className="w-16 h-2 bg-white rounded-full ml-2" />
      </div>

      {/* Close button */}
      <button className="absolute top-8 right-8 text-[#8a939b] hover:text-white">
        <X className="w-6 h-6" />
      </button>

      {/* Skip button */}
      <button className="absolute top-8 right-20 text-[#8a939b] hover:text-white text-sm" onClick={onComplete}>
        Skip
      </button>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl w-full text-center">
          {steps[step] && (
            <>
              <h1 className="text-4xl font-bold mb-3 text-white">{steps[step].title}</h1>
              <p className="text-[#8a939b] mb-16 text-lg">{steps[step].subtitle}</p>
              {steps[step].component}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function CurrencySelection({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<"crypto" | "usd">("crypto")

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Currency Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card
          className={`p-8 cursor-pointer transition-all border-2 bg-[#1a202c] ${selected === "crypto"
            ? "border-[#2081e2] ring-2 ring-[#2081e2]/20"
            : "border-[#353840] hover:border-[#4a5568]"
            }`}
          onClick={() => setSelected("crypto")}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">Crypto</h3>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === "crypto" ? "border-[#2081e2] bg-[#2081e2]" : "border-[#8a939b]"
                }`}
            >
              {selected === "crypto" && <div className="w-3 h-3 bg-white rounded-full" />}
            </div>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-[#ff6b35] via-[#f7931e] to-[#ffb347] rounded-xl mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium text-lg mb-1">Knot</p>
            <p className="text-3xl font-bold text-white mb-1">0.89 ETH</p>
            <p className="text-[#8a939b] text-sm">Last sale • $2,241.08</p>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer transition-all border-2 bg-[#1a202c] ${selected === "usd" ? "border-[#2081e2] ring-2 ring-[#2081e2]/20" : "border-[#353840] hover:border-[#4a5568]"
            }`}
          onClick={() => setSelected("usd")}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">USD</h3>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === "usd" ? "border-[#2081e2] bg-[#2081e2]" : "border-[#8a939b]"
                }`}
            >
              {selected === "usd" && <div className="w-3 h-3 bg-white rounded-full" />}
            </div>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-[#ff6b35] via-[#f7931e] to-[#ffb347] rounded-xl mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium text-lg mb-1">Knot</p>
            <p className="text-3xl font-bold text-white mb-1">$2,241.08</p>
            <p className="text-[#8a939b] text-sm">Last sale • $2,241.08</p>
          </div>
        </Card>
      </div>

      {/* Continue Button - Now clearly visible */}
      <div className="text-center">
        <Button
          onClick={() => {
            console.log("Continue clicked with selection:", selected)
            onNext()
          }}
          className="bg-[#2081e2] hover:bg-[#1c6dd0] text-white px-16 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Continue
        </Button>
        <p className="text-[#8a939b] text-sm mt-4">
          Selected: <span className="text-white font-medium">{selected === "crypto" ? "Crypto" : "USD"}</span> • You can
          change this later
        </p>
      </div>

      {/* Debug info - remove this later */}
      <div className="mt-8 text-center">
        <p className="text-[#8a939b] text-xs">Debug: Current selection is {selected}. Click Continue to proceed.</p>
      </div>
    </div>
  )
}

function VoyagesIntro({ onNext }: { onNext: () => void }) {
  const nftIcons = [
    { color: "bg-[#10b981]", size: "w-12 h-12", position: "top-16 left-20", icon: "🌿" },
    { color: "bg-[#3b82f6]", size: "w-16 h-16", position: "top-24 left-1/3", icon: "💎" },
    { color: "bg-[#8b5cf6]", size: "w-10 h-10", position: "top-12 right-1/3", icon: "🌸" },
    { color: "bg-[#f59e0b]", size: "w-14 h-14", position: "top-32 right-24", icon: "🔥" },
    { color: "bg-[#06b6d4]", size: "w-8 h-8", position: "top-8 right-1/4", icon: "💧" },
    { color: "bg-[#ec4899]", size: "w-12 h-12", position: "top-20 left-1/2", icon: "🌺" },
    { color: "bg-[#6366f1]", size: "w-14 h-14", position: "top-6 right-1/2", icon: "⚡" },
  ]

  return (
    <div className="relative">
      {/* Floating NFT Icons */}
      {nftIcons.map((icon, i) => (
        <div
          key={i}
          className={`absolute ${icon.size} ${icon.position} ${icon.color} rounded-full flex items-center justify-center text-white opacity-80`}
          style={{
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <span className="text-lg">{icon.icon}</span>
        </div>
      ))}

      <div className="mb-16">
        <Button
          onClick={onNext}
          className="bg-[#2081e2] hover:bg-[#1c6dd0] px-16 py-4 text-lg font-semibold rounded-xl"
        >
          Game On
        </Button>
      </div>

      <div className="space-y-10 max-w-2xl mx-auto">
        <div className="flex items-start space-x-6 text-left">
          <div className="w-16 h-16 bg-[#8b5cf6] rounded-xl flex items-center justify-center flex-shrink-0 relative">
            <span className="text-white font-bold text-lg">XP</span>
            <div className="absolute -top-1 -right-1 bg-[#10b981] text-white text-xs px-2 py-1 rounded-full">
              LEVEL 50
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Complete Voyages</h3>
            <p className="text-[#8a939b] leading-relaxed">
              Unlock XP and rewards through onchain and social activities—your actions power your progress, not the size
              of your wallet.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-6 text-left">
          <div className="w-16 h-16 bg-[#f59e0b] rounded-xl flex items-center justify-center flex-shrink-0 relative">
            <span className="text-white text-2xl">🏆</span>
            <div className="absolute -top-1 -right-1 bg-[#f59e0b] text-white text-xs px-2 py-1 rounded-full">
              TREASURE
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Discover Treasures</h3>
            <p className="text-[#8a939b] leading-relaxed">
              Obtain rare artifacts for completing Legendary Quests—these relics will be valuable on your rewards
              journey.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-6 text-left">
          <div className="w-16 h-16 bg-[#2081e2] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl">📦</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Earn Shipments</h3>
            <p className="text-[#8a939b] leading-relaxed">
              Intercept surprise airdrops of XP by hitting key goals—follow us on X for clues about what might be coming
              next.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}
