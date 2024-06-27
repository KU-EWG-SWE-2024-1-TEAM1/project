'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import CommentForm from "@/app/post/comment/comment";
import { useRouter } from 'next/navigation';

const PostPage = ({ params }) => {
    const id = params.id;
    const router = useRouter();
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
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post data:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post data:', error);
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/post/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentAdded = () => {
        fetchComments();
    };


    return (
        <div className="mt-40 container mx-auto bg-gray-800 p-6 bg-opacity-30 text-white shadow-md rounded-md max-w-4xl"
             style={{minHeight: "80vh"}}>
            <h1 className="text-5xl font-bold mb-6 text-center">{post.title}</h1>
            <div className="flex justify-center mb-8">
                <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${post.thumbnailURL}`}
                    alt="Thumbnail"
                    layout="intrinsic"
                    width={250}
                    height={350}
                    className="rounded-lg shadow-lg"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="md:col-span-2">
                    <p className="text-lg leading-relaxed"
                    style={{whiteSpace: 'pre-line'}}>
                        {post.content}
                </p>
            </div>
            <div>
                    <h2 className="text-2xl font-semibold mb-2">Movie:</h2>
                    <div className="flex items-center mb-4">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${post.movie.thumbNailUrl}`}
                            alt={post.movie.title}
                            layout="intrinsic"
                            width={60}
                            height={60}
                            className="rounded-full shadow-md cursor-pointer"
                            onClick={() => router.push(`/movie/${post.movie.id}`)}
                        />
                        <span className="ml-4 text-xl">{post.movie.title}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 Nanum-Gothic">작성자 : {post.user.nickname}</h2>
                    <ul className="mt-56 mb-32 -ml-5 list-disc list-inside text-lg space-y-2" >
                        <h3>Views: {post.views}</h3>
                        <h3>Score: {post.score}</h3>
                        <h3 className="Nanum-Myeongjo">작성: {new Date(post.createdAt).toLocaleString()}</h3>
                        <h3 className="Nanum-Myeongjo">수정: {new Date(post.updatedAt).toLocaleString()}</h3>
                    </ul>
                </div>
            </div>
            <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
            <div className="mt-6 mb-16">
                <h2 className="text-2xl font-semibold mb-4">후기</h2>
                {comments.map(comment => (
                    <div key={comment.id} className="mb-4 p-4 bg-gray-700 bg-opacity-10 rounded-md Nanum-Pen-Script ">


                        <div className="flex justify-between  items-center mb-2">
                        <div className="ml-10 flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star} className={`text-xl ${comment.rating >= star ? 'gradient-text' : 'text-gray-400'}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="text-center flex-grow gradient-text text-4xl">" {comment.comment} "</p>
                            <span className="text-right mr-10 gradient-text text-2xl">- {comment.user.nickname} -</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;