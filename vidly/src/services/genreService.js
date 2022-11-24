import axiosMethods from './httpService'
import config from './../config.json'

export function getGenres() {
    return axiosMethods.get(config.apiEndpoint + 'genres')
}
