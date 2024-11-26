"use client"
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"

type DialogStateContext = [boolean, Dispatch<SetStateAction<boolean>>]

export const DialogStateContext = createContext<DialogStateContext>([
  false,
  () => {},
])
export function DialogStateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DialogStateContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </DialogStateContext.Provider>
  )
}
