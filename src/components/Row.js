import React, { useEffect, useState } from 'react'
// import YouTube from 'react-youtube'; // comes from our npm i react-youtube which allows us to play the trailers for the movies in a mini-player. Documentation https://openbase.com/js/react-youtube
// import movieTrailer from 'movie-trailer'; // comes from our npm i movie-trailer which searches Youtube for a trailer matching the text it's passed. Documentation https://openbase.com/js/movie-trailer
import axios from "../axios"
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/"; //base url for TMDB images, since the path is just an appended string to the base

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    // const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results);
            return response;
        }
        fetchData();
    }, [fetchUrl]); // fetchURL is a dependent in this context and must be passed back through the array. Though typically, the reason for the empty array[] is that the useEffect will only run once, when the row loads, and never again. If we wanted useEffect to run more than once, we would pass [movies] into the array. Effectively making it so that the useEffect runs each time movie changes

    // const opts = { // The documentation explains this syntax in detail if on review we need a refresher https://openbase.com/js/react-youtube 
    //     height: "390",
    //     width: "100%",
    //     playerVars: {
    //         // https://developers.google.com/youtube/player_parameters
    //         autoplay: 1,
    //     },
    // };

    // const handleClick = (movie) => {
    //     if (trailerUrl) {
    //         setTrailerUrl(''); // if a movie is already being played and that same movie is clicked, the Url will be set to an empty string. Effectively stopping the trailer from playing
    //     } else {
    //         movieTrailer(movie?.title || movie?.name || movie?.original_title || "") //movieTrailer is preset code that comes from the npm i react-youtube. It searches youtube for a trailer matching the text its passed
    //             .then((url) => {
    //                 const urlParams = new URLSearchParams(new URL(url).search); // movieTrailer grabs the entire url, but we don't need all of it
    //                 setTrailerUrl(urlParams.get("v")); // the v here will pull url string appended to 'v=' in the standard Youtube URL.
    //             }).catch(error => console.log(error));
    //     }
    // };

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id} // its best practice to have a unique key applied to every item being rendered, for optimization purposes. 
                        // onClick={handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} // using string interpolation, a ternary operator and isLargeRow we ensure the images inside the row with a class of isLargeRow to be larger
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name || movie.title} /> // a few of the movies in the Documentaries category return a backdrop_path null from the API, you'll notice they have the movie.title rendered instead.  
                ))}
            </div>
            {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */} {/* The developer posted online that the movieTrailer code does not work for TV shows and only works for movies, so I removed it from the project but kept the code in, just in case there's a change in the near future */}
        </div>
    )
}

export default Row
