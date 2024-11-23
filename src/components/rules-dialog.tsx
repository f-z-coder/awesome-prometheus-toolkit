import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RuleItem } from "./rule-item"
import { useContext } from "react"
import Image from "next/image"
import { RulesInfoContext } from "@/contexts/rules-info-context"
import { DialogStateContext } from "@/contexts/dialog-state-context"

export function RulesDialog() {
  const [isOpen, setIsOpen] = useContext(DialogStateContext)
  const [rulesInfo] = useContext(RulesInfoContext)

  if (!rulesInfo) return null
  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogContent className="max-h-[80vh] max-w-4xl p-0 !duration-300 !ease-in-out data-[state=open]:slide-in-from-bottom-[48%]  data-[state=closed]:slide-out-to-bottom-[48%]">
        <DialogHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-2 flex-wrap ">
            {rulesInfo.icon ? (
              <rulesInfo.icon color="default" className="w-6 h-6 shrink-0" />
            ) : (
              <Image
                src="/icon.svg"
                alt="Placeholder icon"
                width={24}
                height={24}
                className="w-6 h-6 shrink-0"
              />
            )}
            <DialogTitle className="text-nowrap">{rulesInfo.title}</DialogTitle>
            <DialogDescription className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-1">
              {rulesInfo.ruleCount} RULES
            </DialogDescription>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(80vh-8rem)] pr-4 [&>div>div]:!block">
          <div className="flex flex-col gap-6 p-6">
            {rulesInfo.rules.map((rule, index) => (
              <RuleItem key={rule.name + index} index={index + 1} rule={rule} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
