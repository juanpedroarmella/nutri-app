import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import { User } from '../../types/user.types'
import ClinicalHistoryForm from '@/features/clinical-history/components/clinical-history-form.component'
import { clinicalHistoryService } from '@/features/clinical-history/services/clinical-history.service'
import { ClinicalData } from '@/features/clinical-history/types/clinical-history.types'

interface ClinicalHistoryTabProps {
  user: User
}

export default async function ClinicalHistoryTab({
  user
}: ClinicalHistoryTabProps) {
  const history = await clinicalHistoryService.getClinicalHistoryByUserId(
    user.id
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Historia Clínica: {user.firstName} {user.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ClinicalHistoryForm userId={user.id} initialData={history} />
      </CardContent>
    </Card>
  )
}
