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
  slug: string
  rules: Rule[] | null
  name?: string
  doc_url?: string
}

export interface Rule {
  name: string
  description: string
  query: string
  severity: string
  content?: string
  contentParseError?: string
  for?: string
  comments?: string
  summary?: string
}
