import axios from 'axios'

export const usersGetService = async (isActive = true) => {
  const url = `${process.env.REACT_APP_API}/users?active=${isActive}`

  // eslint-disable-next-line no-return-await
  return await axios.get(url)
  // .catch((err) => {
  //   Promise.reject({
  //     ok: false,
  //     message: err.message,
  //   });
  // });
}
