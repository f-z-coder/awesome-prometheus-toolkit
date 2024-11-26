"use client"
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"
import { IconType } from "@icons-pack/react-simple-icons"
import { Rule } from "@/types/rules"

interface RulesInfo {
  icon: IconType | undefined
  title: string
  ruleCount: number
  rules: Rule[]
}
type RulesInfoContext = [
  RulesInfo | null,
  Dispatch<SetStateAction<RulesInfo | null>>
]

export const RulesInfoContext = createContext<RulesInfoContext>([
  null,
  () => {},
])
export function RulesInfoProvider({ children }: { children: ReactNode }) {
  const [rulesInfo, setRulesInfo] = useState<RulesInfo | null>(null)
  return (
    <RulesInfoContext.Provider value={[rulesInfo, setRulesInfo]}>
      {children}
    </RulesInfoContext.Provider>
  )
}
