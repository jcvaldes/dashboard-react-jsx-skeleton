import axios from 'axios'

export const activateUserPutService = async (id, active) => {
  const url = `${process.env.REACT_APP_API}/users/${id}`

  return axios.put(url, { active }).then((result) => {
    return {
      ok: result.status === 200,
      message: result.data.message
    }
  })
}
