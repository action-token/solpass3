"use client"

import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// Mock API function
const fetchTrendingTokens = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [
    {
      id: 1,
      name: "Access Protocol",
      symbol: "ACS",
      price: "$0.01",
      change: "+82.5%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "IKUN",
      symbol: "IKUN",
      price: "$0.02",
      change: "+40.4%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "The Innovation Game",
      symbol: "TIG",
      price: "$1.78",
      change: "+26.3%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Kokoswap",
      symbol: "KOKOK",
      price: "$0.16",
      change: "+20%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Pocket Network",
      symbol: "POKT",
      price: "$0.04",
      change: "-18.1%",
      trend: "down",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "WOLFI",
      symbol: "WOLFI",
      price: "$0.01",
      change: "+44.2%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "DOGEAI",
      symbol: "DOGEAI",
      price: "$0.02",
      change: "+30.3%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "STARTUP",
      symbol: "STARTUP",
      price: "$0.04",
      change: "+21.7%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "LAMBO",
      symbol: "LAMBO",
      price: "$0.01",
      change: "+18.6%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "Stella",
      symbol: "ALPHA",
      price: "$0.01",
      change: "+17.9%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 11,
      name: "Extra Token 1",
      symbol: "EXT1",
      price: "$0.05",
      change: "+12.3%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 12,
      name: "Extra Token 2",
      symbol: "EXT2",
      price: "$0.03",
      change: "+8.7%",
      trend: "up",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]
}

export function TrendingTokens() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const itemsPerPage = 5

  const { data: tokens, isLoading } = useQuery({
    queryKey: ["trending-tokens"],
    queryFn: fetchTrendingTokens,
  })

  const nextSlide = () => {
    if (!tokens) return
    const maxIndex = Math.max(0, tokens.length - itemsPerPage)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const canGoNext = tokens && currentIndex < tokens.length - itemsPerPage
  const canGoPrev = currentIndex > 0

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="mb-6">
          <Skeleton className="h-7 w-56 bg-[#353840] mb-2" />
          <Skeleton className="h-4 w-72 bg-[#353840]" />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-[#1a202c] border-[#353840] p-4 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <Skeleton className="w-10 h-10 rounded-full bg-[#353840]" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-16 bg-[#353840] mb-1" />
                  <Skeleton className="h-3 w-12 bg-[#353840]" />
                </div>
              </div>
              <Skeleton className="h-5 w-20 bg-[#353840] mb-1" />
              <Skeleton className="h-4 w-16 bg-[#353840]" />
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Trending Tokens</h2>
          <p className="text-[#8a939b] text-sm">Largest price change in the past day</p>
        </div>
      </div>

      <div className="relative">
        {/* Navigation Arrows */}
        {canGoPrev && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1a202c] hover:bg-[#2d3748] text-white w-10 h-10 rounded-full z-20 border border-[#353840] shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}

        {canGoNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1a202c] hover:bg-[#2d3748] text-white w-10 h-10 rounded-full z-20 border border-[#353840] shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}

        {/* Cards Container */}
        <div className="overflow-hidden mx-14">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {tokens?.map((token, index) => (
              <div key={token.id} className="flex-shrink-0" style={{ width: `calc(${100 / itemsPerPage}% - 12px)` }}>
                <Card
                  className="bg-[#1a202c] border-[#353840] p-4 hover:bg-[#2d3748] transition-all cursor-pointer rounded-xl relative w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm truncate">{token.name}</h3>
                      <p className="text-[#8a939b] text-xs">{token.symbol}</p>
                    </div>
                    {token.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-[#10b981]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#ef4444]" />
                    )}
                  </div>

                  <p className="text-white font-semibold mb-1 text-lg">{token.price}</p>
                  <p className={`text-sm font-medium ${token.trend === "up" ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                    {token.change}
                  </p>

                  {/* Mini chart placeholder */}
                  <div className="mt-3 h-8 flex items-end space-x-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-sm ${token.trend === "up" ? "bg-[#10b981]" : "bg-[#ef4444]"}`}
                        style={{
                          height: `${Math.random() * 100 + 20}%`,
                          opacity: token.trend === "up" ? 0.7 : 0.5,
                        }}
                      />
                    ))}
                  </div>

                  {hoveredIndex === index && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
