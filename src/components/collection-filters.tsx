"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface CollectionFiltersProps {
  activeTab: string
}

export function CollectionFilters({ activeTab }: CollectionFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    rarity: false,
    price: false,
    marketplaces: false,
    traits: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  if (activeTab === "holders") {
    return (
      <div className="space-y-6">
        <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Quantity owned</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleSection("quantity")}
              className="text-[#8a939b] hover:text-white w-6 h-6"
            >
              {expandedSections.status ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Min"
              className="bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
            />
            <span className="text-[#8a939b] self-center">to</span>
            <Input
              placeholder="Max"
              className="bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
            />
          </div>
          <Button className="w-full bg-[#2081e2] hover:bg-[#1c6dd0] text-white h-10">Apply</Button>
        </div>
      </div>
    )
  }

  if (activeTab === "activity") {
    return (
      <div className="space-y-6">
        <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Status</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleSection("status")}
              className="text-[#8a939b] hover:text-white w-6 h-6"
            >
              {expandedSections.status ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          {expandedSections.status && (
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button className="bg-[#2081e2] text-white px-4 py-2 rounded-lg text-sm h-8">Sale</Button>
                <Button className="bg-[#2081e2] text-white px-4 py-2 rounded-lg text-sm h-8">Mint</Button>
                <Button
                  variant="outline"
                  className="border-[#353840] text-[#8a939b] hover:text-white px-4 py-2 rounded-lg text-sm h-8 bg-transparent"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-white">
                  <span>All</span>
                </div>
                <div className="flex items-center space-x-2 text-[#2081e2]">
                  <span>Sale</span>
                </div>
                <div className="flex items-center space-x-2 text-[#2081e2]">
                  <span>Mint</span>
                </div>
                <div className="flex items-center space-x-2 text-[#8a939b]">
                  <span>Transfer</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeTab === "offers") {
    return (
      <div className="space-y-6">
        <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Traits</h3>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8a939b] w-4 h-4" />
            <Input
              placeholder="Search for trait"
              className="pl-10 bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
            />
          </div>
          <div className="space-y-2">
            {[
              { name: "Accessory 1", count: 4 },
              { name: "Accessory 2", count: 3 },
              { name: "Accessory 3", count: 3 },
              { name: "Accessory 4", count: 4 },
              { name: "Bottom", count: 9 },
              { name: "Category", count: 9 },
              { name: "Color", count: 19 },
              { name: "Hair/Hat", count: 10 },
              { name: "Shoes", count: 4 },
              { name: "Style", count: 13 },
            ].map((trait) => (
              <div key={trait.name} className="flex items-center justify-between text-sm">
                <span className="text-white">{trait.name}</span>
                <span className="text-[#8a939b]">{trait.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default filters for Items tab
  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Status</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSection("status")}
            className="text-[#8a939b] hover:text-white w-6 h-6"
          >
            {expandedSections.status ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        {expandedSections.status && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="all" />
              <label htmlFor="all" className="text-white text-sm">
                All
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="listed" />
              <label htmlFor="listed" className="text-white text-sm">
                Listed
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Rarity Filter */}
      <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Rarity</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSection("rarity")}
            className="text-[#8a939b] hover:text-white w-6 h-6"
          >
            {expandedSections.rarity ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        {expandedSections.rarity && (
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Min"
              className="bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
            />
            <span className="text-[#8a939b] self-center">to</span>
            <Input
              placeholder="Max"
              className="bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
            />
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Price</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSection("price")}
            className="text-[#8a939b] hover:text-white w-6 h-6"
          >
            {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        {expandedSections.price && (
          <div className="space-y-4">
            <select className="w-full bg-[#0d1421] border border-[#353840] text-white rounded-lg px-3 py-2 text-sm">
              <option>ETH</option>
              <option>WETH</option>
            </select>
            <div className="flex space-x-2">
              <Input
                placeholder="Min"
                className="bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
              />
              <span className="text-[#8a939b] self-center">to</span>
              <Input
                placeholder="Max"
                className="bg-[#0d1421] border-[#353840] text-white placeholder-[#8a939b] text-sm h-10"
              />
            </div>
            <Button className="w-full bg-[#2081e2] hover:bg-[#1c6dd0] text-white h-10">Apply</Button>
          </div>
        )}
      </div>

      {/* Marketplaces Filter */}
      <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Marketplaces</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSection("marketplaces")}
            className="text-[#8a939b] hover:text-white w-6 h-6"
          >
            {expandedSections.marketplaces ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        {expandedSections.marketplaces && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="solpass" defaultChecked />
                <label htmlFor="solpass" className="text-white text-sm">
                  solpass
                </label>
              </div>
              <span className="text-[#8a939b] text-sm">76</span>
            </div>
          </div>
        )}
      </div>

      {/* Traits Filter */}
      <div className="bg-[#1a202c] border border-[#353840] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Traits</h3>
        </div>
        <div className="space-y-2">
          {[
            { name: "Accessory 1", count: 4 },
            { name: "Accessory 2", count: 3 },
            { name: "Accessory 3", count: 3 },
            { name: "Accessory 4", count: 4 },
            { name: "Bottom", count: 9 },
            { name: "Category", count: 9 },
            { name: "Color", count: 19 },
            { name: "Hair/Hat", count: 10 },
            { name: "Shoes", count: 4 },
            { name: "Style", count: 13 },
            { name: "Suit", count: 32 },
            { name: "Top", count: 8 },
          ].map((trait) => (
            <div key={trait.name} className="flex items-center justify-between text-sm">
              <span className="text-white">{trait.name}</span>
              <span className="text-[#8a939b]">{trait.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
