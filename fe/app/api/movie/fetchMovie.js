import axios from 'axios';

const fetchMovieData = async (id) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies/${id}`);
        const movie = response.data;
        const { title, youtubeUrl, bigImgUrl, thumbNailUrl, description } = movie;
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

        let movieInfo = null;
        try {
            const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${apiKey}&movieNm=${movie.title}`;
            console.log(movie.title)
            const searchResponse = await axios.get(url);
            const movies = searchResponse.data.movieListResult.movieList;
            if (movies && movies.length > 0) {
                movieInfo = movies.find(movie => movie.movieNm === title) || movies[0];
            }
        } catch (error) {
            console.error('No matching movie data:', error);
        }

        return { ...movie, movieInfo };
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
    }
};

export default fetchMovieData;