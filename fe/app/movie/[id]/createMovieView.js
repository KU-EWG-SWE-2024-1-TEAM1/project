import parse from 'html-react-parser';
import YouTubeEmbed from "@/app/movie/[id]/youtube";

const CreateMovieView = ({ data }) => {
    const { title, youtubeUrl, bigImgUrl, thumbNailUrl, description, movieInfo } = data;

    const addCloudFrontUrl = (html) => {
        return html.replace(/src="([^"]+)"/g, (match, p1) => {
            if (!p1.startsWith('http')) {
                return `src="${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${p1}"`;
            }
            return match;
        });
    };

    const extractYouTubeID = (url) => {
        const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    };

    const updatedDescription = addCloudFrontUrl(description);
    const youtubeId = extractYouTubeID(youtubeUrl);
    const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1` : null;

    return (
        <div className="mt-8 p-4 bg-transparent text-white shadow-md rounded-md relative">
            <h2 className="mt-10 mb-6 text-7xl font-bold text-center z-20 relative">{title}</h2>
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
                    <div className="mt-20 flex justify-center items-center bg-gray-800 bg-opacity-50 p-4 rounded"  style={{fontSize: '1.5rem'}}>
                        <img className="max-w-xs rounded-lg shadow-lg mr-4"
                             src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${thumbNailUrl}`} alt="Thumbnail"/>
                        {movieInfo && (
                            <ul className="ml-4 space-y-2 text-left">
                                {movieInfo.movieNm && <li><strong>영화 제목:</strong> {movieInfo.movieNm}</li>}
                                {movieInfo.movieNmEn && <li><strong>영문 제목:</strong> {movieInfo.movieNmEn}</li>}
                                {movieInfo.prdtYear && <li><strong>제작 연도:</strong> {movieInfo.prdtYear}</li>}
                                {movieInfo.openDt && <li><strong>개봉 연도:</strong> {movieInfo.openDt}</li>}
                                {movieInfo.genreNm && <li><strong>장르:</strong> {movieInfo.genreNm}</li>}
                                {movieInfo.directors.length > 0 && <li>
                                    <strong>감독:</strong> {movieInfo.directors.map(director => director.peopleNm).join(', ')}
                                </li>}
                                {movieInfo.showTm && <li><strong>상영 시간:</strong> {movieInfo.showTm} 분</li>}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateMovieView;
