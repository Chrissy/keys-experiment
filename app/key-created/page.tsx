"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import Image from "next/image"

export default function KeyCreatedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const keyId = searchParams.get("id")
  const [copied, setCopied] = useState(false)
  const [keySecret] = useState(
    `hsh_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(keySecret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDone = () => {
    router.push("/")
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
            <span>Development Key</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-20 mb-2">Development Key</h1>
        </div>

        <div className="space-y-6">
          {/* Alert Banner */}
          <div className="bg-custom-blue/20 text-white border border-custom-blue/50 rounded-md p-4 mb-6">
            <p>Heads up: your full key can only be viewed and copied once!</p>
          </div>

          {/* API Key Section */}
          <div className="bg-gray-3 border border-gray-5 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-5">
              <div className="flex justify-between align-center">
                <div>
                  <h3 className="text-gray-20 font-medium">API Key</h3>
                  <p className="text-gray-13 text-sm font-extralight mt-1">You can only view or copy this now</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <span className="font-mono text-green-300 mr-2">{keySecret}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-13 hover:text-gray-20 h-6 w-6 p-0"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-20 font-medium">Key Expiration</h3>
                  <p className="text-gray-13 text-sm font-extralight mt-1">The time window before the key expires</p>
                </div>
                <div className="flex items-center px-2 py-1">
                  <span className="text-gray-13 font-extralight">3 Months</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Permissions Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium text-gray-20 mb-1">Key Permissions</h2>
              <p className="text-gray-13 text-sm font-extralight">By default your key will not have any permissions</p>
            </div>

            <div className="bg-gray-3 border border-gray-5 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-5">
                <span className="text-gray-20 font-extralight">Egg Sandwiches</span>
                <span className="text-gray-13 font-extralight">Read Only</span>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-gray-5">
                <span className="text-gray-20 font-extralight">Blueberry Muffins</span>
                <span className="text-gray-13 font-extralight">Full Access</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-gray-20 font-extralight">Sausage Biscuit</span>
                <span className="text-gray-13 font-extralight">Read Only</span>
              </div>
            </div>
          </div>

          {/* Done Button */}
          <div className="flex justify-end">
            <Button onClick={handleDone} className="bg-custom-blue hover:bg-custom-blue/90 text-white px-6 py-2">
              Done
            </Button>
          </div>
        </div>

        {/* Success Notification */}
        <div className="fixed bottom-4 right-4 flex items-center bg-green-900/20 border-l-4 border-green-500 pl-4 pr-6 py-3 rounded shadow-lg">
          <div className="mr-3 w-1 h-full"></div>
          <div>
            <h4 className="text-green-400 font-medium">New Key Added</h4>
            <p className="text-green-300 text-sm font-extralight">You can find your new key in settings &gt; API Tokens</p>
          </div>
        </div>
      </div>
    </div>
  )
}
