"use client"

import { useState } from "react"
import { Search, BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchTraits = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [
    {
      id: 1,
      category: "1/1 Suit",
      trait: "SUIT1",
      rarity: "1%",
      floor: "9.99 ETH",
      topOffer: "—",
      size: "large",
      color: "#ef4444",
      icon: "👔",
    },
    {
      id: 2,
      category: "Froggy",
      trait: "Froggy",
      rarity: "0.1%",
      floor: "9.99 ETH",
      topOffer: "—",
      size: "unique",
      color: "#10b981",
      icon: "🐸",
    },
    {
      id: 3,
      category: "COLOR",
      trait: "Purple",
      rarity: "0.79%",
      floor: "0.15 ETH",
      topOffer: "0.0018 WETH",
      size: "medium",
      color: "#8b5cf6",
      icon: "🟣",
    },
    {
      id: 4,
      category: "SHOES",
      trait: "Flip Flops",
      rarity: "0.19%",
      floor: "0.13 ETH",
      topOffer: "—",
      size: "small",
      color: "#f59e0b",
      icon: "🩴",
    },
    {
      id: 5,
      category: "HAIR/HAT",
      trait: "Long",
      rarity: "1%",
      floor: "0.12 ETH",
      topOffer: "—",
      size: "medium",
      color: "#06b6d4",
      icon: "💇",
    },
    {
      id: 6,
      category: "ACCESSORY 3",
      trait: "Bag Backpack",
      rarity: "0.19%",
      floor: "0.10 ETH",
      topOffer: "—",
      size: "small",
      color: "#ec4899",
      icon: "🎒",
    },
  ]
}

export function TraitsView() {
  const [sortBy, setSortBy] = useState("highest-floor")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: traits, isLoading } = useQuery({
    queryKey: ["collection-traits"],
    queryFn: fetchTraits,
  })

  const getCircleSize = (size: string) => {
    switch (size) {
      case "unique":
        return "w-32 h-32"
      case "large":
        return "w-24 h-24"
      case "medium":
        return "w-20 h-20"
      case "small":
        return "w-16 h-16"
      default:
        return "w-20 h-20"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64 bg-[#353840]" />
          <Skeleton className="h-10 w-32 bg-[#353840]" />
        </div>

        <div className="grid grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="w-20 h-20 rounded-full bg-[#353840] mx-auto mb-3" />
              <Skeleton className="h-4 w-16 bg-[#353840] mx-auto mb-1" />
              <Skeleton className="h-3 w-12 bg-[#353840] mx-auto mb-1" />
              <Skeleton className="h-3 w-20 bg-[#353840] mx-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const filteredTraits = traits?.filter(
    (trait) =>
      trait.trait.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trait.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6 ">
      {/* Search and Controls */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a939b] w-4 h-4" />
          <Input
            placeholder="Search by item or trait"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1a202c] border-[#353840] text-white placeholder-[#8a939b] h-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1a202c] border border-[#353840] text-white rounded-lg px-3 py-2 text-sm h-10"
          >
            <option value="highest-floor">Highest floor</option>
            <option value="lowest-floor">Lowest floor</option>
            <option value="rarest">Rarest</option>
            <option value="most-common">Most common</option>
          </select>

          <Button variant="ghost" size="icon" className="w-10 h-10">
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Traits Count */}
      <div className="text-[#8a939b] text-sm">118 TRAITS</div>

      {/* Traits Grid */}
      <div className="grid grid-cols-6 gap-6">
        {filteredTraits?.map((trait) => (
          <div key={trait.id} className="text-center cursor-pointer hover:scale-105 transition-transform">
            <div
              className={`${getCircleSize(trait.size)} rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl relative`}
              style={{ backgroundColor: trait.color }}
            >
              <span>{trait.icon}</span>
              {trait.size === "unique" && (
                <div className="absolute -top-1 -right-1 bg-[#f59e0b] text-white text-xs px-2 py-1 rounded-full font-bold">
                  UNIQUE
                </div>
              )}
              {trait.rarity === "1%" && (
                <div className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-xs px-2 py-1 rounded-full font-bold">
                  +28
                </div>
              )}
              {trait.rarity === "0.79%" && (
                <div className="absolute -top-1 -right-1 bg-[#3b82f6] text-white text-xs px-2 py-1 rounded-full font-bold">
                  +13
                </div>
              )}
              {trait.rarity === "0.19%" && (
                <div className="absolute -top-1 -right-1 bg-[#8b5cf6] text-white text-xs px-2 py-1 rounded-full font-bold">
                  +28
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-[#8a939b] text-xs uppercase">{trait.category}</p>
              <p className="text-white font-medium text-sm">{trait.trait}</p>
              <p className="text-[#8a939b] text-xs">RARITY: {trait.rarity}</p>
              <p className="text-[#8a939b] text-xs">FLOOR: {trait.floor}</p>
              <p className="text-[#8a939b] text-xs">TOP OFFER: {trait.topOffer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
