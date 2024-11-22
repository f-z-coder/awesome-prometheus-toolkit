"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface CodeBlockProps {
  content: string
  language?: string
  className?: string
}

export function CodeBlock({
  content,
  language = "yaml",
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative rounded-md bg-muted/50 font-mono flex",
        className
      )}
    >
      <ScrollArea className="[&>div>div]:!block">
        <pre className="text-sm p-6 pt-10">
          <code className={language}>
            {content.split("\n").map((line, i) => {
              const formattedLine = line.replace(
                /(alert|expr|for|labels|severity|annotations|summary|description):/g,
                '<span class="text-[#22863A]">$1:</span>'
              )

              return (
                <div
                  key={i}
                  className="whitespace-pre leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
              )
            })}
          </code>
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Button
        className="absolute right-0 top-0 bg-muted text-muted-[#64748B] rounded font-sans p-3 hover:bg-muted/10"
        onClick={() => navigator.clipboard.writeText(content)}
      >
        <Copy className="h-4 w-4" /> <span>Copy</span>
      </Button>
    </div>
  )
}
