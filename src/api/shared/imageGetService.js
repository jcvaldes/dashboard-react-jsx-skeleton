export const imageGetService = async (type, id) => {
  const url = `${process.env.REACT_APP_API}/image/${type}/${id}`
  return fetch(url)
    .then((response) => {
      return response.url
    })
    .catch((err) => {
      return err.message
    })
}
