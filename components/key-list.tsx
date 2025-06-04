import { Card } from "@/components/ui/card"
import type { ApiKey } from "@/components/api-key-management"
import { KeyItem } from "@/components/key-item"

interface KeyListProps {
  keys: ApiKey[]
  onRevokeKey: (id: string) => void
}

export function KeyList({ keys, onRevokeKey }: KeyListProps) {
  return (
    <Card className="bg-gray-3 border-gray-5 rounded-lg overflow-hidden">
      <div className="grid grid-cols-[1fr_200px_200px_50px] bg-gray-4 p-4 text-sm font-medium text-gray-13">
        <div>API Key</div>
        <div>Last Used</div>
        <div>Created on</div>
        <div></div>
      </div>
      <div className="divide-y divide-gray-5">
        {keys.map((key) => (
          <KeyItem key={key.id} apiKey={key} onRevoke={onRevokeKey} />
        ))}
      </div>
    </Card>
  )
}
