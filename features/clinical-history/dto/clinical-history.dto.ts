import { ClinicalDataEntity } from '../entity/clinical-history.entity'
import { ClinicalData } from '../types/clinical-history.types'

export class ClinicalDataDto {
  constructor(private clinicalData: ClinicalDataEntity) {}

  getClinicalData(): ClinicalData {
    return {
      id: this.clinicalData.id,
      idUser: this.clinicalData.id_user,
      age: this.clinicalData.age,
      size: this.clinicalData.size,
      weight: this.clinicalData.weight,
      birthDate: this.clinicalData.birth_date,
      occupation: this.clinicalData.occupation,
      reasonForConsultation: this.clinicalData.reason_for_consultation,
      patologies: this.parseStringArray(this.clinicalData.patologies),
      clinicalHistory: this.parseStringArray(
        this.clinicalData.clinical_history
      ),
      medications: this.parseStringArray(this.clinicalData.medications),
      clinicalAnalyses: this.parseStringArray(
        this.clinicalData.clinical_analyses
      ),
      imc: this.clinicalData.imc,
      prevNutrTreatments: this.parseStringArray(
        this.clinicalData.prev_nutr_treatments
      ),
      dailyRoutine: this.clinicalData.daily_routine,
      foodLike: this.parseStringArray(this.clinicalData.food_like),
      foodDislike: this.parseStringArray(this.clinicalData.food_dislike),
      foodRoutine: this.clinicalData.food_routine,
      waterConsumption: this.clinicalData.water_consumption,
      seasoningsConsumption: this.parseStringArray(
        this.clinicalData.seasonings_consumption
      ),
      possibleTreatment: this.clinicalData.possible_treatment,
      observations: this.clinicalData.observations,
      supplements: this.parseStringArray(this.clinicalData.supplements)
    }
  }

  private parseStringArray(value: string | null): string[] {
    if (!value) return []
    try {
      return JSON.parse(value)
    } catch {
      return []
    }
  }
}
