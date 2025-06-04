"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Permission = "read-only" | "full-access"

interface PermissionSetting {
  service: string
  permission: Permission
}

export function CreateKeyForm() {
  const router = useRouter()
  const [keyName, setKeyName] = useState("")
  const [expiration, setExpiration] = useState("3-months")
  const [permissions, setPermissions] = useState<PermissionSetting[]>([
    { service: "Egg Sandwiches", permission: "read-only" },
    { service: "Blueberry Muffins", permission: "read-only" },
    { service: "Sausage Biscuit", permission: "read-only" },
  ])

  const handlePermissionChange = (index: number, permission: Permission) => {
    const newPermissions = [...permissions]
    newPermissions[index].permission = permission
    setPermissions(newPermissions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the API key
    const keyData = {
      name: keyName || "Development Key",
      expiration,
      permissions,
    }

    // Store in localStorage for the prototype
    const existingKeys = JSON.parse(localStorage.getItem("apiKeys") || "[]")
    const newKey = {
      id: Math.random().toString(36).substring(2, 10),
      name: keyData.name,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      expiration: keyData.expiration,
      permissions: keyData.permissions,
    }

    localStorage.setItem("apiKeys", JSON.stringify([...existingKeys, newKey]))

    // Navigate to the key created page
    router.push(`/key-created?id=${newKey.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Key Details Section - Side by Side Layout */}
      <div className="bg-gray-3 border border-gray-5 rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 gap-8 p-6 border-b border-gray-5">
          {/* Key Name */}
          <div>
            <Label htmlFor="key-name" className="text-gray-15 text-md font-medium">
              Key Name
            </Label>
            <p className="text-gray-13 text-sm font-extralight">A name to help you identify this token</p>
          </div>
          <div className="flex justify-end">
            <Input
              id="key-name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Development Key"
              className="bg-gray-4 border-gray-6 text-gray-20 placeholder:text-gray-11 w-[300px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 p-6">
          {/* Key Expiration */}
          <div>
            <Label htmlFor="key-expiration" className="text-gray-15 text-md font-medium">
              Key Expiration
            </Label>
            <p className="text-gray-13 text-sm font-extralight">The time window before the key expires</p>
          </div>
          <div className="flex justify-end">
            <Select value={expiration} onValueChange={setExpiration}>
              <SelectTrigger className="bg-gray-4 border-gray-6 text-gray-20 w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-4 border-gray-6">
                <SelectItem value="3-months" className="text-gray-20 focus:bg-gray-5">
                  3 Months
                </SelectItem>
                <SelectItem value="6-months" className="text-gray-20 focus:bg-gray-5">
                  6 Months
                </SelectItem>
                <SelectItem value="9-months" className="text-gray-20 focus:bg-gray-5">
                  9 Months
                </SelectItem>
              </SelectContent>
            </Select>
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
          {permissions.map((item, index) => (
            <div
              key={item.service}
              className={`flex items-center justify-between p-4 ${
                index !== permissions.length - 1 ? "border-b border-gray-5" : ""
              }`}
            >
              <span className="text-gray-20 font-extralight">{item.service}</span>
              <Select
                value={item.permission}
                onValueChange={(value: Permission) => handlePermissionChange(index, value)}
              >
                <SelectTrigger className="w-[300px] bg-gray-4 border-gray-6 text-gray-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-4 border-gray-6">
                  <SelectItem value="read-only" className="text-gray-20 focus:bg-gray-5">
                    Read Only
                  </SelectItem>
                  <SelectItem value="full-access" className="text-gray-20 focus:bg-gray-5">
                    Full Access
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-custom-blue hover:bg-custom-blue/90 text-white px-6 py-2">
          Create API Key
        </Button>
      </div>
    </form>
  )
}
