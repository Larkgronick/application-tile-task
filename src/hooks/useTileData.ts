import { useEffect, useState } from 'react'
import { ApiResponse } from '../types/types'

export const useTileData = (): {
  applicationData: ApiResponse
  isLoading: boolean
  error: string | null
} => {
  const [applicationData, setApplicationData] = useState<ApiResponse>(
    {} as ApiResponse
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)

    fetch('../../applicationData.json')
      .then((response) => response.json())
      .then((data) => {
        setApplicationData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`${error}: данные по заявке не загрузились`)
        setIsLoading(false)
      })
  }, [])

  return { applicationData, isLoading, error }
}
