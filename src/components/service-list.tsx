import { ServiceCard } from "@/components/service-card"
import { Service } from "@/types/rules"

interface ServiceListProps {
  services: Service[]
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {services.map((service) => (
        <ServiceCard key={service.name} service={service} />
      ))}
    </div>
  )
}
