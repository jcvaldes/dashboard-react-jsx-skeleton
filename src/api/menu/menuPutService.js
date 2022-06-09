import axios from 'axios'

export const menuPutService = async (id, data) => {
  const url = `${process.env.REACT_APP_API}/menu/${id}`
  // eslint-disable-next-line no-return-await
  return await axios.put(url, data)
}
