import { useState } from "react";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function App() {

    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isModalClose = () => {
        setSelectedMovie (null);
    }

    const handleMovieSelect = (movie:Movie) => {
        setSelectedMovie (movie);
    }

    const handleSearch = async (query:string) => {
        try{
            setMovieList ([]);
            setIsLoading (true);
            setError (false);
            const data = await fetchMovies(query);
            if (data.length === 0){
                toast.error ("No movies found for your request.");
                return;
            }
            setMovieList (data);
        }catch {
            setError(true);
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch}/>
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={isModalClose}/>
            )}
            <Toaster position="top-center" reverseOrder={false}/>
            {movieList.length > 0 && (
                <MovieGrid onSelect={handleMovieSelect} movies={movieList}/>
            )}
            {isLoading && <Loader/>}
            {error && <ErrorMessage/>}
        </div>

    )

}