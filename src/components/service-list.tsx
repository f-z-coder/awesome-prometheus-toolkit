import { ServiceCard } from "@/components/service-card"
import { Service } from "@/types/rules"

interface ServiceListProps {
  services: Service[]
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.name}
          title={service.name}
          ruleCount={service.exporters.reduce(
            (acc, exporter) => acc + (exporter.rules?.length || 0),
            0
          )}
          description={
            service.exporters[0]?.rules
              ?.slice(0, 5)
              .map((rule) => rule.name)
              .join(", ") || "No description"
          }
        />
      ))}
    </div>
  )
}
