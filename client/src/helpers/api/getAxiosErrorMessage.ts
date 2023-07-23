import { AxiosError, AxiosResponse } from "axios"

const getAxiosErrorMessage = (error: unknown) => {
  const _error = error as AxiosError
  const response = _error?.response as AxiosResponse<{
    error: {
      message?: string
      name?: string
    }
  }>

  return response?.data?.error?.message || _error?.message
}

export { getAxiosErrorMessage }
