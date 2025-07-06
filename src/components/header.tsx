"use client"

import { Search, User, Wallet, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const categories = [
    { name: "All", active: true },
    { name: "Gaming", icon: "🎮" },
    { name: "Art", icon: "🎨" },
    { name: "PFPs", icon: "🖼️" },
    { name: "Memberships", icon: "🎫" },
    { name: "Music", icon: "🎵" },
    { name: "Photography", icon: "📸" },
  ]

  const colorDots = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // yellow
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
  ]

  return (
    <header className="border-b border-[#1e2a3a] bg-[#0d1421] sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a939b] w-5 h-5" />
              <Input
                placeholder="Search solpass"
                className="pl-12 pr-12 py-3 bg-[#1a202c] border-[#353840] text-white placeholder-[#8a939b] rounded-xl text-base h-12"
              />
              <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-[#8a939b] bg-[#353840] px-2 py-1 rounded font-mono">
                /
              </kbd>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="border-[#353840] text-white hover:bg-[#1a202c] bg-transparent border px-6 py-3 rounded-xl font-medium">
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#8a939b] hover:text-white hover:bg-[#1a202c] w-10 h-10 rounded-xl"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${category.active ? "bg-white text-black" : "text-[#8a939b] hover:text-white hover:bg-[#1a202c]"
                  }`}
              >
                {category.icon && <span className="text-base">{category.icon}</span>}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-white font-medium">All</span>
            <div className="flex items-center space-x-1">
              {colorDots.map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
              <button className="text-[#8a939b] hover:text-white ml-2">
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <button className="text-[#8a939b] hover:text-white ml-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
