export interface ClinicalData {
  id: string
  idUser: string
  age: number
  size: number
  weight: number
  birthDate: Date
  occupation: string
  reasonForConsultation: string
  patologies: string[]
  clinicalHistory: string[]
  medications: string[]
  clinicalAnalyses: string[]
  imc: number
  prevNutrTreatments: string[]
  dailyRoutine: number
  foodLike: string[]
  foodDislike: string[]
  waterConsumption: string
  seasoningsConsumption: string[]
  observations: string
  possibleTreatment: string
  foodRoutine: string
  supplements: string[]
}
