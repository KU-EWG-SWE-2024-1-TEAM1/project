const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const searchMovie = async (movieTitle) => {
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${apiKey}&movieNm=${movieTitle}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
