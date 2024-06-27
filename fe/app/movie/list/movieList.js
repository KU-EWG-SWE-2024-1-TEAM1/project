'use client'
import React, { useEffect, useState } from 'react';
import fetchMovies from "@/app/api/movie/fetchList";
import Image from 'next/image';
import Link from 'next/link';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(8);

    useEffect(() => {
        const getMovies = async () => {
            const { data, total } = await fetchMovies(page, limit);
            setMovies(data);
            setTotal(total);
            setLimit(limit);
        };
        getMovies();
    }, [page]);

    const handleNextPage = () => {
        if (page * limit < total) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="mt-32 text-6xl font-bold mb-4 text-white text-center Do-Hyeon" >Movie List</h1>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-4 gap-4">
                {movies.map(movie => (
                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                        <div className="mb-5 bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center transition-transform transform hover:scale-105 hover:bg-opacity-75 cursor-pointer">
                            <div className="relative w-full h-full mb-2 filter brightness-80 saturate-50 hover:brightness-100 hover:saturate-100 transition-all duration-300">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${movie.thumbNailUrl}`}
                                    alt="Thumbnail"
                                    layout="responsive"
                                    width={350}
                                    height={450}
                                />
                                <h2 className="text-lg font-semibold text-white mt-2 Nanum-Gothic">{movie.title}</h2>
                            </div>
                        </div>
                    </Link>
                    ))}
            </div>
            <div className="flex justify-between mt-12">
            <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page * limit >= total}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieList;
