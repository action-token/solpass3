"use client"

import { Star, Share, MoreHorizontal, CheckCircle, Globe, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchCollectionData = async (slug: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    name: "DeePie Stuff",
    creator: "DEEKAYMOT",
    verified: true,
    description: "SHAPE",
    totalItems: "553 UNIQUE",
    owners: "8,284",
    mintDate: "FEB 2025",
    mintStatus: "MINT ENDED",
    stats: {
      floorPrice: "0.0034 ETH",
      floorChange: "-2.6%",
      topOffer: "0.0019 WETH",
      volume24h: "0.01 ETH",
      totalVolume: "33.61 ETH",
      listed: "13.7%",
      owners: "1,799(21.7%)",
    },
    avatar: "https://picsum.photos/200/300",
    banner: "https://picsum.photos/200/300",
  }
}

interface CollectionHeaderProps {
  slug: string
}

export function CollectionHeader({ slug }: CollectionHeaderProps) {
  const { data: collection, isLoading } = useQuery({
    queryKey: ["collection", slug],
    queryFn: () => fetchCollectionData(slug),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-20 h-20 rounded-2xl bg-[#353840]" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 bg-[#353840] mb-2" />
            <Skeleton className="h-4 w-32 bg-[#353840] mb-2" />
            <Skeleton className="h-4 w-64 bg-[#353840]" />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-4 w-16 bg-[#353840] mb-1 mx-auto" />
              <Skeleton className="h-6 w-20 bg-[#353840] mx-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!collection) return null

  return (
    <div className="space-y-6">
      {/* Collection Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-[#4facfe] to-[#00f2fe]">
            <img
              src={collection.avatar || "/placeholder.svg"}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-3xl font-bold text-white">{collection.name}</h1>
              {collection.verified && <CheckCircle className="w-6 h-6 text-[#2081e2]" />}
              <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
                <Star className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-[#8a939b] mb-2">
              <span>
                BY <span className="text-white font-medium">{collection.creator}</span>
              </span>
              <span className="w-1 h-1 bg-[#8a939b] rounded-full"></span>
              <span className="text-white">{collection.description}</span>
              <span className="w-1 h-1 bg-[#8a939b] rounded-full"></span>
              <span className="text-white">{collection.totalItems}</span>
              <span className="w-1 h-1 bg-[#8a939b] rounded-full"></span>
              <span className="text-white">{collection.owners}</span>
              <span className="w-1 h-1 bg-[#8a939b] rounded-full"></span>
              <span className="text-white">{collection.mintDate}</span>
              <span className="w-1 h-1 bg-[#8a939b] rounded-full"></span>
              <span className="text-white">{collection.mintStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
            <Globe className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
            <Share className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-8 gap-6 text-center">
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">FLOOR PRICE</p>
          <p className="text-white font-bold text-lg">{collection.stats.floorPrice}</p>
          <p className="text-[#ef4444] text-xs">{collection.stats.floorChange}</p>
        </div>
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">1D FLOOR %</p>
          <p className="text-[#ef4444] font-bold text-lg">{collection.stats.floorChange}</p>
        </div>
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">TOP OFFER</p>
          <p className="text-white font-bold text-lg">{collection.stats.topOffer}</p>
        </div>
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">24H VOLUME</p>
          <p className="text-white font-bold text-lg">{collection.stats.volume24h}</p>
        </div>
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">TOTAL VOLUME</p>
          <p className="text-white font-bold text-lg">{collection.stats.totalVolume}</p>
        </div>
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">LISTED</p>
          <p className="text-white font-bold text-lg">{collection.stats.listed}</p>
        </div>
        <div>
          <p className="text-[#8a939b] text-xs uppercase font-medium mb-1">OWNERS (UNIQUE)</p>
          <p className="text-white font-bold text-lg">{collection.stats.owners}</p>
        </div>
        <div>
          <Button variant="ghost" size="icon" className="text-[#8a939b] hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
