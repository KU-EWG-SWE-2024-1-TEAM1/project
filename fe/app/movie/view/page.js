import SubmittedMovie from "@/app/movie/view/submittedMovie";
import { searchMovie} from "@/app/api/movieApi/searchMovie";
import movieSample from '@/app/movie/view/sample';

const MovieView = async () => {
    const { title } = movieSample;
    let movieInfo = null;

    try {
        const movies = await searchMovie(title);
        if (movies && movies.length > 0) {
            movieInfo = movies[0];
        }
    } catch (error) {
        console.error(error);
    }

    const data = { ...movieSample, movieInfo };

    return <SubmittedMovie data={data} />;
};

export default MovieView;
