import React from 'react';
import movieSample from '@/app/movie/view/sample';
import { searchMovie } from "@/app/api/movieApi/searchMovie";
import CreateMovieView from '@/app/movie/view/createMovieView';

const MoviePage = async () => {
    const { title } = movieSample;
    let movieInfo = null;

    try {
        const movies = await searchMovie(title);
        if (movies && movies.length > 0) {
            movieInfo = movies.find(movie => movie.movieNm === title) || movies[0];
        }
    } catch (error) {
        console.error(error);
    }

    const data = { ...movieSample, movieInfo };

    return <CreateMovieView data={data} />;
};

export default MoviePage;