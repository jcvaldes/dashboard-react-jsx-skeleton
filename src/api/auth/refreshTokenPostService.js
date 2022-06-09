import axios from 'axios'

export const refreshTokenService = async (refreshToken) => {
  const url = `${process.env.REACT_APP_API}/refresh-access-token`

  // eslint-disable-next-line no-return-await
  return await axios
    .post(url, refreshToken)
    .then((response) => {
      return response
    })
    .catch((err) => {
      Promise.reject(
        new Error({
          ok: false,
          message: err.message
        })
      )
    })
}
