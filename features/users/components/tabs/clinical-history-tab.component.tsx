import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/common/components/ui/card'
import ClinicalHistoryForm from '@/features/clinical-history/components/clinical-history-form.component'
import { clinicalHistoryService } from '@/features/clinical-history/services/clinical-history.service'
import { User } from '../../types/user.types'

interface ClinicalHistoryTabProps {
  user: User
}

export default async function ClinicalHistoryTab({
  user
}: ClinicalHistoryTabProps) {
  const { error, history } =
    await clinicalHistoryService.getClinicalHistoryByUserId(user.idAuth)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Historia Clínica: {user.firstName} {user.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ClinicalHistoryForm
          userId={user.idAuth}
          initialData={history}
          error={error}
        />
      </CardContent>
    </Card>
  )
}
