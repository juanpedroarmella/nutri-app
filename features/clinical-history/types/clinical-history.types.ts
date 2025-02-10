export interface ClinicalData {
  id: string
  idUser: string
  age: number | null
  size: number | null
  weight: number | null
  birthDate: Date | null
  occupation: string | null
  reasonForConsultation: string | null
  patologies: string[] | null
  clinicalHistory: string[] | null
  medications: string[] | null
  clinicalAnalyses: string[] | null
  imc: number | null
  prevNutrTreatments: string[] | null
  dailyRoutine: number | null
  foodLike: string[] | null
  foodDislike: string[] | null
  waterConsumption: string | null
  seasoningsConsumption: string[] | null
  observations: string | null
  possibleTreatment: string | null
  foodRoutine: string | null
  supplements: string[] | null
}
