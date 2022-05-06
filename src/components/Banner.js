import React, { useEffect, useState } from 'react'
import "./Banner.css"
import axios from "../axios"
import requests from '../requests';

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                response.data.results[Math.floor(Math.random() * response.data.results.length - 1) // the banner will render a random movie image and title from the array of NetflixOriginals. To generate a random number we used math.random and we used a -1 to ensure the resulting number never goes past the max item amount in the array 
                ]
            );
            return response;
        }
        fetchData();
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str; //this function is truncating a string thats larger than a number (n) and appending an ellipsis to show its been truncated. I use it for the movie.overview
    }

    return (
        <header
            className='banner'
            style={{ //this syntax is the standard for adding inline styles through jsx in React. backgroundSize and backgroundImage are standard attributes for this style as well. The double {{}} is for it to first be interpreted as JSX and the 2nd set is for the JSX to be passed an object
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center",
            }}
        >
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <h1 className='banner__description'>
                    {truncate(movie?.overview, 150)} {/* the truncate function initialized above is being put into effect for the movie description from the API. Limiting it to only 150 characters and adding an ellipsis if it's in excess of that */}
                </h1>
            </div>

            <div className='banner--fadeBottom' /> {/* This empty div will be styled to give the banner a nice little vignette effect. See the Banner.css for the specifics */}
        </header>
    );
}

export default Banner