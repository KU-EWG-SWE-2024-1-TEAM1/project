import Image from 'next/image';

const EventsSection = ({ events }) => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-black text-left">이벤트 소개</h2>
                <div className="space-y-6">
                <div className="flex justify-start space-x-4">
                        {events.slice(0, 4).map((event) => (
                            <div
                                key={event.id}
                                className="relative border rounded-lg shadow-md overflow-hidden group h-80 w-48"
                            >
                                <Image
                                    src={event.thumbnailURL}
                                    alt={event.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {event.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-4">
                        {events.slice(4).map((event) => (
                            <div
                                key={event.id}
                                className="relative border rounded-lg shadow-md overflow-hidden group h-80 w-48"
                            >
                                <Image
                                    src={event.thumbnailURL}
                                    alt={event.title}
                                    layout="fill"
                                    objectFit="cover"
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
