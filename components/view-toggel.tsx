"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, Table } from "lucide-react"

interface ViewToggleProps {
  view: "card" | "table"
  setView: (view: "card" | "table") => void
}

export default function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex justify-end mb-4 mt-6">
      <div className="inline-flex  shadow-sm" role="group">
        <Button
          variant={view === "card" ? "default" : "outline"}
          onClick={() => setView("card")}
          className="  flex items-center   px-2 rounded-sm py-1"
        >
          <LayoutGrid size={22}  />
        </Button>
        <Button
          variant={view === "table" ? "default" : "outline"}
          onClick={() => setView("table")}
          className=" flex items-center  px-2 rounded-sm py-1"
        >
          <Table size={22} />
        </Button>
      </div>
    </div>
  )
}

