# imsearch-app

> A progressive web application using [IMDB API](http://www.omdbapi.com/) to
> 1. Search for movie/ tv shows /game by title (and can be filtered by year)
> 2. Allow user to view searched movie's details
> 3. Allow user to create a list of favorite movies.
> 4. Provide option for user to order movie ticket (if the movie is new) or order digital copy. (Coming later)
> 5. Suggest user what movie is relevant based on his search (Coming later)
> 6. TBD
> It is responsive web app, served both in mobile and desktop.

#Technologies
> VueJS
> Vuex
> Vue Router (Routing)
> Vuetify (for UI)
> LESS (CSS Pre-compiler)
> Local Storage (for testing)

#Features
> 1. Search for movie/TV Show/Game by title based on [IMDB API](http://www.omdbapi.com/)
> 2. User can search in addition a specific year to get more accurate result.
> 3. User can sort the result list by alphabet (A-Z) or by release year or both.
> 4. User can mark a movie as his favorite.
> 5. All the previous search terms are available for user to view on search, user can choose to clear his search history.
> 6. User can view details of a movie. All info received from IMDB.
> 7. User can order/pre-order ticket to a new released movie, or buy a digital copy online (Coming soon)
> 8. User's favorites and past searched terms will be saved on the same device browser but currently will not be synchronized with other devices of the same user. Supported feature will come later.
> 9. TBD

#Version
1.0

[DEMO](https://mayashavin.github.io/IMSearchApp/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

#relays your local environment on a distant dns
ngrok http 8080

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
