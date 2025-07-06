"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

// Mock API function
const fetchFeaturedCollections = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      name: "Parallel Alpha",
      creator: "Parallel",
      verified: true,
      floorPrice: "0.0005 ETH",
      items: "5,855,182",
      totalVolume: "77.9K ETH",
      listed: "50.1%",
      image: "/placeholder.svg?height=500&width=1200",
      thumbnails: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
    {
      id: 2,
      name: "Terraforms by Mathcastles",
      creator: "7a822b",
      verified: true,
      floorPrice: "0.399 ETH",
      items: "9,910",
      totalVolume: "33.4K ETH",
      listed: "1.8%",
      image: "/placeholder.svg?height=500&width=1200",
      thumbnails: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
    {
      id: 3,
      name: "Opepen Edition",
      creator: "visualizevalue",
      verified: true,
      floorPrice: "0.249 ETH",
      items: "15,798",
      totalVolume: "87.3K ETH",
      listed: "4.1%",
      image: "/placeholder.svg?height=500&width=1200",
      thumbnails: [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/300",
      ],
    },
  ]
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const { data: collections, isLoading } = useQuery({
    queryKey: ["featured-collections"],
    queryFn: fetchFeaturedCollections,
  })

  useEffect(() => {
    if (!collections) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % collections.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [collections])

  const nextSlide = () => {
    if (!collections) return
    setCurrentSlide((prev) => (prev + 1) % collections.length)
  }

  const prevSlide = () => {
    if (!collections) return
    setCurrentSlide((prev) => (prev - 1 + collections.length) % collections.length)
  }

  if (isLoading) {
    return (
      <div className="relative h-[500px] rounded-2xl overflow-hidden bg-[#1a202c]">
        <Skeleton className="w-full h-full bg-[#353840]" />
      </div>
    )
  }

  if (!collections) return null

  const currentCollection = collections[currentSlide]
  if (!currentCollection) return null

  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden group">
      <div
        className="w-full h-full bg-gradient-to-r from-[#1a202c] via-[#2d3748] to-[#4a5568]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentCollection.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Navigation Arrows - Fixed positioning to center */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all w-12 h-12 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all w-12 h-12 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Content */}
      <div className="absolute bottom-8 left-8 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <h2 className="text-4xl font-bold">{currentCollection.name}</h2>
          {currentCollection.verified && <CheckCircle className="w-7 h-7 text-[#2081e2]" />}
        </div>
        <p className="text-[#8a939b] mb-8 text-lg">By {currentCollection.creator}</p>

        <div className="grid grid-cols-4 gap-12 text-sm">
          <div>
            <p className="text-[#8a939b] uppercase text-xs font-medium mb-1">FLOOR PRICE</p>
            <p className="font-bold text-lg">{currentCollection.floorPrice}</p>
          </div>
          <div>
            <p className="text-[#8a939b] uppercase text-xs font-medium mb-1">ITEMS</p>
            <p className="font-bold text-lg">{currentCollection.items}</p>
          </div>
          <div>
            <p className="text-[#8a939b] uppercase text-xs font-medium mb-1">TOTAL VOLUME</p>
            <p className="font-bold text-lg">{currentCollection.totalVolume}</p>
          </div>
          <div>
            <p className="text-[#8a939b] uppercase text-xs font-medium mb-1">LISTED</p>
            <p className="font-bold text-lg">{currentCollection.listed}</p>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-8 right-8 flex space-x-3">
        {currentCollection.thumbnails.map((thumb, i) => (
          <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20">
            <img src={thumb || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {collections.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-white w-8" : "bg-white/40"}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  )
}
