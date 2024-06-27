import React from 'react';
import fetchMovieData from "@/app/api/movie/fetchMovie";
import CreateMovieView from '@/app/movie/[id]/createMovieView';
import EventButton from "@/app/movie/[id]/routeToNewEvent";

const MoviePage = async ({ params }) => {
    const { id } = params;
    const data = await fetchMovieData(id);

    return (
        <div>
            <CreateMovieView data={data} />
            <EventButton id={id} />
        </div>
    );
};

export default MoviePage;