"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { Minus, Plus } from "lucide-react"

const fetchMintData = async (slug: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (slug === "superchief-community" ||
        slug === "ddust-by-jiwa" ||
        slug === "pixel-art-blocks" ||
        slug === "abstractio" ||
        slug === "pepemons" ||
        slug === "extra-drop-1" ||
        slug === "extra-drop-2" ||
        slug === "extra-drop-3"

    ) {
        return {
            title: "Mint SUPERCHIEF COMMUNITY",
            itemsMinted: "179 / 6900",
            progress: 2.6,
            currentStage: {
                name: "Public Stage",
                price: "0.029 ETH",
                usdPrice: "$72.92",
                status: "MINTING NOW",
                limit: "LIMIT 420 PER WALLET",
                eligible: true,
            },
            mintSchedule: {
                publicStage: {
                    title: "Public Stage",
                    started: "June 24 at 11:00 PM GMT+6",
                    ended: "June 24, 2025 at 11:00 PM GMT+6",
                    price: "0.029 ETH | LIMIT 420 PER WALLET",
                    status: "ELIGIBLE",
                },
            },
            liveMints: [
                {
                    id: 1,
                    minter: "surgeonese...",
                    price: "0.058 ETH",
                    quantity: 2,
                    time: "8h ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 2,
                    minter: "Oac880",
                    price: "0.0009 ETH",
                    quantity: 1,
                    time: "14h ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
            liveSales: [
                {
                    id: 1,
                    item: "SUPERCHIEF...",
                    price: "0.009 WETH",
                    from: "46b13d",
                    time: "7h ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    id: 2,
                    item: "SUPERCHIEF...",
                    price: "0.0151 WETH",
                    from: "redcandlesall",
                    time: "2d ago",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
            heroImages: [
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20at%203.26.55%E2%80%AFPM-Jv9ZPe3CG1hZH3m1XLFLBwGKUc5Go7.png",
                "/placeholder.svg?height=400&width=400",
                "/placeholder.svg?height=400&width=400",
                "/placeholder.svg?height=400&width=400",
                "/placeholder.svg?height=400&width=400",
            ],
        }
    }

    return {
        title: "Mint Collection",
        itemsMinted: "0 / 1000",
        progress: 0,
        currentStage: {
            name: "Public Stage",
            price: "0.01 ETH",
            usdPrice: "$25.00",
            status: "COMING SOON",
            limit: "LIMIT 10 PER WALLET",
            eligible: true,
        },
        mintSchedule: {
            publicStage: {
                title: "Public Stage",
                started: "TBD",
                ended: "TBD",
                price: "0.01 ETH | LIMIT 10 PER WALLET",
                status: "COMING SOON",
            },
        },
        liveMints: [],
        liveSales: [],
        heroImages: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
        ],
    }
}

interface MintViewProps {
    slug: string
}

export function MintView({ slug }: MintViewProps) {
    const [mintQuantity, setMintQuantity] = useState(1)

    const { data: mintData, isLoading } = useQuery({
        queryKey: ["collection-mint", slug],
        queryFn: () => fetchMintData(slug),
    })

    const increaseMint = () => {
        setMintQuantity((prev) => prev + 1)
    }

    const decreaseMint = () => {
        setMintQuantity((prev) => Math.max(1, prev - 1))
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <Skeleton className="h-96 bg-[#353840] rounded-xl mb-8" />
                    <Skeleton className="h-64 bg-[#353840] rounded-xl" />
                </div>
                <div>
                    <Skeleton className="h-64 bg-[#353840] rounded-xl mb-6" />
                    <Skeleton className="h-32 bg-[#353840] rounded-xl" />
                </div>
            </div>
        )
    }

    if (!mintData) return null

    return (
        <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Hero Images and Mint Schedule */}
            <div className="col-span-2 space-y-8">
                {/* Hero Images Section */}
                <div className="h-96 bg-gradient-to-br from-[#1a202c] to-[#2d3748] rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex space-x-4">
                            {mintData.heroImages.slice(0, 5).map((image, i) => (
                                <div
                                    key={i}
                                    className="w-64 h-80 rounded-xl overflow-hidden bg-gradient-to-br from-[#4a5568] to-[#2d3748] flex items-center justify-center"
                                    style={{
                                        transform: `translateY(${i % 2 === 0 ? "-20px" : "20px"}) scale(${1 - i * 0.05})`,
                                        zIndex: 5 - i,
                                    }}
                                >
                                    <img src={image || "/placeholder.svg"} alt={`NFT ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mint Schedule */}
                <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-xl flex items-center justify-center">
                            <span className="text-white text-2xl">🎨</span>
                        </div>
                        <Button className="bg-[#2081e2] hover:bg-[#1c6dd0] text-white px-6 py-2 rounded-lg">View items</Button>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">{mintData.title}</h2>
                    <p className="text-[#8a939b] text-sm mb-6">Items minted: {mintData.itemsMinted}</p>

                    <div className="bg-[#0d1421] border border-[#353840] rounded-lg p-4 mb-6">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                            <span className="text-white font-medium text-sm">{mintData.currentStage.status}</span>
                        </div>
                        <p className="text-[#8a939b] text-sm">{mintData.itemsMinted}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white font-medium uppercase text-sm">MINT SCHEDULE</h3>

                        <div className="bg-[#0d1421] border border-[#353840] rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-white font-medium">{mintData.mintSchedule.publicStage.title}</h4>
                                <span className="text-[#10b981] text-xs bg-[#10b981]/20 px-2 py-1 rounded">
                                    {mintData.mintSchedule.publicStage.status}
                                </span>
                            </div>
                            <p className="text-[#8a939b] text-sm mb-2">Started: {mintData.mintSchedule.publicStage.started}</p>
                            <p className="text-[#8a939b] text-sm mb-3">Ended: {mintData.mintSchedule.publicStage.ended}</p>
                            <p className="text-white text-sm font-medium">{mintData.mintSchedule.publicStage.price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Mint Controls and Live Activity */}
            <div className="space-y-6">
                {/* Mint Controls */}
                <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-white font-medium text-lg mb-2">{mintData.currentStage.name}</h3>
                            <p className="text-3xl font-bold text-white mb-1">{mintData.currentStage.price}</p>
                            <p className="text-[#8a939b] text-sm mb-3">{mintData.currentStage.usdPrice}</p>
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                                <span className="text-[#10b981] text-sm font-medium">{mintData.currentStage.status}</span>
                            </div>
                            <p className="text-[#8a939b] text-xs">{mintData.currentStage.limit}</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[#8a939b] text-sm">Items minted</p>
                            <p className="text-white text-lg font-medium">{mintData.itemsMinted}</p>
                            <div className="w-full bg-[#0d1421] rounded-full h-2">
                                <div
                                    className="bg-[#2081e2] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${mintData.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={decreaseMint}
                                className="border-[#353840] text-white hover:bg-[#2d3748] w-10 h-10 bg-transparent"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-white text-xl font-medium w-8 text-center">{mintQuantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={increaseMint}
                                className="border-[#353840] text-white hover:bg-[#2d3748] w-10 h-10 bg-transparent"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        <Button className="w-full bg-[#2081e2] hover:bg-[#1c6dd0] text-white py-3 text-lg font-medium">Mint</Button>
                    </div>
                </div>

                {/* Live Mints */}
                <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium uppercase text-sm">LIVE MINTS</h3>
                        <div className="flex items-center space-x-4 text-xs text-[#8a939b] uppercase">
                            <span>MINTER</span>
                            <span>PRICE</span>
                            <span>QTY</span>
                            <span>TIME</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {mintData.liveMints.map((mint) => (
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
                        <div className="flex items-center space-x-4 text-xs text-[#8a939b] uppercase">
                            <span>ITEM</span>
                            <span>PRICE</span>
                            <span>FROM</span>
                            <span>TIME</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {mintData.liveSales.map((sale) => (
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
