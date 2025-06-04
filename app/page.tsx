"use client"

import { ApiKeyManagement } from "@/components/api-key-management"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-2">
      {/* Full-width Header */}
      <div className="w-full border-b bg-gray-3" style={{ borderBottomColor: "#1A151E" }}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-[30px] w-auto flex items-center justify-center">
                <Image
                  src="/hashbrowncorpmark.svg"
                  alt="HashBrownCorp"
                  width={20}
                  height={33}
                  className="h-[30px] w-auto"
                />
              </div>
              <span className="text-gray-20 font-medium text-[20px]">HashBrownCorp</span>
            </div>
            <div className="h-8 w-8 flex items-center justify-center">
              <Image src="/user.svg" alt="User" width={28} height={28} className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Breadcrumbs */}
      <div className="w-full border-b bg-gray-2" style={{ borderBottomColor: "#1A151E" }}>
        <div className="container py-3">
          <nav className="text-sm text-gray-13">
            <span>Settings</span>
            <span className="mx-2">›</span>
            <span>API Tokens</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[20px] font-medium text-gray-20">Personal API Keys</h1>
            <p className="text-gray-13 text-[14px] mt-1">
              Use HashBrownCorp's personal API keys to build your own integrations
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = "/create-key")}
            className="bg-gray-4 border border-gray-6 hover:bg-gray-5 text-white px-4 py-2 rounded-md flex items-center gap-[4px]"
          >
            <PlusCircle className="h-4 w-4" />
            Add Key
          </Button>
        </div>

        <ApiKeyManagement />
      </div>
    </div>
  )
}
