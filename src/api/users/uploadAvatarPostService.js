import axios from 'axios'

export const UploadAvatarPostService = async (avatar, userId) => {
  const url = `${process.env.REACT_APP_API}/upload/avatar/${userId}`
  const formData = new FormData()
  formData.append('image', avatar, avatar.name)

  // eslint-disable-next-line no-return-await
  return await axios.put(url, formData)
}
