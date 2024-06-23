const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const searchMovie = async (movieTitle) => {
    const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${apiKey}&movieNm=${movieTitle}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.movieListResult.movieList;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
