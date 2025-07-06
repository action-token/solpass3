"use client"

import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchAboutData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return {
    mintInfo: {
      title: "Mint DeePie Stuff",
      itemsMinted: "2,938",
      mintEnded: {
        status: "Mint ended",
        itemsMinted: "2,938 items minted",
      },
    },
    mintSchedule: {
      publicStage: {
        title: "Public Stage",
        started: "June 19 at 11:00 PM GMT+6",
        ended: "June 21 at 11:00 PM GMT+6",
        price: "0.008 ETH | LIMIT 3 PER WALLET",
        status: "ELIGIBLE",
      },
    },
    liveMints: [
      {
        id: 1,
        minter: "AndoVault",
        price: "0.016 ETH",
        quantity: 2,
        time: "11h ago",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        minter: "checker4e",
        price: "0.04 ETH",
        quantity: 5,
        time: "2d ago",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    liveSales: [
      {
        id: 1,
        item: "Hat Cap 2",
        price: "0.01 ETH",
        from: "vibetoshi",
        time: "1h ago",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        item: "solpass",
        price: "0.0018 WETH",
        from: "6ba122",
        time: "14h ago",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  }
}

export function AboutView() {
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["collection-about"],
    queryFn: fetchAboutData,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
            <Skeleton className="h-6 w-48 bg-[#353840] mb-4" />
            <Skeleton className="h-4 w-32 bg-[#353840] mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-[#353840]" />
              <Skeleton className="h-4 w-3/4 bg-[#353840]" />
              <Skeleton className="h-4 w-1/2 bg-[#353840]" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full bg-[#353840] rounded-xl" />
          <Skeleton className="h-32 w-full bg-[#353840] rounded-xl" />
        </div>
      </div>
    )
  }

  if (!aboutData) return null

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column - Mint Info */}
      <div className="space-y-6">
        {/* Main Mint Section */}
        <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <Button className="bg-[#2081e2] hover:bg-[#1c6dd0] text-white px-6 py-2 rounded-lg">View items</Button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{aboutData.mintInfo.title}</h2>
          <p className="text-[#8a939b] text-sm mb-6">Items minted: {aboutData.mintInfo.itemsMinted}</p>

          <div className="bg-[#0d1421] border border-[#353840] rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
              <span className="text-white font-medium text-sm">{aboutData.mintInfo.mintEnded.status}</span>
            </div>
            <p className="text-[#8a939b] text-sm">{aboutData.mintInfo.mintEnded.itemsMinted}</p>
          </div>

          {/* Mint Schedule */}
          <div className="space-y-4">
            <h3 className="text-white font-medium uppercase text-sm">MINT SCHEDULE</h3>

            <div className="bg-[#0d1421] border border-[#353840] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{aboutData.mintSchedule.publicStage.title}</h4>
                <span className="text-[#10b981] text-xs bg-[#10b981]/20 px-2 py-1 rounded">
                  {aboutData.mintSchedule.publicStage.status}
                </span>
              </div>
              <p className="text-[#8a939b] text-sm mb-2">Started: {aboutData.mintSchedule.publicStage.started}</p>
              <p className="text-[#8a939b] text-sm mb-3">Ended: {aboutData.mintSchedule.publicStage.ended}</p>
              <p className="text-white text-sm font-medium">{aboutData.mintSchedule.publicStage.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Live Activity */}
      <div className="space-y-6">
        {/* Live Mints */}
        <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium uppercase text-sm">LIVE MINTS</h3>
            <div className="flex items-center space-x-2">
              <span className="text-[#8a939b] text-sm">MINTER</span>
              <span className="text-[#8a939b] text-sm">PRICE</span>
              <span className="text-[#8a939b] text-sm">QTY</span>
              <span className="text-[#8a939b] text-sm">TIME</span>
            </div>
          </div>

          <div className="space-y-3">
            {aboutData.liveMints.map((mint) => (
              <div key={mint.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899]">
                    <img
                      src={mint.avatar || "/placeholder.svg"}
                      alt={mint.minter}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-white text-sm">{mint.minter}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-white">{mint.price}</span>
                  <span className="text-white">{mint.quantity}</span>
                  <span className="text-[#8a939b]">{mint.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Sales */}
        <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium uppercase text-sm">LIVE SALES</h3>
            <div className="flex items-center space-x-2">
              <span className="text-[#8a939b] text-sm">ITEM</span>
              <span className="text-[#8a939b] text-sm">PRICE</span>
              <span className="text-[#8a939b] text-sm">FROM</span>
              <span className="text-[#8a939b] text-sm">TIME</span>
            </div>
          </div>

          <div className="space-y-3">
            {aboutData.liveSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-[#667eea] to-[#764ba2]">
                    <img
                      src={sale.avatar || "/placeholder.svg"}
                      alt={sale.item}
                      className="w-full h-full rounded object-cover"
                    />
                  </div>
                  <span className="text-white text-sm">{sale.item}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-white">{sale.price}</span>
                  <span className="text-white">{sale.from}</span>
                  <span className="text-[#8a939b]">{sale.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
