import { CreateKeyForm } from "@/components/create-key-form"
import Image from "next/image"

export default function CreateKeyPage() {
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
          <nav className="text-sm text-gray-13">
            <span>Settings</span>
            <span className="mx-2">›</span>
            <span>API Tokens</span>
            <span className="mx-2">›</span>
            <span>New Token</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-gray-20">Create API Key</h1>
          <p className="text-gray-13 text-sm mt-1">
            Consult the{" "}
            <a href="#" className="underline">
              HashBrownCorp docs
            </a>{" "}
            to learn more about how API keys work
          </p>
        </div>

        <CreateKeyForm />
      </div>
    </div>
  )
}
