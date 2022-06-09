import { useEffect } from 'react'
import axios from 'axios'
import { notification } from 'antd'

const ErrorHandler = (props) => {
  useEffect(() => {
    const response = axios.interceptors.response.use(
      // eslint-disable-next-line no-shadow
      (response) => response,
      (error) => {
        const {
          status,
          data: { message }
        } = error.response
        if (status >= 400 && status <= 500) {
          notification.error({
            message,
            duration: 2
          })
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axios.interceptors.response.eject(response)
    }
  }, [])

  return props.children
}

export { ErrorHandler }
