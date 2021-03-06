import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./common/moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../service/fakeMovieService";
import { getGenres } from "../service/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: 1, name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    // let filtered;

    let filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    if (selectedGenre === undefined || selectedGenre._id === 1) {
      filtered = allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (totalCount === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary mb-2">
            New Movie
          </Link>
          <p>
            Showing <strong>{totalCount}</strong> movies in the database.
          </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
