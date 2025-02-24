"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, Table } from "lucide-react"

interface ViewToggleProps {
  view: "card" | "table"
  setView: (view: "card" | "table") => void
}

export default function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          variant={view === "card" ? "default" : "outline"}
          onClick={() => setView("card")}
          className="rounded-r-none flex items-center gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "table" ? "default" : "outline"}
          onClick={() => setView("table")}
          className="rounded-l-none flex items-center gap-2"
        >
          <Table className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

