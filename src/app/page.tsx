import { RulesInfoProvider } from "@/contexts/rules-info-context"
import { DialogStateProvider } from "@/contexts/dialog-state-context"
import { getPrometheusRules } from "@/lib/get-prometheus-rules"
import { Main } from "@/components/main"

export const revalidate = 86400
export default async function Home() {
  const rulesData = await getPrometheusRules()
  return (
    <RulesInfoProvider>
      <DialogStateProvider>
        <Main rulesData={rulesData} />
      </DialogStateProvider>
    </RulesInfoProvider>
  )
}
