"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { ApiKey } from "@/components/api-key-management"
import Image from "next/image"

export default function KeyDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const keyId = params.id as string
  const [apiKey, setApiKey] = useState<ApiKey | null>(null)

  useEffect(() => {
    // Load the specific key from localStorage
    const savedKeys = localStorage.getItem("apiKeys")
    if (savedKeys) {
      const keys: ApiKey[] = JSON.parse(savedKeys)
      const foundKey = keys.find((key) => key.id === keyId)
      setApiKey(foundKey || null)
    }
  }, [keyId])

  const handleBack = () => {
    router.push("/")
  }

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-2 flex items-center justify-center">
        <div className="text-gray-20">Key not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-2">
      {/* Full-width Header */}
      <div className="w-full border-b bg-gray-3" style={{ borderBottomColor: "#1A151E" }}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 flex items-center justify-center">
                <Image src="/hashbrowncorpmark.svg" alt="HashBrownCorp" width={20} height={33} className="h-6 w-auto" />
              </div>
              <span className="text-gray-20 font-medium">HashBrownCorp</span>
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
          <nav className="text-sm text-gray-13 font-extralight">
            <span>Settings</span>
            <span className="mx-2">›</span>
            <span>API Tokens</span>
            <span className="mx-2">›</span>
            <span>{apiKey.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-20 mb-2">{apiKey.name}</h1>
        </div>

        <div className="space-y-6">
          {/* API Key Section */}
          <div className="bg-gray-3 border border-gray-5 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-20 font-medium">API Key</h3>
                  <p className="text-gray-13 text-sm font-extralight mt-1">This key has been masked for security</p>
                </div>
                <div className="px-3 py-2">
                  <span className="font-mono text-gray-20">hsh_*********{keyId.slice(-4)}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-20 font-medium">Key Expiration</h3>
                  <p className="text-gray-13 text-sm font-extralight mt-1">The time window before the key expires</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <span className="text-gray-13 font-extralight">{apiKey.expiration || "3 Months"}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-20 font-medium">Created</h3>
                  <p className="text-gray-13 text-sm font-extralight mt-1">When this key was created</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <span className="text-gray-13 font-extralight">
                    {new Date(apiKey.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Permissions Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium text-gray-20 mb-1">Key Permissions</h2>
              <p className="text-gray-13 text-sm font-extralight">Current permissions for this API key</p>
            </div>

            <div className="bg-gray-3 border border-gray-5 rounded-lg overflow-hidden">
              {apiKey.permissions?.map((permission, index) => (
                <div
                  key={permission.service}
                  className={`flex items-center justify-between p-4 ${
                    index !== (apiKey.permissions?.length || 0) - 1 ? "border-b border-gray-5" : ""
                  }`}
                >
                  <span className="text-gray-20 font-extralight">{permission.service}</span>
                  <span className="text-gray-13 font-extralight capitalize">{permission.permission.replace("-", " ")}</span>
                </div>
              )) || <div className="p-4 text-gray-13">No permissions configured</div>}
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                // Remove the key from localStorage
                const savedKeys = localStorage.getItem("apiKeys")
                if (savedKeys) {
                  const keys: ApiKey[] = JSON.parse(savedKeys)
                  const updatedKeys = keys.filter(key => key.id !== keyId)
                  localStorage.setItem("apiKeys", JSON.stringify(updatedKeys))
                  router.push("/")
                }
              }}
              className="bg-gray-4 border border-gray-6 hover:bg-gray-5 text-white px-4 py-2 rounded-md flex items-center gap-[4px]"
            >
              <Trash2 className="h-4 w-4" />
              Revoke Key
            </Button>
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-gray-4 text-gray-15 border-gray-6 hover:bg-gray-5"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
