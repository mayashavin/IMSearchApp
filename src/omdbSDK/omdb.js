let setURL = (data) => {
  let url = `http://www.omdbapi.com/?apikey=5f5e33d6`

  for (let [key, value] of data) {
    url += `&${key}=${value}`
  }

  return url
}

export default {
  photos: [],
  search (data) {
    let url = setURL(data)

    return fetch(url, {
      method: 'GET'
    }).then(response => response.json())
      .catch(error => console.error('Error: ', error))
      .then(data => data.Search)
  },
  retrieve (data) {
    let url = setURL(data)

    return fetch(url, {
      method: 'GET'
    }).then(response => response.json())
  }
}
