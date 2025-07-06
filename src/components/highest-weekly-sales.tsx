"use client"

import { BadgeCheck, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

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
      <div className="">
        <h2 className="text-white text-xl font-semibold mb-6">Highest Weekly Sales</h2>

        {/* Card with background image and blur */}
        <Card className="relative overflow-hidden rounded-xl border border-gray-700 p-0">

          {/* Blurred Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center  opacity-100"
            style={{ backgroundImage: `url(${data.items[0]?.image})` }}
          />

          {/* Foreground Content */}
          <div className="relative z-10 p-6 grid grid-cols-6 gap-4 bg-gray-900/60 backdrop-blur-sm rounded-xl">

            {/* Left Section: Collection Info (2 columns) */}
            <div className="col-span-2">
              <div className="flex-shrink-0 w-full">
                <div className="flex flex-col gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 bg-amber-400 rounded" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-lg">Larvva Lads</h3>
                      <BadgeCheck className="w-4 h-4 text-blue-400 " />
                    </div>
                    <div className="text-gray-400 text-sm">
                      <span className="text-white font-medium">7d sales: 115,587</span>
                      <span className="text-green-400 ml-2">+15.8%</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-8">Opepen and Larva Lads - the ultimate DNA!</p>
              </div>
            </div>

            {/* Right Section: Cards (4 columns, 3 grid items) */}
            <div className="col-span-4 grid grid-cols-3 gap-4">
              {data.items.map((item) => (
                <Card
                  key={item.id}
                  className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden p-0 gap-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-t-lg w-full aspect-square"
                  />
                  <div className="p-3">
                    <h4 className="text-white font-medium text-sm mb-1">{item.name}</h4>
                    <p className="text-gray-400 text-xs">{item.price}</p>
                  </div>
                </Card>
              ))}
            </div>

          </div>
        </Card>
      </div>
    </section>


  )
}
