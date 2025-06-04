"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { KeyList } from "@/components/key-list"
import { EmptyState } from "@/components/empty-state"

export type ApiKey = {
  id: string
  name: string
  createdAt: string
  lastUsed: string | null
  expiration: string
  permissions: Array<{ service: string; permission: string }>
}

export function ApiKeyManagement() {
  const router = useRouter()
  const [keys, setKeys] = useState<ApiKey[]>([])

  useEffect(() => {
    // Load keys from localStorage
    const savedKeys = localStorage.getItem("apiKeys")
    if (savedKeys) {
      setKeys(JSON.parse(savedKeys))
    }
  }, [])

  const handleCreateKey = () => {
    router.push("/create-key")
  }

  const handleRevokeKey = (id: string) => {
    const updatedKeys = keys.filter((key) => key.id !== id)
    setKeys(updatedKeys)
    localStorage.setItem("apiKeys", JSON.stringify(updatedKeys))
  }

  return (
    <div>
      {keys.length === 0 ? (
        <EmptyState onCreateKey={handleCreateKey} />
      ) : (
        <KeyList keys={keys} onRevokeKey={handleRevokeKey} />
      )}
    </div>
  )
}
