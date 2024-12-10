import { ClinicalDataDto } from '../dto/clinical-history.dto'
import { ClinicalDataEntity } from '../entity/clinical-history.entity'
import { ClinicalHistoryRepository } from '../repository/clinical-history.repository'
import { ClinicalData } from '../types/clinical-history.types'
export class ClinicalHistoryService {
  private readonly clinicalHistoryRepository: ClinicalHistoryRepository

  private static instance: ClinicalHistoryService | null = null

  private constructor() {
    this.clinicalHistoryRepository = new ClinicalHistoryRepository()
  }

  public static getInstance(): ClinicalHistoryService {
    if (!ClinicalHistoryService.instance) {
      ClinicalHistoryService.instance = new ClinicalHistoryService()
    }
    return ClinicalHistoryService.instance
  }

  async getClinicalHistoryByUserId(userId: string) {
    const clinicalHistory =
      await this.clinicalHistoryRepository.getClinicalHistoryByUserId(userId)

    if (!clinicalHistory) {
      return null
    }

    const dto = new ClinicalDataDto(clinicalHistory)

    return dto.getClinicalData()
  }

  async updateClinicalHistory(
    body: Partial<ClinicalData>,
    userId: string,
    id?: string
  ) {
    const data = this.bodyToEntity(body)

    if (!id) {
      return await this.clinicalHistoryRepository.createClinicalHistory({
        ...data,
        id_user: userId
      })
    }

    const clinicalHistory =
      await this.clinicalHistoryRepository.updateClinicalHistory(data, id)

    return clinicalHistory
  }

  private bodyToEntity(
    data: Partial<ClinicalData>
  ): Partial<ClinicalDataEntity> {
    return {
      age: data.age,
      size: data.size,
      weight: data.weight,
      birth_date: data.birthDate,
      occupation: data.occupation,
      reason_for_consultation: data.reasonForConsultation,
      patologies: data.patologies as unknown as string,
      clinical_history: data.clinicalHistory as unknown as string,
      medications: data.medications as unknown as string,
      clinical_analyses: data.clinicalAnalyses as unknown as string,
      imc: data.imc,
      prev_nutr_treatments: data.prevNutrTreatments as unknown as string,
      daily_routine: data.dailyRoutine,
      food_like: data.foodLike as unknown as string,
      food_dislike: data.foodDislike as unknown as string,
      water_consumption: data.waterConsumption,
      seasonings_consumption: data.seasoningsConsumption as unknown as string,
      observations: data.observations,
      possible_treatment: data.possibleTreatment,
      food_routine: data.foodRoutine
    }
  }
}

export const clinicalHistoryService = ClinicalHistoryService.getInstance()
