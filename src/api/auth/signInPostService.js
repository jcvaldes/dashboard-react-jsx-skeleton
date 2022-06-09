/* eslint-disable no-return-await */
import axios from 'axios'

export const signInService = async (values) => {
  const url = `${process.env.REACT_APP_API}/signin`
  return await axios.post(url, values)
}
