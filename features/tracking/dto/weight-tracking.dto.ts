import { WeightTrackingEntity } from '../entities/tracking.entity'
import { WeightTracking } from '../types/weight-tracking.types'

export class WeightTrackingDto {
  constructor(private readonly entity: WeightTrackingEntity) {}

  toWeightTracking(): WeightTracking {
    return {
      id: this.entity.id,
      userId: this.entity.user_id,
      weight: this.entity.weight,
      date: this.entity.date,
      notes: this.entity.notes,
      createdAt: this.entity.created_at,
      updatedAt: this.entity.updated_at
    }
  }
}
