'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const EventButton = ({ id }) => {
    const router = useRouter();

    return (
        <div className="flex justify-center mt-8">
            <button
                onClick={() => router.push(`/post/new/${id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                이벤트 홍보하기
            </button>
        </div>
    );
};

export default EventButton;