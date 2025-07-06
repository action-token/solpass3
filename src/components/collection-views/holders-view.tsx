"use client"

import { useState } from "react"
import { MoreHorizontal, List, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchHolders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    {
      id: 1,
      wallet: "c9ca51",
      address: "c9ca51",
      owned: 3334,
      percentage: "40.25%",
      items: [
        { color: "#3b82f6" },
        { color: "#ef4444" },
        { color: "#10b981" },
        { color: "#f59e0b" },
        { color: "#8b5cf6" },
      ],
      itemsCount: "+3.33K",
      estValue: "6.3346 WETH",
      portfolioPercentage: "100%",
    },
    {
      id: 2,
      wallet: "deekaymot",
      address: "7b6404",
      owned: 490,
      percentage: "5.92%",
      items: [
        { color: "#6b7280" },
        { color: "#6b7280" },
        { color: "#6b7280" },
        { color: "#6b7280" },
        { color: "#6b7280" },
      ],
      itemsCount: "+485",
      estValue: "0.931 WETH",
      portfolioPercentage: "2.73%",
    },
    {
      id: 3,
      wallet: "AndoVault",
      address: "8f65Ac",
      owned: 67,
      percentage: "0.81%",
      items: [
        { color: "#6b7280" },
        { color: "#6b7280" },
        { color: "#6b7280" },
        { color: "#6b7280" },
        { color: "#6b7280" },
      ],
      itemsCount: "+67",
      estValue: "0.1273 WETH",
      portfolioPercentage: "3.34%",
    },
  ]
}

export function HoldersView() {
  const [sortBy, setSortBy] = useState("most-owned")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const { data: holders, isLoading } = useQuery({
    queryKey: ["collection-holders"],
    queryFn: fetchHolders,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-[#353840]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-32 bg-[#353840]" />
            <Skeleton className="h-10 w-10 bg-[#353840]" />
            <Skeleton className="h-10 w-10 bg-[#353840]" />
          </div>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-[#1a202c] border border-[#353840] rounded-xl">
              <Skeleton className="w-10 h-10 rounded-full bg-[#353840]" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 bg-[#353840] mb-2" />
                <Skeleton className="h-3 w-16 bg-[#353840]" />
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="w-6 h-6 rounded bg-[#353840]" />
                ))}
              </div>
              <Skeleton className="h-4 w-20 bg-[#353840]" />
              <Skeleton className="h-4 w-24 bg-[#353840]" />
              <Skeleton className="h-4 w-16 bg-[#353840]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="text-[#8a939b] text-sm">Most owned</div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1a202c] border border-[#353840] text-white rounded-lg px-3 py-2 text-sm h-10"
          >
            <option value="most-owned">Most owned</option>
            <option value="least-owned">Least owned</option>
            <option value="highest-value">Highest value</option>
          </select>

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
        <div className="col-span-2">WALLET</div>
        <div className="col-span-1">OWNED</div>
        <div className="col-span-1">% OWNED</div>
        <div className="col-span-2">ITEMS</div>
        <div className="col-span-2">EST. VALUE</div>
        <div className="col-span-2">EST. PORTFOLIO %</div>
        <div className="col-span-2"></div>
      </div>

      {/* Holders List */}
      <div className="space-y-3">
        {holders?.map((holder) => (
          <div
            key={holder.id}
            className="grid grid-cols-12 gap-4 items-center p-4 bg-[#1a202c] border border-[#353840] rounded-xl hover:bg-[#2d3748] transition-all"
          >
            <div className="col-span-2 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
                <span className="text-white text-xs font-bold">{holder.wallet.slice(0, 2).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{holder.wallet}</p>
                <p className="text-[#8a939b] text-xs">{holder.address}</p>
              </div>
            </div>

            <div className="col-span-1">
              <p className="text-white font-medium">{holder.owned.toLocaleString()}</p>
            </div>

            <div className="col-span-1">
              <p className="text-white">{holder.percentage}</p>
            </div>

            <div className="col-span-2 flex items-center space-x-1">
              {holder.items.map((item, i) => (
                <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: item.color }} />
              ))}
              <span className="text-white text-sm ml-2">{holder.itemsCount}</span>
            </div>

            <div className="col-span-2">
              <p className="text-white font-medium">{holder.estValue}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white">{holder.portfolioPercentage}</p>
            </div>

            <div className="col-span-2 flex justify-end">
              <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
