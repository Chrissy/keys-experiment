"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ApiKey } from "@/components/api-key-management"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Eye, Trash2 } from "lucide-react"

interface KeyItemProps {
  apiKey: ApiKey
  onRevoke: (id: string) => void
}

export function KeyItem({ apiKey, onRevoke }: KeyItemProps) {
  const router = useRouter()

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never used"
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  const formatCreatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const maskApiKey = (keyName: string) => {
    // Create a masked version like "hsh_*********3465"
    const prefix = "hsh_"
    const suffix = Math.random().toString().slice(-4)
    const masked = "*".repeat(9)
    return `${prefix}${masked}${suffix}`
  }

  const handleViewKey = () => {
    // Navigate to key details page
    router.push(`/key-details/${apiKey.id}`)
  }

  return (
    <div className="grid grid-cols-[1fr_200px_200px_50px] items-center p-4 text-gray-20 border-gray-5">
      <div>
        <div className="font-medium mb-1">{apiKey.name}</div>
        <div className="text-sm text-gray-13 font-mono">{maskApiKey(apiKey.name)}</div>
      </div>
      <div className="text-sm text-gray-13">{formatDate(apiKey.lastUsed)}</div>
      <div className="text-sm text-gray-13">{formatCreatedDate(apiKey.createdAt)}</div>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-13 hover:text-gray-20">
              <MoreHorizontal className="h-4 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-3 border-gray-5">
            <DropdownMenuItem
              onClick={handleViewKey}
              className="text-gray-20 hover:bg-gray-4 focus:bg-gray-4 cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              View API Key
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRevoke(apiKey.id)}
              className="text-red-400 hover:bg-red-900/20 focus:bg-red-900/20 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Revoke Key
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
