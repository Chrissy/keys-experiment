"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Copy } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface KeyCreatedDialogProps {
  keySecret: string
  onClose: () => void
}

export function KeyCreatedDialog({ keySecret, onClose }: KeyCreatedDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(keySecret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-3 border-gray-5 text-gray-20">
        <DialogHeader>
          <DialogTitle className="text-gray-20">API Key Created</DialogTitle>
          <DialogDescription className="text-gray-13">
            Your API key has been created successfully. Please copy it now as you won't be able to see it again.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Alert className="bg-blue-900/20 text-blue-300 border-blue-800">
            <AlertDescription>Heads up: your full key can only be viewed and copied once!</AlertDescription>
          </Alert>
          <div className="grid gap-2">
            <Label htmlFor="api-key" className="text-gray-15">
              API Key
            </Label>
            <div className="flex">
              <Input
                id="api-key"
                value={keySecret}
                readOnly
                className="font-mono pr-10 bg-gray-4 text-gray-20 border-gray-6"
              />
              <Button type="button" variant="ghost" size="icon" className="ml-[-40px]" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
