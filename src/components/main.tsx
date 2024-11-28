"use client"
import { FC, useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { GroupList } from "@/components/group-list"
import { RulesDialog } from "@/components/rules-dialog"
import { RulesData } from "@/types/rules"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    <main className="flex-grow overflow-hidden">
      <ScrollArea className="h-full px-4">
        <div className="container mx-auto max-w-screen-lg py-12 flex flex-col gap-4">
          <h1 className="text-xl font-medium">Browse Library</h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <GroupList groups={filteredGroups} />
          <RulesDialog />
        </div>
      </ScrollArea>
    </main>
  )
}
