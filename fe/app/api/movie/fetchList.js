import axios from 'axios';

const fetchMovies = async (page = 1, limit = 8) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { data: [], total: 0 };
    }
};

export default fetchMovies;
