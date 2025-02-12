'use client'

import { useState, useEffect } from 'react'
import { Progress as ProgressBar } from './ui/progress'

export function Progress() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <ProgressBar value={progress} className='w-[60%]' />
}
