import Image from 'next/image';

const EventsSection = ({ events }) => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-6xl mx-auto text-left">
                <h2 className="text-3xl font-bold mb-6 text-black">이벤트 소개</h2>
                <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row justify-start space-y-4 lg:space-y-0 lg:space-x-4">
                        {events.slice(0, 4).map((event) => (
                            <div
                                key={event.id}
                                className="relative shadow-md overflow-hidden group h-80 w-full lg:w-48"
                                style={{ clipPath: 'polygon(10% 100%, 100% 100%, 90% 0%, 0% 0%)' }}
                            >
                                <Image
                                    src={event.thumbnailURL}
                                    alt={event.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {event.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4">
                        {events.slice(4).map((event) => (
                            <div
                                key={event.id}
                                className="relative shadow-md overflow-hidden group h-80 w-full lg:w-48"
                                style={{ clipPath: 'polygon(0% 100%, 95% 100%, 100% 0%, 5% 0%)' }}
                            >
                                <Image
                                    src={event.thumbnailURL}
                                    alt={event.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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