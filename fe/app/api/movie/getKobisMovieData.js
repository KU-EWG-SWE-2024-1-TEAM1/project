import axios from 'axios';

export default async function handler(req, res) {
    const { title } = req.query;
    const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
    const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${apiKey}&movieNm=${encodeURIComponent(title)}`;

    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'Error fetching movie data' });
    }
}