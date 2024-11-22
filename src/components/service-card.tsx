import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FC } from "react"
import * as SimpleIcons from "@icons-pack/react-simple-icons"

interface ServiceCardProps {
  title: string
  ruleCount: number
  description: string
}

export const ServiceCard: FC<ServiceCardProps> = ({
  title,
  ruleCount,
  description,
}) => {
  const iconName =
    "Si" +
    title.split(" ")[0].charAt(0).toUpperCase() +
    title.split(" ")[0].slice(1).toLowerCase()

  const IconComponent = SimpleIcons[
    iconName as keyof typeof SimpleIcons
  ] as SimpleIcons.IconType

  return (
    <Card className="flex flex-col p-6 gap-4 text-foreground rounded  h-full">
      <CardHeader className="p-0">
        <div className="flex items-center space-x-4">
          {IconComponent ? (
            <IconComponent color="default" className="w-6 h-6" />
          ) : (
            <Image
              src="/icon.svg"
              alt="Placeholder icon"
              width={24}
              height={24}
            />
          )}
          <h3 className="text-lg font-semibold text-nowrap">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-2 line-clamp-3">
          <span className="text-xs font-bold bg-muted text-muted-foreground rounded-full px-1 mr-1">
            {ruleCount} RULES
          </span>
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-0">
        <Button variant="outline" className="w-full text-xs font-semibold">
          View Alert Rules
        </Button>
      </CardFooter>
    </Card>
  )
}
