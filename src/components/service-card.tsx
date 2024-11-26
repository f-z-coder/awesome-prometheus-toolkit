import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FC, useContext } from "react"
import * as SimpleIcons from "@icons-pack/react-simple-icons"
import { Service } from "@/types/rules"
import { DialogStateContext } from "@/contexts/dialog-state-context"
import { RulesInfoContext } from "@/contexts/rules-info-context"

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  const [, setIsOpen] = useContext(DialogStateContext)
  const [, setRulesInfo] = useContext(RulesInfoContext)
  const title = service.name

  const description =
    service.exporters[0]?.rules
      ?.slice(0, 5)
      .map((rule) => rule.name)
      .join(", ") || "No description"

  const ruleCount = service.exporters.reduce(
    (acc, exporter) => acc + (exporter.rules?.length || 0),
    0
  )

  const iconName =
    "Si" +
    title.split(" ")[0].charAt(0).toUpperCase() +
    title.split(" ")[0].slice(1).toLowerCase()

  const IconComponent = SimpleIcons[iconName as keyof typeof SimpleIcons] as
    | SimpleIcons.IconType
    | undefined

  return (
    <Card className="flex flex-col p-6 gap-4 text-foreground rounded  h-full">
      <CardHeader className="p-0">
        <div className="flex items-center gap-2">
          {IconComponent ? (
            <IconComponent color="default" className="w-6 h-6 flex-shrink-0" />
          ) : (
            <Image
              src="/icon.svg"
              alt="Placeholder icon"
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
            />
          )}
          <h3 className="text-sm font-bold md:text-nowrap">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground line-clamp-3">
          <span className="text-2xs font-bold bg-muted text-muted-foreground rounded-full px-1 mr-1">
            {ruleCount} RULES
          </span>
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          variant="outline"
          className="w-full py-2 px-1 text-xs font-semibold hover:bg-muted"
          onClick={() => {
            setIsOpen(true)
            setRulesInfo({
              icon: IconComponent,
              title,
              ruleCount,
              rules: service.exporters[0]?.rules || [],
            })
          }}
        >
          View Alert Rules
        </Button>
      </CardFooter>
    </Card>
  )
}
