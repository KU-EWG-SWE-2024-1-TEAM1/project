'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Editor = dynamic(() => import('../../components/editor/editor'), { ssr: false });

const CreateMovie = () => {
    const [bigImgUrl, setBigImgUrl] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBigImgUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto my-40">
            <div className="mb-4">
                <label htmlFor="bigImg" className="block text-sm font-medium text-gray-700">Big Image</label>
                {bigImgUrl && (
                    <div
                        className="bg-cover bg-center mb-4"
                        style={{ backgroundImage: `url(${bigImgUrl})`, height: '30vh' }}
                    />
                )}
                <input
                    type="file"
                    id="bigImg"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className=" w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>

            <Editor />
        </div>
    );
};

export default CreateMovie;