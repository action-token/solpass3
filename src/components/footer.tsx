"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, HelpCircle, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0d1421] border-t border-[#1e2a3a] mt-12">
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Newsletter Signup */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-[#2081e2]" />
              <h3 className="text-lg font-semibold text-white">Sign up for our newsletter</h3>
            </div>
            <p className="text-[#8a939b] text-sm">
              Join our newsletter to get web3 news, updates, interviews, and deep dives all in one place.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Email address"
                className="bg-[#1a202c] border-[#353840] text-white placeholder-[#8a939b] rounded-lg flex-1 h-10"
              />
              <Button className="bg-[#2081e2] hover:bg-[#1c6dd0] px-4 rounded-lg h-10 text-sm">Sign up</Button>
            </div>
          </div>

          {/* Help Center */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#2081e2]" />
              <h3 className="text-lg font-semibold text-white">Help Center</h3>
            </div>
            <p className="text-[#8a939b] text-sm">
              Visit our Help Center to learn more about using different features.
            </p>
            <Button
              variant="outline"
              className="border-[#353840] text-white hover:bg-[#1a202c] rounded-lg bg-transparent h-10 text-sm"
            >
              Visit Help Center
            </Button>
          </div>

          {/* Contact Support */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-[#2081e2]" />
              <h3 className="text-lg font-semibold text-white">Need to contact support?</h3>
            </div>
            <p className="text-[#8a939b] text-sm">Ask product questions, report problems, or leave feedback.</p>
            <Button
              variant="outline"
              className="border-[#353840] text-white hover:bg-[#1a202c] rounded-lg bg-transparent h-10 text-sm"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
