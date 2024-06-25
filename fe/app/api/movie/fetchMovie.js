import axios from 'axios';

const fetchMovieData = async (id) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`);
        const movieSample = response.data;
        const { title } = movieSample;

        let movieInfo = null;
        try {
            const searchResponse = await axios.get(`/api/getKobisMovieData?title=${encodeURIComponent(title)}`);
            const movies = searchResponse.data.movieListResult.movieList;
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