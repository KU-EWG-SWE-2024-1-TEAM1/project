import axios from 'axios';
import {searchMovie} from "@/app/api/movie/searchMovie";

const fetchMovieData = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/movies/${id}`);
        const movieSample = response.data;
        const { title } = movieSample;

        let movieInfo = null;
        try {
            const movies = await searchMovie(title);
            if (movies && movies.length > 0) {
                movieInfo = movies.find(movie => movie.movieNm === title) || movies[0];
            }
        } catch (error) {
            console.error('No matching movie data:', error);
        }

        return { ...movieSample, movieInfo };
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
    }
};

export default fetchMovieData;