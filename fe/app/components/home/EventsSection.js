'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const EventsSection = () => {
    const [previews, setPreviews] = useState([]);
    const [goods, setGoods] = useState([]);
    const [sortOption, setSortOption] = useState('id'); // 기본순으로 초기 설정
    const router = useRouter();

    useEffect(() => {
        fetchEvents();
    }, [sortOption]);

    const fetchEvents = async () => {
        try {
            const previewResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/preview`, {
                params: { page: 1, limit: 4, field: sortOption }
            });
            setPreviews(previewResponse.data.data);

            const goodsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/goods`, {
                params: { page: 1, limit: 4, field: sortOption }
            });
            setGoods(goodsResponse.data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const handleClick = (id) => {
        router.push(`/post/${id}`);
    };

    return (
        <div className="min-h-[80vh] py-12 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/back.webp)'}}>
            <div className="max-w-6xl mx-auto ">
                <div className="mt-10 flex justify-end space-x-4 mb-6 Nanum-Myeongjo">
                    {['id', 'views', 'score'].map(option => (
                        <button
                            key={option}
                            onClick={() => handleSortChange(option)}
                            className={`text-lg font-semibold ${sortOption === option ? 'text-yellow-400' : 'text-white'} hover:text-yellow-100 transition`}
                        >
                            {option === 'id' ? '기본순' : option === 'views' ? '조회순' : '평점순'}
                        </button>
                    ))}
                </div>

                <h2 className="mt-5 text-3xl font-bold mb-6 text-gold gradient-text text-left">시사회</h2>
                <div className="space-y-6">
                    <div className="flex flex-col mt-10 mb-10 lg:flex-row justify-start space-y-4 lg:space-y-0 lg:space-x-4 ">
                        {previews.map((event) => (
                            <div
                                key={event.id}
                                className="relative shadow-md overflow-hidden group h-80 w-full lg:w-48 lg:clip-path-custom-left"
                                style={{
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                                    border: '3px solid goldenrod',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}
                                onClick={() => handleClick(event.id)}
                            >
                                <div style={{
                                    boxShadow: '0 0 10px 3px gold, 0 0 20px 6px goldenrod, 0 0 30px 9px darkgoldenrod',
                                    padding: '5px',
                                    borderRadius: 'inherit',
                                    backgroundColor: 'white'
                                }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${event.thumbnailURL}`}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 12vw"
                                        style={{objectFit: 'cover'}}
                                        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {event.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="mt-14 text-3xl font-bold mb-6 text-right gradient-text ">굿즈샵</h2>
                    <div className="flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4">
                        {goods.map((event) => (
                            <div
                                key={event.id}
                                className="relative shadow-md overflow-hidden group h-80 w-full lg:w-48 lg:clip-path-custom-right"
                                style={{
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                                    border: '3px solid goldenrod',
                                    borderRadius: '10px',
                                    overflow: 'hidden'
                                }}
                                onClick={() => handleClick(event.id)}
                            >
                                <div style={{
                                    boxShadow: '0 0 10px 3px gold, 0 0 20px 6px goldenrod, 0 0 30px 9px darkgoldenrod',
                                    padding: '5px',
                                    borderRadius: 'inherit',
                                    backgroundColor: 'white'
                                }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${event.thumbnailURL}`}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 12vw"
                                        style={{objectFit: 'cover'}}
                                        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {event.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsSection;
