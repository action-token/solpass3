"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CollectionHeader } from "@/components/collection-header"
import { CollectionCover } from "@/components/collection-cover"
import { CollectionTabs } from "@/components/collection-tabs"
import { CollectionFilters } from "@/components/collection-filters"
import { ItemsView } from "@/components/collection-views/items-view"
import { OffersView } from "@/components/collection-views/offers-view"
import { HoldersView } from "@/components/collection-views/holders-view"
import { TraitsView } from "@/components/collection-views/traits-view"
import { ActivityView } from "@/components/collection-views/activity-view"
import { AboutView } from "@/components/collection-views/about-view"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MintView } from "@/components/collection-views/mint-view"

interface CollectionPageProps {
  slug: string
}

export function CollectionPage({ slug }: CollectionPageProps) {
  const [activeTab, setActiveTab] = useState("items")
  const [showCover, setShowCover] = useState(true)
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const threshold = 150 // Hide cover after scrolling 150px

      const newShowCover = scrollTop <= threshold
      const newIsHeaderSticky = scrollTop > threshold

      setShowCover(newShowCover)
      setIsHeaderSticky(newIsHeaderSticky)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const renderTabContent = () => {

    switch (activeTab) {

      case "items":
        return <ItemsView />
      case "offers":
        return <OffersView />
      case "holders":
        return <HoldersView />
      case "traits":
        return <TraitsView />
      case "activity":
        return <ActivityView />
      case "mint":
        return <MintView slug={slug} />
      case "about":
        return <AboutView />
      default:
        return <ItemsView />
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1421] ">
      <SidebarProvider>
        <div className="flex  w-full">
          <Sidebar />
          <div className="flex-1 ml-16 transition-all duration-300 ">
            <Header />
            <main>
              {/* Cover Image Section - Only this hides on scroll */}
              <div
                className={`transition-all duration-300 ease-out   overflow-hidden`}
              >
                <CollectionCover slug={slug} />
              </div>

              {/* Collection Header - Becomes sticky after cover is hidden */}
              <div
                className={`bg-[#0d1421] border-b border-[#1e2a3a] transition-all duration-300 sticky top-32 z-40 `}
              >
                <div className="px-6 py-6">
                  <CollectionHeader slug={slug} />
                </div>
              </div>

              {/* Main Content Area - Add top padding when header is sticky */}
              <div className={`px-6 py-6`}>
                <div className="flex gap-6">
                  <div className="w-80 flex-shrink-0">
                    <CollectionFilters activeTab={activeTab} />
                  </div>
                  <div className="flex-1 min-w-0 ">
                    <div className={`${isHeaderSticky ? "pt-0" : ""}`}>
                      <CollectionTabs activeTab={activeTab} onTabChange={setActiveTab} slug={slug} />
                      <div className="mt-6  w-full">{renderTabContent()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div >
      </SidebarProvider >
    </div >
  )
}
