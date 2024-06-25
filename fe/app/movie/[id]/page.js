import React from 'react';
import fetchMovieData from "@/app/api/movie/fetchMovie";
import CreateMovieView from '@/app/movie/[id]/createMovieView';

const MoviePage = async ({ params }) => {
    const { id } = params;
    const data = await fetchMovieData(id);

    return <CreateMovieView data={data} />;
};

export default MoviePage;