import { CodeBlock } from "./code-block"
import { Rule } from "@/types/rules"

interface RuleItemProps {
  index: number
  rule: Rule
}

export function RuleItem({ index, rule }: RuleItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground text-xs font-bold">
        {String(index).padStart(2, "0")}
      </div>
      <div className="flex flex-col overflow-hidden flex-grow gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{rule.name}</h3>
          <p className="text-xs font-medium text-muted-foreground">
            {rule.description}
          </p>
        </div>
        <CodeBlock
          content={
            rule.content || rule.contentParseError || "No Rule Available"
          }
        />
      </div>
    </div>
  )
}
