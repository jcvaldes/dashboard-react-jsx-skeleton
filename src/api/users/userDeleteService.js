import axios from 'axios'

export const userDeleteService = (id) => {
  const url = `${process.env.REACT_APP_API}/users/${id}`

  return axios.delete(url).then((result) => {
    // eslint-disable-next-line no-debugger
    debugger
    return {
      ok: result.status === 200,
      message: result.data.message
    }
  })
}
