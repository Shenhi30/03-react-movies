import axios from "axios";
import type { Movie } from "../types/movie.ts";

interface fetchMoviesProps {
    results: Movie[];
    total_pages: number;
    total_results: number;
    page: number;
}

const movies = axios.create({
    baseURL: `https://api.themoviedb.org/3`,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    }
})

export const fetchMovies = async (query: string): Promise<fetchMoviesProps> => {
    const response = await movies.get<fetchMoviesProps>("/search/movie", {
        params: {
            query: query,
        }
    });
    console.log(response.data);
    return response.data
}
