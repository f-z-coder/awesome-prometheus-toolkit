import { Liquid } from "liquidjs"
import { parse as yamlParse } from "yaml"
import { RulesData } from "@/types/rules"

// Template for Prometheus alert rule generation
const TEMPLATE = `{% assign ruleName = name | split: ' ' %}{% capture ruleNameCamelcase %}{% for word in ruleName %}{{ word | capitalize }} {% endfor %}{% endcapture %}
{% assign comment_lines = comments | strip | split: '\n' %}
{% for comment in comment_lines %}# {{ comment | strip }}
{% endfor %}- alert: {{ ruleNameCamelcase | remove: ' ' | remove: '-' }}
  expr: '{{ query }}'
  for: {% if for %}{{ for }}{% else %}0m{% endif %}
  labels:
    severity: {{ severity }}
  annotations:
    summary: {% if summary %}{{ summary }}{% else %}{{ name }} (instance {% raw %}{{ $labels.instance }}{% endraw %}){% endif %}
    description: "{{ description | replace: '"', '\"' }}\\n  VALUE = {% raw %}{{ $value }}{% endraw %}\\n  LABELS = {% raw %}{{ $labels }}{% endraw %}"`

/**
 * Fetches and processes Prometheus alert rules from GitHub
 * @returns Promise resolving to processed rules data
 */
export async function getPrometheusRules(): Promise<RulesData> {
  try {
    // Fetch rules YAML from GitHub
    const response = await fetch(
      "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/_data/rules.yml"
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parse YAML content
    const yamlContent = await response.text()
    const rulesData = yamlParse(yamlContent)

    // Initialize Liquid engine
    const engine = new Liquid()

    // Deep copy of original rules data to modify
    const processedRules: RulesData = JSON.parse(JSON.stringify(rulesData))

    // Process rules with template
    for (const groupIndex in processedRules.groups) {
      for (const serviceIndex in processedRules.groups[groupIndex].services) {
        const service = processedRules.groups[groupIndex].services[serviceIndex]

        // Process exporters
        for (const exporterIndex in service.exporters) {
          const exporter = service.exporters[exporterIndex]

          // Check if exporter has rules
          if (exporter.rules && exporter.rules.length > 0) {
            // Process each rule
            for (const ruleIndex in exporter.rules) {
              const rule = exporter.rules[ruleIndex]

              try {
                // Render template with rule data
                const renderedContent = await engine.parseAndRender(
                  TEMPLATE,
                  rule
                )

                // Add rendered content to the rule
                rule.content = renderedContent
              } catch (ruleError) {
                console.error(`Error processing rule ${rule.name}:`, ruleError)

                // Add error handling
                rule.contentParseError =
                  ruleError instanceof Error
                    ? ruleError.message
                    : "Unknown error"
              }
            }
          }
        }
      }
    }

    return processedRules
  } catch (error) {
    console.error("Error fetching and processing Prometheus rules:", error)
    throw error
  }
}
