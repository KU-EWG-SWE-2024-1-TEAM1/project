'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import fetchMovieData from "@/app/api/movie/fetchMovie";

const addCloudFrontUrl = (html) => {
    return html.replace(/src="([^"]+)"/g, (match, p1) => {
        if (!p1.startsWith('http') && !p1.startsWith('/')) {
            return `src="${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${p1}"`;
        }
        return match;
    });
};

const EditMovie = ({ params }) => {
    const { id } = params;
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [description, setDescription] = useState('');
    const [parsedDescription, setParsedDescription] = useState('');

    useEffect(() => {
        const loadMovieData = async () => {
            const movieData = await fetchMovieData(id);
            if (movieData) {
                setMovie(movieData);
                setTitle(movieData.title);
                setYoutubeUrl(movieData.youtubeUrl);
                const updatedDescription = addCloudFrontUrl(movieData.description);
                setDescription(movieData.description);
                setParsedDescription(parse(updatedDescription));
            }
        };
        loadMovieData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const movieData = {
            ...movie,
            title,
            description,
            youtubeUrl,
        };

        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies/${id}`, movieData, {
                headers: {
                    Authorization: `${accessToken}`
                }
            });
            alert('Movie updated successfully!');
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies/${id}`, {
                headers: {
                    Authorization: `${accessToken}`
                }
            });
            alert('Movie deleted successfully!');
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const extractYouTubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeID = extractYouTubeID(youtubeUrl);

    const handleDescriptionChange = (e) => {
        const updatedDescription = e.target.value;
        setDescription(updatedDescription);
        setParsedDescription(parse(addCloudFrontUrl(updatedDescription)));
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-40 max-w-screen-xl">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">YouTube URL</label>
                    <input
                        type="text"
                        id="youtubeUrl"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                    {youtubeID && (
                        <div className="flex justify-center mt-4">
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${youtubeID}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8 p-4 bg-transparent text-white rounded-md">
                    <h3 className="text-xl font-bold mb-4">Description:</h3>
                    <div className="prose prose-sm">
                        {parsedDescription}
                    </div>
                </div>

                <div className="mt-20 mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-white">HTML code</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full h-64 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditMovie;
