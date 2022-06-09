import axios from 'axios'

export const menuGetService = async () => {
  const url = `${process.env.REACT_APP_API}/menu`

  // eslint-disable-next-line no-return-await
  return await axios.get(url)
  // .catch((err) => {
  //   Promise.reject({
  //     ok: false,
  //     message: err.message,
  //   });
  // });
}
