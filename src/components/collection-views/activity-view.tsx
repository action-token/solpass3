"use client"

import { useState } from "react"
import { ShoppingCart, Zap, ArrowRightLeft, X, List, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchActivity = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return [
    {
      id: 1,
      event: "Sale",
      item: "Hat Cap 2",
      price: "0.01 ETH",
      rarity: "#408",
      quantity: 1,
      from: "vibetoshi",
      to: "MichaelangeloNFTs",
      time: "1h ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      event: "Mint",
      item: "Shirt 3",
      price: "0.008 ETH",
      rarity: "#525",
      quantity: 1,
      from: "NullAddress",
      to: "AndoVault",
      time: "11h ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      event: "Mint",
      item: "Shirt Long 4",
      price: "0.008 ETH",
      rarity: "#376",
      quantity: 1,
      from: "NullAddress",
      to: "AndoVault",
      time: "11h ago",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      event: "Sale",
      item: "solpass",
      price: "0.0018 WETH",
      rarity: "#56",
      quantity: 1,
      from: "6ba122",
      to: "beginner_",
      time: "14h ago",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]
}

export function ActivityView() {
  const [activeFilters, setActiveFilters] = useState(["Sale", "Mint"])
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const { data: activities, isLoading } = useQuery({
    queryKey: ["collection-activity"],
    queryFn: fetchActivity,
  })

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-8 w-16 bg-[#353840] rounded-lg" />
          <Skeleton className="h-8 w-16 bg-[#353840] rounded-lg" />
          <Skeleton className="h-8 w-16 bg-[#353840] rounded-lg" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-[#1a202c] border border-[#353840] rounded-xl">
              <Skeleton className="w-10 h-10 rounded bg-[#353840]" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 bg-[#353840] mb-2" />
                <Skeleton className="h-3 w-16 bg-[#353840]" />
              </div>
              <Skeleton className="h-4 w-20 bg-[#353840]" />
              <Skeleton className="h-4 w-16 bg-[#353840]" />
              <Skeleton className="h-4 w-24 bg-[#353840]" />
              <Skeleton className="h-4 w-16 bg-[#353840]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getEventIcon = (event: string) => {
    switch (event) {
      case "Sale":
        return <ShoppingCart className="w-4 h-4" />
      case "Mint":
        return <Zap className="w-4 h-4" />
      case "Transfer":
        return <ArrowRightLeft className="w-4 h-4" />
      default:
        return <ShoppingCart className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6 ">
      {/* Active Filters */}
      <div className="flex items-center space-x-2">
        {activeFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center space-x-2 bg-[#2081e2] text-white px-3 py-1 rounded-lg text-sm"
          >
            <span>{filter}</span>
            <button onClick={() => removeFilter(filter)} className="hover:bg-white/20 rounded p-0.5">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {activeFilters.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="border-[#353840] text-[#8a939b] hover:text-white h-8 bg-transparent"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="text-[#8a939b] text-sm">Recent activity</div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="w-10 h-10"
          >
            <List className="w-4 h-4" />
          </Button>

          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="w-10 h-10"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-12 gap-4 text-[#8a939b] text-xs uppercase font-medium px-4">
        <div className="col-span-1">EVENT</div>
        <div className="col-span-2">ITEM</div>
        <div className="col-span-2">PRICE</div>
        <div className="col-span-1">RARITY</div>
        <div className="col-span-1">QTY</div>
        <div className="col-span-2">FROM</div>
        <div className="col-span-2">TO</div>
        <div className="col-span-1">TIME</div>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities?.map((activity) => (
          <div
            key={activity.id}
            className="grid grid-cols-12 gap-4 items-center p-4 bg-[#1a202c] border border-[#353840] rounded-xl hover:bg-[#2d3748] transition-all"
          >
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 bg-[#2d3748] rounded-lg flex items-center justify-center text-[#8a939b]">
                {getEventIcon(activity.event)}
              </div>
            </div>

            <div className="col-span-2 flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.item}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium text-sm">{activity.item}</span>
            </div>

            <div className="col-span-2">
              <p className="text-white font-medium">{activity.price}</p>
            </div>

            <div className="col-span-1">
              <span className="text-[#2081e2] text-sm">{activity.rarity}</span>
            </div>

            <div className="col-span-1">
              <p className="text-white">{activity.quantity}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white text-sm">{activity.from}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white text-sm">{activity.to}</p>
            </div>

            <div className="col-span-1">
              <p className="text-[#8a939b] text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
