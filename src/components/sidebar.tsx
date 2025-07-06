"use client"

import {
  Home,
  TrendingUp,
  Zap,
  BarChart3,
  Heart,
  User,
  Settings,
  HelpCircle,
  Compass,
  Grid3X3,
  Bookmark,
  Clock,
} from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { icon: Home, label: "Home", active: false },
  { icon: TrendingUp, label: "Trending", active: false },
  { icon: Zap, label: "Activity", active: false },
  { icon: BarChart3, label: "Stats", active: false },
  { icon: Grid3X3, label: "Collections", active: false },
  { icon: Heart, label: "Favorites", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Bookmark, label: "Watchlist", active: false },
  { icon: Clock, label: "History", active: false },
  { icon: Compass, label: "Explore", active: false },
  { icon: Settings, label: "Settings", active: false },
  { icon: HelpCircle, label: "Help", active: false },
]

export function Sidebar() {
  return (
    <SidebarComponent className="w-16 hover:w-64 transition-all duration-300 border-r border-[#1e2a3a] bg-[#0d1421] group">
      <SidebarContent className="bg-[#0d1421] pt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="text-[#8a939b] hover:text-white hover:bg-[#1a202c] h-12 px-4 rounded-xl transition-all group-hover:justify-start justify-center">
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  )
}
