import axios from 'axios'

export const userPutService = async (data) => {
  const url = `${process.env.REACT_APP_API}/users/${data._id}`
  const options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const formData = new FormData()
  const { avatar, name, lastname, email, role, password } = data
  // eslint-disable-next-line no-unused-expressions
  if (avatar) formData.append('image', avatar)

  formData.append('name', name)
  formData.append('lastname', lastname)
  formData.append('email', email)
  formData.append('role', role)
  formData.append('password', password)
  // eslint-disable-next-line no-return-await
  return axios.put(url, formData, options).then((result) => {
    return {
      ok: result.status === 200,
      message: result.data.message
    }
  })
}
