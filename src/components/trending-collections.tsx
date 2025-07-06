"use client"

import { CheckCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchTrendingCollections = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: 1,
      name: "Courtyard.io",
      verified: true,
      price: "< 0.01 WETH",
      change: "-7.8%",
      icon: "🏛️",
      color: "from-[#3b82f6] to-[#1d4ed8]",
    },
    {
      id: 2,
      name: "NBA Top Shot",
      verified: true,
      price: "0.95 FLOW",
      change: "+2.1%",
      icon: "🏀",
      color: "from-[#f59e0b] to-[#d97706]",
    },
    {
      id: 3,
      name: "Axie Material",
      verified: true,
      price: "0.04 RON",
      change: "-1.1%",
      icon: "💎",
      color: "from-[#06b6d4] to-[#0891b2]",
    },
    {
      id: 4,
      name: "Based EGG",
      verified: true,
      price: "< 0.01 ETH",
      change: "+22.2%",
      icon: "🥚",
      color: "from-[#f59e0b] to-[#d97706]",
    },
    {
      id: 5,
      name: "CORES by Sugartown",
      verified: true,
      price: "0.02 ETH",
      change: "+1.8%",
      icon: "💜",
      color: "from-[#8b5cf6] to-[#7c3aed]",
    },
    {
      id: 6,
      name: "Axie Consumable Item",
      verified: true,
      price: "0.12 RON",
      change: "-5.7%",
      icon: "🔥",
      color: "from-[#ef4444] to-[#dc2626]",
    },
    {
      id: 7,
      name: "Axie",
      verified: true,
      price: "5.04 RON",
      change: "-5.7%",
      icon: "🐾",
      color: "from-[#10b981] to-[#059669]",
    },
    {
      id: 8,
      name: "Wild Forest Units",
      verified: true,
      price: "0.12 RON",
      change: "+1.2%",
      icon: "🌲",
      color: "from-[#10b981] to-[#059669]",
    },
    {
      id: 9,
      name: "ALTAVA Second Skin...",
      verified: true,
      price: "0.19 ETH",
      change: "+3,635.4%",
      icon: "👗",
      color: "from-[#8b5cf6] to-[#7c3aed]",
    },
    {
      id: 10,
      name: "Smileless",
      verified: true,
      price: "0.01 ETH",
      change: "-1.3%",
      icon: "😶",
      color: "from-[#f59e0b] to-[#d97706]",
    },
  ]
}

export function TrendingCollections() {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["trending-collections"],
    queryFn: fetchTrendingCollections,
  })

  if (isLoading) {
    return (
      <section>
        <div className="mb-6">
          <Skeleton className="h-7 w-48 bg-[#353840] mb-2" />
          <Skeleton className="h-4 w-64 bg-[#353840]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2 p-3 bg-[#1a202c] rounded-xl">
              <Skeleton className="w-8 h-8 rounded-full bg-[#353840]" />
              <div className="flex-1">
                <Skeleton className="h-3 w-16 bg-[#353840] mb-1" />
                <Skeleton className="h-2 w-12 bg-[#353840]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Trending Collections</h2>
        <p className="text-[#8a939b] text-sm">Highest sales in the past hour</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {collections?.map((collection) => (
          <div
            key={collection.id}
            className="flex items-center space-x-2 p-3 bg-[#1a202c] border border-[#353840] rounded-xl hover:bg-[#2d3748] transition-all cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${collection.color} flex items-center justify-center text-white text-sm`}
            >
              {collection.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 mb-0.5">
                <h3 className="font-medium text-white text-xs truncate">{collection.name}</h3>
                {collection.verified && <CheckCircle className="w-2.5 h-2.5 text-[#2081e2] flex-shrink-0" />}
              </div>
              <p className="text-[#8a939b] text-xs">{collection.price}</p>
              <p
                className={`text-xs font-medium ${collection.change.startsWith("+") ? "text-[#10b981]" : "text-[#ef4444]"}`}
              >
                {collection.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
