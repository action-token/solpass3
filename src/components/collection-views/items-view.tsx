"use client"

import { useState } from "react"
import { Search, Grid3X3, List, BarChart3, Settings, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchItems = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      name: "solpass",
      price: "0.0034 ETH",
      lastSale: "0.0019 WETH",
      views: "2.94K",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Suit 1",
      price: "0.0069 ETH",
      lastSale: "0.01 ETH",
      views: "7",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Watch 1",
      price: "0.0069 ETH",
      lastSale: "0.01 ETH",
      views: "37",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Pants 2",
      price: "0.0069 ETH",
      lastSale: "0.01 ETH",
      views: "9",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Sneakers 9",
      price: "0.0069 ETH",
      lastSale: "0.01 ETH",
      views: "19",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Glasses Round 1",
      price: "0.0069 ETH",
      lastSale: "0.0057 WETH",
      views: "21",
      image: "https://picsum.photos/200/300",
    },
  ]
}

export function ItemsView() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("price-low-high")

  const { data: items, isLoading } = useQuery({
    queryKey: ["collection-items"],
    queryFn: fetchItems,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64 bg-[#353840]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-32 bg-[#353840]" />
            <Skeleton className="h-10 w-10 bg-[#353840]" />
            <Skeleton className="h-10 w-10 bg-[#353840]" />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="bg-[#1a202c] border-[#353840] overflow-hidden rounded-xl">
              <Skeleton className="aspect-square w-full bg-[#353840]" />
              <div className="p-3">
                <Skeleton className="h-4 w-3/4 bg-[#353840] mb-2" />
                <Skeleton className="h-3 w-1/2 bg-[#353840]" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a939b] w-4 h-4" />
          <Input
            placeholder="Search by item or trait"
            className="pl-10 bg-[#1a202c] border-[#353840] text-white placeholder-[#8a939b] h-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1a202c] border border-[#353840] text-white rounded-lg px-3 py-2 text-sm h-10"
          >
            <option value="price-low-high">Price low to high</option>
            <option value="price-high-low">Price high to low</option>
            <option value="recently-listed">Recently listed</option>
            <option value="recently-sold">Recently sold</option>
          </select>

          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="w-10 h-10"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="w-10 h-10"
          >
            <List className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="w-10 h-10">
            <BarChart3 className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Settings className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Items Count */}
      <div className="text-[#8a939b] text-sm">553 ITEMS</div>

      {/* Items Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-6 gap-4" : "space-y-4"}>
        {items?.map((item) => (
          <Card
            key={item.id}
            className="bg-[#1a202c] border-[#353840] overflow-hidden hover:bg-[#2d3748] transition-all cursor-pointer rounded-xl"
          >
            <div className="aspect-square w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{item.views}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-white text-sm mb-1">{item.name}</h3>
              <p className="text-white font-semibold text-sm mb-1">{item.price}</p>
              <p className="text-[#8a939b] text-xs">Last sale {item.lastSale}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
