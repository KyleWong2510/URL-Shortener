export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (url) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(url)
  })
  .then(res => {
    if (res.ok) {
      console.log(res)
    } else {
      alert(`Bad Request: ${res.status} ${res.statusText}`)
    }
  })
  .catch(err => console.error(err))
}