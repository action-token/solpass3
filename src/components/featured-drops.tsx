"use client"

import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Mock API function
const fetchFeaturedDrops = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return [
    {
      id: 1,
      name: "SUPERCHIEF COMMUNITY",
      subtitle: "MINTING NOW",
      price: "0.029 ETH",
      time: "July 7 at 1:00 AM GMT+6",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "DDUST by jiwa",
      subtitle: "",
      price: "",
      time: "July 8 at 11:00 PM GMT+6",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Pixel Art Blocks",
      subtitle: "",
      price: "",
      time: "July 7 at 1:00 AM GMT+6",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Abstractio",
      subtitle: "",
      price: "",
      time: "July 10 at 9:00 PM GMT+6",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Pepemons",
      subtitle: "",
      price: "",
      time: "July 8 at 11:00 PM GMT+6",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Extra Drop 1",
      subtitle: "",
      price: "",
      time: "July 9 at 2:00 PM GMT+6",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Extra Drop 2",
      subtitle: "",
      price: "",
      time: "July 11 at 5:00 PM GMT+6",
      image: "https://picsum.photos/200/300",
    },
  ]
}

export function FeaturedDrops() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 5
  const router = useRouter()

  const { data: drops, isLoading } = useQuery({
    queryKey: ["featured-drops"],
    queryFn: fetchFeaturedDrops,
  })

  const nextSlide = () => {
    if (!drops) return
    const maxIndex = Math.max(0, drops.length - itemsPerPage)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const canGoNext = drops && currentIndex < drops.length - itemsPerPage
  const canGoPrev = currentIndex > 0

  const handleDropClick = (dropName: string) => {
    // Convert drop name to slug format
    const slug = dropName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    router.push(`/collection/${slug}`)
  }

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="mb-6">
          <Skeleton className="h-7 w-40 bg-[#353840] mb-2" />
          <Skeleton className="h-4 w-64 bg-[#353840]" />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-[#1a202c] border-[#353840] overflow-hidden rounded-xl">
              <Skeleton className="h-24 w-full bg-[#353840]" />
              <div className="p-3">
                <Skeleton className="h-4 w-3/4 bg-[#353840] mb-2" />
                <Skeleton className="h-3 w-1/2 bg-[#353840]" />
              </div>
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
          <h2 className="text-2xl font-bold text-white mb-1">Featured Drops</h2>
          <p className="text-[#8a939b] text-sm">This week{"'"}s curated active and upcoming collections</p>
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
            {drops?.map((drop) => (
              <div key={drop.id} className="flex-shrink-0" style={{ width: `calc(${100 / itemsPerPage}% - 12px)` }}>
                <Card
                  className="bg-[#1a202c] border-[#353840] overflow-hidden hover:bg-[#2d3748] transition-all cursor-pointer rounded-xl w-full h-full"
                  onClick={() => handleDropClick(drop.name)}
                >
                  <div className="h-36 w-full bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative">
                    <img
                      src={drop.image || "/placeholder.svg"}
                      alt={drop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white text-sm mb-1 truncate">{drop.name}</h3>
                    {drop.subtitle && <p className="text-[#10b981] text-xs font-medium mb-1">{drop.subtitle}</p>}
                    {drop.price && <p className="text-white text-xs font-medium mb-1">{drop.price}</p>}
                    <p className="text-[#8a939b] text-xs">{drop.time}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
