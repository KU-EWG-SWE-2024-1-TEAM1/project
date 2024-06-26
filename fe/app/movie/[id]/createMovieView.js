import parse from 'html-react-parser';
import YouTubeEmbed from "@/app/movie/[id]/youtube";
import Image from "next/image";

const CreateMovieView = ({ data }) => {
    const {
        title = '데이터 없음',
        youtubeUrl = '',
        bigImgUrl = '',
        thumbNailUrl = '',
        description = '',
        movieInfo = {}
    } = data|| {};


    const addCloudFrontUrl = (html = '') => {
        return html.replace(/src="([^"]*)"/g, (match, p1) => {
            if (p1 && !p1.startsWith('http')) {
                return `src="${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${p1}"`;
            }
            return match;
        });
    };

    const extractYouTubeID = (url) => {
        try {
            const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[1].length === 11) ? match[1] : null;
        } catch (error) {
            console.error('Error extracting YouTube ID:', error);
            return null;
        }
    };

    const updatedDescription = addCloudFrontUrl(description);
    const youtubeId = extractYouTubeID(youtubeUrl);
    const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1` : null;

    return (
        <div className="mt-8 p-4 bg-transparent text-white shadow-md rounded-md relative">
            <h2 className="mt-10 mb-6 text-7xl font-bold text-center z-20 relative Do-Hyeon">{title}</h2>
            <div className="relative mb-4" style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${bigImgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '450px',
                width: '100vw'
            }}>
                {embedUrl && (
                    <div className="mb-4 flex justify-center w-full">
                        <div className="mt-12 w-full max-w-2xl z-50 justify-items-center">
                            <YouTubeEmbed videoId={youtubeId} />
                        </div>
                    </div>
                )}
            </div>
            <div className="relative z-10 p-4 text-white mx-auto my-40 max-w-screen-xl"
                 style={{ minHeight: '50vh', marginTop: '4rem', height: 'auto' }}>
                {parse(updatedDescription)}
                {thumbNailUrl && (
                    <div className="mt-20 flex  bg-gray-800 bg-opacity-50 p-4 rounded"
                         style={{fontSize: '1.5rem'}}>
                        <Image
                            className="max-w-xs rounded-lg shadow-lg ml-40 mr-16"
                            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${thumbNailUrl}`}
                            alt="Thumbnail"
                            layout="responsive"
                            width={350}
                            height={450}
                            objectFit="cover"
                        />
                        {movieInfo && (
                            <ul className="ml-8 space-y-4 text-left">
                                {movieInfo.movieNm && <li><strong>영화 제목 :</strong> <span className="Do-Hyeon ml-32">{movieInfo.movieNm}</span></li>}
                                {movieInfo.movieNmEn && <li><strong>영문 제목 :</strong> <span className="Do-Hyeon ml-32">{movieInfo.movieNmEn}</span></li>}
                                {movieInfo.prdtYear && <li><strong>제작 연도 :</strong> <span className="Do-Hyeon ml-32">{movieInfo.prdtYear}</span></li>}
                                {movieInfo.openDt && <li><strong>개봉 연도 :</strong>  <span className="Do-Hyeon ml-32">{movieInfo.openDt}</span></li>}
                                {movieInfo.genreNm && <li><strong>장르 :</strong>  <span className="Do-Hyeon ml-32">{movieInfo.genreNm}</span></li>}
                                {movieInfo.showTm && <li><strong>상영 시간 :</strong>  <span className="Do-Hyeon ml-32">{movieInfo.showTm} 분</span></li>}
                                {movieInfo.actors && movieInfo.actors.length > 0 && (
                                    <li>
                                        <strong>출연진 :</strong>
                                        <ul className="ml-40 space-y-2">
                                            {movieInfo.actors.map((actor, index) => (
                                                <li key={index} className="Nanum-Pen-Script">{actor.peopleNm}</li>
                                            ))}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateMovieView;
