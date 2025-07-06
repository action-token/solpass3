"use client"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchOffers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    {
      id: 1,
      trait: "RARE HE...",
      rarity: "0.18%",
      volume: "0.0316 WETH",
      topOffer: "0.0065 WETH",
      offers: 5,
      bidders: [{ avatar: "/placeholder.svg?height=24&width=24", color: "#ec4899" }],
    },
    {
      id: 2,
      trait: "HELMET",
      rarity: "0.1%",
      volume: "0.0072 WETH",
      topOffer: "0.0038 WETH",
      offers: 5,
      bidders: [{ avatar: "/placeholder.svg?height=24&width=24", color: "#3b82f6" }],
    },
    {
      id: 3,
      trait: "TANK TOP",
      rarity: "0.1%",
      volume: "0.0069 WETH",
      topOffer: "0.0035 WETH",
      offers: 2,
      bidders: [{ avatar: "/placeholder.svg?height=24&width=24", color: "#10b981" }],
    },
  ]
}

export function OffersView() {
  const { data: offers, isLoading } = useQuery({
    queryKey: ["collection-offers"],
    queryFn: fetchOffers,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32 bg-[#353840]" />
          <Skeleton className="h-6 w-48 bg-[#353840]" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-[#1a202c] border border-[#353840] rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-24 bg-[#353840]" />
                <Skeleton className="h-4 w-16 bg-[#353840]" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-20 bg-[#353840]" />
                <Skeleton className="h-4 w-16 bg-[#353840]" />
                <Skeleton className="h-4 w-8 bg-[#353840]" />
                <Skeleton className="w-6 h-6 rounded-full bg-[#353840]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-[#8a939b] text-sm">72 offers</div>
        <div className="text-[#8a939b] text-sm">Total collection offers 0.0339 WETH</div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-12 gap-4 text-[#8a939b] text-xs uppercase font-medium px-4">
        <div className="col-span-2">TRAIT</div>
        <div className="col-span-2">TOP OFFER</div>
        <div className="col-span-2">RARITY</div>
        <div className="col-span-2">VOLUME</div>
        <div className="col-span-2">OFFERS</div>
        <div className="col-span-2">BIDDERS</div>
      </div>

      {/* Offers List */}
      <div className="space-y-3">
        {offers?.map((offer) => (
          <div
            key={offer.id}
            className="grid grid-cols-12 gap-4 items-center p-4 bg-[#1a202c] border border-[#353840] rounded-xl hover:bg-[#2d3748] transition-all"
          >
            <div className="col-span-2">
              <p className="text-white font-medium text-sm">{offer.trait}</p>
              <p className="text-[#8a939b] text-xs">VOL: {offer.volume}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white font-medium">{offer.topOffer}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white">{offer.rarity}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white">{offer.volume}</p>
            </div>

            <div className="col-span-2">
              <p className="text-white">{offer.offers}</p>
            </div>

            <div className="col-span-2 flex items-center space-x-2">
              {offer.bidders.map((bidder, i) => (
                <div key={i} className="w-6 h-6 rounded-full" style={{ backgroundColor: bidder.color }} />
              ))}
              <span className="text-white text-sm">1</span>
            </div>
          </div>
        ))}
      </div>

      {/* Make Collection Offer Button */}
      <div className="pt-4">
        <Button className="bg-[#2081e2] hover:bg-[#1c6dd0] text-white px-6 py-2 rounded-lg">
          Make collection offer
        </Button>
      </div>
    </div>
  )
}
