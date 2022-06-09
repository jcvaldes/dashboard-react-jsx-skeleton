export const signUpPostService = async (data) => {
  const url = `${process.env.REACT_APP_API}/signup`

  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return fetch(request)
    .then((response) => response.json())
    .then((result) => {
      return {
        ok: !!result.ok,
        message: result.message
      }
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message
      }
    })
}
