import axiosMethods from './httpService'
import config from './../config.json'

export function getMovies() {
    return axiosMethods.get(config.apiEndpoint + 'movies')
}

export function getMovie(movield) {
    return axiosMethods.get(config.apiEndpoint + "movies/" + movield);
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return axiosMethods.put(config.apiEndpoint + "movies/" + movie._id, body);
    }
    return axiosMethods.post(config.apiEndpoint + "movies/", movie);

}

export function deleteMovie(movieId) {
    return axiosMethods.delete(config.apiEndpoint + 'movies/' + movieId)
}

