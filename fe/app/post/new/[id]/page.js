'use client'
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FileUpload from "@/app/components/editor/FileUpload/FileUpload";

const NewPost = ({ params }) => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [type, setType] = useState('시사회');
    const thumbnailRef = useRef(null);
    const id = params.id;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/login');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadedThumbnailUrl = await thumbnailRef.current.uploadFileToS3();

        if (!uploadedThumbnailUrl) {
            alert('Failed to upload thumbnail image');
            return;
        }

        const postData = {
            title,
            content,
            movieId: id,
            thumbnailURL: `${uploadedThumbnailUrl}`,
            type,
        };
        console.log(postData);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, postData, {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            });
            alert('Post created successfully!');
            const postId = response.data.id;
            router.push(`/post/${postId}`);
        }
        catch (error) {
                console.error('Error creating post:', error);
                alert('Failed to create post.');
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="mt-32 text-4xl font-bold mb-4 text-white text-center">New Post</h1>
            <form onSubmit={handleSubmit}
                  className="mt-8 p-4 bg-transparent text-black shadow-md rounded-md relative max-w-4xl mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent border border-gray-300 text-white rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-white">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-transparent border border-gray-300 text-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    >
                        <option value="시사회">시사회</option>
                        <option value="굿즈샵">굿즈샵</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="thumbnailURL" className="block text-sm font-medium text-white">Thumbnail URL</label>
                    <FileUpload setFileUrl={setThumbnailURL} ref={thumbnailRef}  className="text-white"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-white">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-transparent text-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        style={{height: "60vh"}}
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPost;
