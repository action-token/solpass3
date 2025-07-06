"use client"

import { Card } from "@/components/ui/card"

const nftGuides = [
  {
    id: 1,
    title: "What is an NFT?",
    description: "Learn the basics of non-fungible tokens",
    color: "from-[#3b82f6] to-[#1d4ed8]",
    icon: "🎨",
  },
  {
    id: 2,
    title: "How to buy an NFT",
    description: "Step-by-step guide to purchasing NFTs",
    color: "from-[#f59e0b] to-[#d97706]",
    icon: "💰",
  },
  {
    id: 3,
    title: "What is minting?",
    description: "Understanding the NFT creation process",
    color: "from-[#10b981] to-[#059669]",
    icon: "⚡",
  },
  {
    id: 4,
    title: "How to stay protected in web3",
    description: "Security best practices for NFT collectors",
    color: "from-[#f59e0b] to-[#d97706]",
    icon: "🛡️",
  },
  {
    id: 5,
    title: "How to create an NFT on solpass",
    description: "Create and list your own NFTs",
    color: "from-[#3b82f6] to-[#1d4ed8]",
    icon: "🚀",
  },
  {
    id: 6,
    title: "How to sell an NFT using solpass",
    description: "List and sell your NFTs on the marketplace",
    color: "from-[#8b5cf6] to-[#7c3aed]",
    icon: "💎",
  },
]

export function NFT101Section() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">NFT 101</h2>
        <p className="text-[#8a939b] text-sm">Learn about NFTs, Web3, and more.</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ width: "max-content" }}>
          {nftGuides.map((guide) => (
            <Card
              key={guide.id}
              className="bg-[#1a202c] border-[#353840] rounded-xl overflow-hidden hover:bg-[#2d3748] transition-all cursor-pointer min-w-[180px] group"
            >
              <div className={`h-36 bg-gradient-to-br ${guide.color} flex items-center justify-center relative`}>
                <span className="text-2xl">{guide.icon}</span>
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white text-sm mb-2 group-hover:text-[#2081e2] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-[#8a939b] text-xs">{guide.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
