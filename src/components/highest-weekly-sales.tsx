"use client"

import { CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchHighestSales = async () => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return {
    collection: {
      name: "Larvva Lads",
      verified: true,
      sales: "124,466",
      change: "+10.5%",
      description: "Opepen and Larva Lads - the ultimate DNA!",
      icon: "/placeholder.svg?height=40&width=40",
    },
    items: [
      {
        id: 1,
        name: "Larvva Lad #4893",
        price: "0.0038 ETH",
        image: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        name: "Larvva Lad #11290",
        price: "0.0038 ETH",
        image: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        name: "Larvva Lad #13273",
        price: "0.0038 ETH",
        image: "https://picsum.photos/200/300",
      },
    ],
  }
}

export function HighestWeeklySales() {
  const { data, isLoading } = useQuery({
    queryKey: ["highest-sales"],
    queryFn: fetchHighestSales,
  })

  if (isLoading) {
    return (
      <section>
        <div className="mb-6">
          <Skeleton className="h-7 w-48 bg-[#353840]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <Card className="bg-[#1a202c] border-[#353840] p-4 rounded-xl h-full">
              <Skeleton className="w-12 h-12 rounded-full bg-[#353840] mb-3" />
              <Skeleton className="h-5 w-24 bg-[#353840] mb-2" />
              <Skeleton className="h-3 w-20 bg-[#353840] mb-3" />
              <Skeleton className="h-3 w-full bg-[#353840]" />
            </Card>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-[#1a202c] border-[#353840] rounded-xl overflow-hidden">
                <Skeleton className="aspect-square w-full bg-[#353840]" />
                <div className="p-3">
                  <Skeleton className="h-4 w-3/4 bg-[#353840] mb-1" />
                  <Skeleton className="h-3 w-1/2 bg-[#353840]" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!data) return null

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Highest Weekly Sales</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Collection Info */}
        <div className="lg:col-span-1">
          <Card className="bg-[#1a202c] border-[#353840] p-4 rounded-xl h-full">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center mb-3">
              <span className="text-white text-lg">🐛</span>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              <h3 className="text-lg font-bold text-white">{data.collection.name}</h3>
              {data.collection.verified && <CheckCircle className="w-4 h-4 text-[#2081e2]" />}
            </div>
            <p className="text-[#8a939b] text-xs mb-3">
              7d sales: <span className="text-white font-medium">{data.collection.sales}</span>{" "}
              <span className="text-[#10b981]">{data.collection.change}</span>
            </p>
            <p className="text-[#8a939b] text-xs">{data.collection.description}</p>
          </Card>
        </div>

        {/* NFT Items */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.items.map((item) => (
            <Card
              key={item.id}
              className="bg-[#1a202c] border-[#353840] rounded-xl overflow-hidden hover:bg-[#2d3748] transition-all cursor-pointer"
            >
              <div className="aspect-square w-full bg-gradient-to-br from-[#4a5568] to-[#2d3748] flex items-center justify-center">
                <div className="w-20 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl">🐛</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-white text-sm mb-1">{item.name}</h4>
                <p className="text-[#8a939b] text-xs">{item.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
