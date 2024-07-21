import React, { useState } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All Genres');
  const [rating, setRating] = useState('All Ratings');

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  const handleGenreChange = (e) => {
    console.log(e.target.value);
    setGenre(e.target.value);
  };
  const handleRatingChange = (e) => {
    console.log(e.target.value);
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === 'All Genres' ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case 'All Ratings':
        return true;
      case 'Good':
        return movie.rating >= 8;
      case 'Ok':
        return movie.rating >= 5 && movie.rating < 8;
      case 'Bad':
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies ..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All Ratings</option>
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => {
          return (
            <MovieCard
              movie={movie}
              key={movie.id}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={watchlist.includes(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
