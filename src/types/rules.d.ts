export interface RulesData {
  groups: Group[]
}

export interface Group {
  name: string
  services: Service[]
}

export interface Service {
  name: string
  exporters: Exporter[]
}

export interface Exporter {
  name?: string
  slug: string
  doc_url?: string
  rules: Rule[] | null
}

export interface Rule {
  name: string
  description: string
  query: string
  severity: string
  for?: string
  content: string
  comments?: string
  summary?: string
}
