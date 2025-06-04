"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface EmptyStateProps {
  onCreateKey: () => void
}

export function EmptyState({ onCreateKey }: EmptyStateProps) {
  return (
    <div className="border border-dashed rounded-lg p-16 flex flex-col items-center justify-center text-center border-gray-5 bg-gray-3">
      {/* Lock and Burger Illustration */}
      <div className="mb-6">
        <img src="/lockburger.png" alt="Lock with hamburger on clouds" className="w-[215px] h-auto mx-auto" />
      </div>

      <h3 className="text-lg font-medium text-gray-20" style={{ marginBottom: "1rem" }}>No API Keys</h3>
      <Button
        onClick={onCreateKey}
        className="bg-custom-blue hover:bg-custom-blue/90 text-white px-6 py-2 rounded-md flex items-center gap-[4px]"
      >
        <PlusCircle className="h-4 w-4" />
        Add Key
      </Button>
    </div>
  )
}
