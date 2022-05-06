import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3", // base url to make requests to the movie database
});

export default instance

{/*  DEVELOPER NOTE
the baseURL will be the same across the board and the 'instance' will append the base with the specific URL variation to fetch the data we need from the API */}