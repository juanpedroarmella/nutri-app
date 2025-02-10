import { useEffect } from 'react'

import { useReducer } from 'react'
import { ClinicalData } from '../types/clinical-history.types'

enum ActionType {
  SET_WEIGHT = 'SET_WEIGHT',
  SET_SIZE = 'SET_SIZE',
  SET_IMC = 'SET_IMC'
}

interface State {
  weight: number
  size: number
  imc: number
}

type Action = {
  type: string
  payload: any
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_WEIGHT:
      return { ...state, weight: action.payload }
    case ActionType.SET_SIZE:
      return { ...state, size: action.payload }
    case ActionType.SET_IMC:
      return { ...state, imc: action.payload }
    default:
      return state
  }
}

export const useImc = (initialData: {
  weight?: number | null
  size?: number | null
}) => {
  const [state, dispatch] = useReducer(reducer, {
    weight: initialData?.weight || 0,
    size: initialData?.size || 0,
    imc: 0
  })

  const onChangeWeight = (weight: number) => {
    dispatch({ type: ActionType.SET_WEIGHT, payload: weight })
  }

  const onChangeSize = (size: number) => {
    dispatch({ type: ActionType.SET_SIZE, payload: size })
  }

  useEffect(() => {
    dispatch({
      type: ActionType.SET_IMC,
      payload: Number((state.weight / Math.pow(state.size / 100, 2)).toFixed(1))
    })
  }, [state.weight, state.size])

  return {
    state,
    onChangeWeight,
    onChangeSize
  }
}
