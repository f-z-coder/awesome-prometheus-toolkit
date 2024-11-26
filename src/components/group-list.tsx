import { Group } from "@/components/group"
import { Group as GroupType } from "@/types/rules"

interface GroupListProps {
  groups: GroupType[]
}

export function GroupList({ groups }: GroupListProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <Group key={group.name} group={group} />
      ))}
    </div>
  )
}
