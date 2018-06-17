let setURL = (data) => {
  let url = `https://www.omdbapi.com/?apikey=5f5e33d6`

  for (let [key, value] of data) {
    url += `&${key}=${value}`
  }

  return url
}

let format = (data) => {
  const mappings = new Map([
    ['Title', ''],
    ['Year', ''],
    ['Rated', ''],
    ['Released', 'Released'],
    ['Runtime', 'Runtime'],
    ['Genre', 'Genre'],
    ['Director', 'Director'],
    ['Writer', 'Writer'],
    ['Actors', 'Actors'],
    ['Plot', 'Plot'],
    ['Language', 'Language'],
    ['Country', 'Country'],
    ['Awards', 'Awards'],
    ['Poster', 'Poster'],
    ['Ratings', 'Ratings'],
    ['Metascore', 'Metascore'],
    ['imdbRating', 'Rating'],
    ['imdbVotes', 'Votes'],
    ['imdbID', 'ID'],
    ['DVD', 'dvdRelease'],
    ['BoxOffice', 'BoxOffice'],
    ['Production', 'Production']])

  let formattedData = {}

  for (let key in data) {
    let formattedKey = mappings.get(key) || key

    formattedData[formattedKey] = data[key]
  }

  return formattedData
}

export default {
  photos: [],
  search (data) {
    let url = setURL(data)

    return fetch(url, {
      method: 'GET'
    }).then(response => response.json())
      .catch(error => console.error('Error: ', error))
      .then(data => {
        let results

        if (data.Response === 'True') {
          results = []

          for (let i = 0; i < data.Search.length; i++) {
            results.push(format(data.Search[i]))
          }
        } else {
          results = {
            error: `${data.Error}<br> Please try again`
          }
        }

        return results
      })
  },
  retrieve (data) {
    let url = setURL(data)

    return fetch(url, {
      method: 'GET'
    }).then(response => response.json())
      .catch(error => console.error('Error: ', error))
      .then(data => format(data))
  }
}
