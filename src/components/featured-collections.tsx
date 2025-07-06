"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

// Mock API function
const fetchCollections = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    {
      id: 1,
      name: "DeePie Stuff",
      slug: "deepie-stuff",
      verified: true,
      floorPrice: "0.0034 ETH",
      change: "-2.9%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Anichess Eternals",
      slug: "anichess-eternals",
      verified: true,
      floorPrice: "0.205 ETH",
      change: "-22.1%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Pixcape Genesis Pass",
      slug: "pixcape-genesis-pass",
      verified: true,
      floorPrice: "0.034 ETH",
      change: "-2.5%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Zoolini",
      slug: "zoolini",
      verified: true,
      floorPrice: "0.0047 ETH",
      change: "-4.9%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Tender System",
      slug: "tender-system",
      verified: true,
      floorPrice: "0.0041 ETH",
      change: "-0.1%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Auniverse by Niceaunties",
      slug: "auniverse-by-niceaunties",
      verified: false,
      floorPrice: "0.0041 ETH",
      change: "+2.1%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Extra Collection 1",
      slug: "extra-collection-1",
      verified: true,
      floorPrice: "0.0025 ETH",
      change: "+5.2%",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      name: "Extra Collection 2",
      slug: "extra-collection-2",
      verified: false,
      floorPrice: "0.0067 ETH",
      change: "-1.8%",
      image: "https://picsum.photos/200/300",
    },
  ]
}

export function FeaturedCollections() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 5
  const router = useRouter()

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  })

  const nextSlide = () => {
    if (!collections) return
    const maxIndex = Math.max(0, collections.length - itemsPerPage)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const canGoNext = collections && currentIndex < collections.length - itemsPerPage
  const canGoPrev = currentIndex > 0

  const handleCollectionClick = (slug: string) => {
    router.push(`/collection/${slug}`)
  }

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-7 w-56 bg-[#353840] mb-2" />
            <Skeleton className="h-4 w-72 bg-[#353840]" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-[#1a202c] border-[#353840] p-4 rounded-xl">
              <Skeleton className="aspect-square w-full bg-[#353840] rounded-xl mb-4" />
              <Skeleton className="h-5 w-3/4 bg-[#353840] mb-2" />
              <Skeleton className="h-4 w-1/2 bg-[#353840] mb-1" />
              <Skeleton className="h-4 w-1/3 bg-[#353840]" />
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
          <h2 className="text-2xl font-bold text-white mb-1">Featured Collections</h2>
          <p className="text-[#8a939b] text-sm">This week{"'"}s curated collections</p>
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
            {collections?.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                itemsPerPage={itemsPerPage}
                onClick={() => handleCollectionClick(collection.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CollectionCard({
  collection,
  itemsPerPage,
  onClick,
}: {
  collection: {
    id: number
    name: string
    slug: string
    verified: boolean
    floorPrice: string
    change: string
    image?: string
  }
  itemsPerPage: number
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div key={collection.id} className="flex-shrink-0 " style={{ width: `calc(${100 / itemsPerPage}% - 12px)` }}>
      {/* <Card
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
    </Card> */}
      <Card className="bg-gray-800 border-gray-700 rounded-xl overflow-hidden flex-1 h-50 relative p-0 transform transition-transform duration-300 hover:scale-102 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Full Background Image */}
        <img
          src={collection.image ?? "/placeholder.svg"}
          alt={collection.name}
          className="w-full h-full object-cover"
        />

        {/* Bottom Gradient Overlay with Text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 py-2 pt-8">
          <div className="flex items-center gap-1 ">
            <h3 className="text-white font-semibold text-sm">{collection.name}</h3>
            <BadgeCheck className="w-4 h-4 text-blue-400 " />
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-300">Floor price:</span>
            <span className="text-white font-medium">{collection.floorPrice}</span>

            <span className="text-red-400">-2.6%</span>
          </div>
        </div>
      </Card>
    </div>

  )
}
