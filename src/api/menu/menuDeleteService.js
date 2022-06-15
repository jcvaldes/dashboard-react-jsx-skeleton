import axios from 'axios'

export const menuDeleteService = async (data) => {
  const url = `${process.env.REACT_APP_API}/menu`
  // eslint-disable-next-line no-return-await
  return await axios.delete(url, data)
}
