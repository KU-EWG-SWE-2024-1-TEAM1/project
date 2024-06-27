'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const PatchPostPage = ({ params }) => {
    const id = params.id;
    const [post, setPost] = useState({
        title: 'Loading...',
        content: 'Loading content...',
        thumbnailURL: '',
        movie: {
            title: 'Loading movie...',
            thumbNailUrl: ''
        },
        user: {
            nickname: 'Loading author...'
        },
        views: 0,
        score: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}`);
                setPost(response.data);
                setDescription(response.data.content)
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedPost = {
                ...post,
                content: description
            };

            await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}`, updatedPost, {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            });

            alert('Post updated successfully!');
            router.push(`/post/${id}`);
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post');
        }
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            alert('Post deleted successfully!');
            router.push('/posts'); // 게시물 목록 페이지로 리디렉션
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    return (
        <div className="container mt-40 mx-auto p-6 bg-white bg-opacity-90 text-black shadow-md rounded-md max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-center">{post.title}</h1>
            <div className="flex justify-center mb-8">
                {post.thumbnailURL && (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${post.thumbnailURL}`}
                        alt="Thumbnail"
                        layout="intrinsic"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">Content:</h2>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-64 bg-transparent text-black border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Movie:</h2>
                        <div className="flex items-center mb-4">
                            {post.movie.thumbNailUrl && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${post.movie.thumbNailUrl}`}
                                    alt={post.movie.title}
                                    layout="intrinsic"
                                    width={60}
                                    height={60}
                                    className="rounded-full shadow-md"
                                />
                            )}
                            <span className="ml-4 text-xl">{post.movie.title}</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Author:</h2>
                        <p className="text-lg mb-4">{post.user.nickname}</p>
                        <h2 className="text-2xl font-semibold mb-2">Details:</h2>
                        <ul className="list-disc list-inside text-lg space-y-2">
                            <li>Views: {post.views}</li>
                            <li>Score: {post.score}</li>
                            <li>Created At: {new Date(post.createdAt).toLocaleString()}</li>
                            <li>Updated At: {new Date(post.updatedAt).toLocaleString()}</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Update Post
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatchPostPage;
