"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 h-4 w-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for a component"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-8 text-xs font-medium placeholder:text-xs placeholder:font-medium"
      />
    </div>
  )
}
