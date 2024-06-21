import Image from "next/image";


const EventsSection = ({ events }) => {
    return (
        <div className="min-h-[80vh] py-12 bg-cover bg-center bg-no-repeat"
             style={{backgroundImage: 'url(/back.webp)'}}>
            <div className="max-w-6xl mx-auto text-left">
            <h2 className="mt-14 text-3xl font-bold mb-6 text-gold gradient-text">시사회</h2>
                <div className="space-y-6">
                    <div
                        className="flex flex-col mt-10 mb-10 lg:flex-row justify-start space-y-4 lg:space-y-0 lg:space-x-4 ">
                        {events.slice(0, 4).map((event) => (
                            <div
                                key={event.id}
                                className="relative  shadow-md overflow-hidden group h-80 w-full lg:w-48 lg:clip-path-custom-left"
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${event.thumbnailURL}`}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 12vw"
                                    style={{objectFit: 'cover'}}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {event.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="mt-14 text-3xl font-bold mb-6 text-gold gradient-text text-right">굿즈샵</h2>
                    <div className="flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4">
                        {events.slice(4).map((event) => (
                            <div
                                key={event.id}
                                className="relative shadow-md overflow-hidden group h-80 w-full lg:w-48 lg:clip-path-custom-right"
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${event.thumbnailURL}`}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 12vw"
                                    style={{objectFit: 'cover'}}
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
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
