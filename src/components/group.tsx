import { ServiceList } from "@/components/service-list"
import { Group as GroupType } from "@/types/rules"

interface GroupProps {
  group: GroupType
}

export function Group({ group }: GroupProps) {
  return (
    <div>
      <h2 className="text-2xs font-bold text-muted-foreground">
        {group.name.toUpperCase()}
      </h2>
      <ServiceList services={group.services} />
    </div>
  )
}
