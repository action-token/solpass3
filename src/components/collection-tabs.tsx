"use client"

interface CollectionTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  slug: string
}

export function CollectionTabs({ activeTab, onTabChange, slug }: CollectionTabsProps) {
  const baseTabs = [
    { id: "items", label: "Items" },
    { id: "offers", label: "Offers" },
    { id: "holders", label: "Holders" },
    { id: "traits", label: "Traits" },
    { id: "activity", label: "Activity" },
    { id: "about", label: "About" },
  ]

  // Add mint tab for specific collections
  const tabs = slug === "superchief-community" ? [{ id: "mint", label: "Mint" }, ...baseTabs] : baseTabs

  return (
    <div className="border-b border-[#353840] bg-[#0d1421] sticky top-[73px] z-20 py-4 -mx-6 px-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 px-1 text-sm font-medium transition-colors relative ${activeTab === tab.id ? "text-white border-b-2 border-white" : "text-[#8a939b] hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
