"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedCollections } from "@/components/featured-collections"
import { TrendingTokens } from "@/components/trending-tokens"
import { FeaturedDrops } from "@/components/featured-drops"
import { TopMoversToday } from "@/components/top-movers-today"
import { TrendingCollections } from "@/components/trending-collections"
import { HighestWeeklySales } from "@/components/highest-weekly-sales"
import { NFT101Section } from "@/components/nft-101-section"
import { Footer } from "@/components/footer"
import { SidebarProvider } from "@/components/ui/sidebar"

export function MainDashboard() {
  return (
    <div className="min-h-screen bg-[#0d1421] overflow-x-hidden">
      <SidebarProvider>
        <div className="flex">
          <Sidebar />
          {/* Main content with proper margin and width constraints */}
          <div className="flex-1  transition-all duration-300 ">
            <Header />
            <main className="px-6 py-6 space-y-10  w-[calc(100vw-10vw)] mx-auto">
              <HeroCarousel />
              <FeaturedDrops />
              <TopMoversToday />
              <FeaturedCollections />
              <TrendingCollections />
              {/* <HighestWeeklySales /> */}
              <TrendingTokens />
              <NFT101Section />
            </main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
