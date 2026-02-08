import axios from 'axios';
import type { Movie } from '../types/movie';

const api: string  = import.meta.env.VITE_TMDB_TOKEN

    interface MovieSearchResponse {
        results: Movie[];
    }

export default async function fetchMovies (query:string): Promise<Movie[]> {
        const config = {
            params: {
                query
            },
            headers:{ 
                accept: 'application/json' ,
                Authorization: `Bearer ${api}`
            }
        };

        const urlResponse = await axios.get<MovieSearchResponse>('https://api.themoviedb.org/3/search/movie',config);
        return urlResponse.data.results;
    }; 