"use client"

import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

const fetchCoverData = async (slug: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    coverImage: "/images/deepie-stuff-cover.png",
    itemsPreview: [
      { id: 1, image: "https://picsum.photos/200/300", name: "Item 1" },
      { id: 2, image: "https://picsum.photos/200/300", name: "Item 2" },
      { id: 3, image: "https://picsum.photos/200/300", name: "Item 3" },
      { id: 4, image: "https://picsum.photos/200/300", name: "Item 4" },
      { id: 5, image: "https://picsum.photos/200/300", name: "Item 5" },
      { id: 6, image: "https://picsum.photos/200/300", name: "Item 6" },
    ],
  }
}

interface CollectionCoverProps {
  slug: string
}

export function CollectionCover({ slug }: CollectionCoverProps) {
  const { data: coverData, isLoading } = useQuery({
    queryKey: ["collection-cover", slug],
    queryFn: () => fetchCoverData(slug),
  })

  if (isLoading) {
    return (
      <div className="h-80 bg-[#1a202c] relative overflow-hidden">
        <Skeleton className="w-full h-full bg-[#353840]" />
      </div>
    )
  }

  if (!coverData) return null

  return (
    <div className="h-80 relative overflow-hidden bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#4a5568]">
      {/* Cover Image */}
      <div className="absolute inset-0">
        <img
          src={coverData.coverImage || "/placeholder.svg"}
          alt="Collection Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Floating NFT Grid Overlay */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-8">
        <div className="grid grid-cols-12 gap-2 max-w-6xl mx-auto opacity-90">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-[#4facfe]/80 to-[#00f2fe]/80 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center"
              style={{
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <span className="text-white text-xs">🎨</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Title Overlay */}
      <div className="absolute bottom-8 left-8 text-white">
        <h1 className="text-4xl font-bold mb-2">DeePie Stuff Collection</h1>
        <p className="text-lg opacity-90">Explore 553 unique digital collectibles</p>
      </div>
    </div>
  )
}
