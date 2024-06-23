import parse from 'html-react-parser';
import movieSample from '@/app/movie/view/sample';

const SubmittedPost = ({ data = movieSample }) => {
    const { title, youtubeUrl, bigImgUrl, thumbNailUrl, description } = data;

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

    return (
        <div className="mt-8 p-4 bg-transparent text-white shadow-md rounded-md relative">
            <h2 className="mt-10 mb-6 text-7xl font-bold text-center z-20 relative">{title}</h2>
            <div className="relative mb-4" style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${bigImgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '35vh',
                width: '100%'
            }}>
                {youtubeId && (
                    <div className="mb-4 flex justify-center w-full">
                        <div className="mt-12 w-full max-w-2xl">
                            <YouTubeEmbed videoId={youtubeId}/>
                        </div>
                    </div>
                )}
            </div>
            <div className="relative z-10 p-4 text-white max-w-6xl mx-auto"
                 style={{minHeight: '50vh', marginTop: '4rem'}}>
                {parse(updatedDescription)}
                {thumbNailUrl && (
                    <div className="mt-4 flex justify-center">
                        <img className="max-w-xs" src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${thumbNailUrl}`} alt="Thumbnail" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmittedPost;