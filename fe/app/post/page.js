'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortOption, setSortOption] = useState('id');
    const limit = 10;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
                    params: { page, limit, field: sortOption }
                });
                setPosts(response.data.data);
                setTotal(response.data.total);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [sortOption]);

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page * limit < total) setPage(page + 1);
    };

    return (
        <div className="container mx-auto mt-32 p-6">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">Movie Events</h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setSortOption('id')}
                    className={`px-4 py-2 mx-2 rounded-md ${sortOption === 'id' ? 'bg-blue-950 text-white' : 'bg-transparent text-gray-200'}`}
                >
                    기본순
                </button>
                <button
                    onClick={() => setSortOption('views')}
                    className={`px-4 py-2 mx-2 rounded-md ${sortOption === 'views' ? 'bg-blue-950 text-white' : 'bg-transparent text-gray-200'}`}
                >
                    조회순
                </button>
                <button
                    onClick={() => setSortOption('score')}
                    className={`px-4 py-2 mx-2 rounded-md ${sortOption === 'score' ? 'bg-blue-950 text-white' : 'bg-transparent text-gray-200'}`}
                >
                    평점순
                </button>
            </div>
            {loading ? (
                <div className="text-center text-white">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4">
                        {posts.map(post => (
                            <Link href={`/post/${post.id}`} key={post.id}>
                                <div className="flex items-center text-center bg-gray-800 bg-opacity-50 p-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-opacity-70 cursor-pointer">
                                    <div className="relative w-16 h-16 mr-4">
                                        <Image
                                            src={post.thumbnailURL.startsWith('http') ? post.thumbnailURL : `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${post.thumbnailURL}`}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg shadow-md"
                                        />
                                    </div>
                                    <h2 className="flex-1 text-lg font-semibold text-white ">{post.title}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8">
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
                </>
            )}
        </div>
    );
};

export default PostsPage;
