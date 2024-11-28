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
    <div className={cn("relative rounded bg-[#F8FAFC] flex", className)}>
      <ScrollArea className="py-6 [&>div>div]:!block">
        <pre className="px-6 text-xs font-normal text-mono">
          <code lang={language}>
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
        className="absolute right-0 top-0 bg-muted text-muted-foreground border-b rounded-none rounded-tr rounded-bl p-2 gap-1 hover:bg-muted/10"
        onClick={() => navigator.clipboard.writeText(content)}
      >
        <Copy className="h-4 w-4" />
        <span className="text-2xs font-bold">COPY</span>
      </Button>
    </div>
  )
}
