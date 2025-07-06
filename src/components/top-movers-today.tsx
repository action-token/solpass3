"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

const fetchTopMovers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [
    {
      id: 1,
      name: "ALTAVA Second Skin Metamorphosis",
      verified: true,
      floorPrice: "0.19 ETH",
      change: "+3,635.4%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "BASTARD GAN PUNKS V1",
      verified: true,
      floorPrice: "4.90 ETH",
      change: "+307.4%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Bent by ippsketch",
      verified: true,
      floorPrice: "0.225 ETH",
      change: "+262.3%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Lightbreak by Luke Shannon",
      verified: true,
      floorPrice: "1.25 ETH",
      change: "+108.7%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "The Broken Keys",
      verified: true,
      floorPrice: "100.00 ETH",
      change: "+81.8%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "VERDANDI ORIGINS",
      verified: false,
      floorPrice: "0.15 ETH",
      change: "+45.2%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Extra Mover 1",
      verified: true,
      floorPrice: "0.75 ETH",
      change: "+25.3%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      name: "Extra Mover 2",
      verified: false,
      floorPrice: "0.35 ETH",
      change: "+15.7%",
      image: "https://picsum.photos/200/300",
    },
  ]
}

export function TopMoversToday() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const itemsPerPage = 5

  const { data: movers, isLoading } = useQuery({
    queryKey: ["top-movers"],
    queryFn: fetchTopMovers,
  })

  const nextSlide = () => {
    if (!movers) return
    const maxIndex = Math.max(0, movers.length - itemsPerPage)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const canGoNext = movers && currentIndex < movers.length - itemsPerPage
  const canGoPrev = currentIndex > 0

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="mb-6">
          <Skeleton className="h-7 w-48 bg-[#353840] mb-2" />
          <Skeleton className="h-4 w-64 bg-[#353840]" />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-[#1a202c] border-[#353840] p-3 rounded-xl">
              <Skeleton className="h-20 w-full bg-[#353840] rounded-lg mb-3" />
              <Skeleton className="h-4 w-3/4 bg-[#353840] mb-2" />
              <Skeleton className="h-3 w-1/2 bg-[#353840] mb-1" />
              <Skeleton className="h-3 w-1/3 bg-[#353840]" />
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
          <h2 className="text-2xl font-bold text-white mb-1">Top Movers Today</h2>
          <p className="text-[#8a939b] text-sm">Largest floor price change in the past day</p>
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
            {movers?.map((mover, index) => (
              <div key={mover.id} className="flex-shrink-0" style={{ width: `calc(${100 / itemsPerPage}% - 12px)` }}>
                <Card
                  className="bg-[#1a202c] border-[#353840] p-3 cursor-pointer hover:bg-[#2d3748] transition-all relative rounded-xl w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="h-36 w-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-lg mb-3 overflow-hidden">
                    <img
                      src={mover.image || "/placeholder.svg"}
                      alt={mover.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-start space-x-1 mb-2">
                    <h3 className="font-medium text-white text-sm truncate flex-1">{mover.name}</h3>
                    {mover.verified && <CheckCircle className="w-3 h-3 text-[#2081e2] flex-shrink-0 mt-0.5" />}
                  </div>

                  <p className="text-[#8a939b] text-xs mb-1">
                    Floor price: <span className="text-white font-medium">{mover.floorPrice}</span>
                  </p>
                  <p className="text-[#10b981] text-xs font-medium">{mover.change}</p>

                  {hoveredIndex === index && (
                    <Button
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-6 h-6 rounded-full"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </Button>
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
