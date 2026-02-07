import { Toaster, toast } from "react-hot-toast";
import SearchBar from "..";
import { useState } from 'react';
import { fetchMovies } from "..";
import type { Movie } from "..";
import css from "./App.module.css"
import MovieGrid from "..";
import MovieModal from "..";
import Loader from "..";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


export default function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        setMovies([])
        setIsError(false);
        setIsLoading(true)
        try {
            const data = await fetchMovies(query);

            if (data.results.length === 0) {
                toast.error("No movies found for your request.");
                return;
            }

            setMovies(data.results);
        } catch (error) {
            setIsError(true);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={css.app}>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movies.length > 0 && (
                <MovieGrid
                    movies={movies}
                    onSelect={setSelectedMovie}
                />
            )}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </div>
    )
}