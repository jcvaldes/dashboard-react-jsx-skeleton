import axios from 'axios'

export const menuPutService = async (data) => {
  const url = `${process.env.REACT_APP_API}/menu/${data._id}`
  // eslint-disable-next-line no-return-await
  return await axios.put(url, data)
}
