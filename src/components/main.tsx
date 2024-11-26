"use client"
import { FC, useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { GroupList } from "@/components/group-list"
import { RulesDialog } from "@/components/rules-dialog"
import { RulesData } from "@/types/rules"

interface MainProps {
  rulesData: RulesData
}

export const Main: FC<MainProps> = ({ rulesData }) => {
  const [searchTerm, setSearchTerm] = useState("")
  // Filter groups and services based on search term
  const filteredGroups = rulesData.groups
    .map((group) => ({
      ...group,
      services: group.services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.services.length > 0)

  return (
    <main className="flex-grow px-4 py-12">
      <div className="container mx-auto max-w-screen-lg">
        <h1 className="text-xl font-medium mb-6">Browse Library</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GroupList groups={filteredGroups} />
        <RulesDialog />
      </div>
    </main>
  )
}
