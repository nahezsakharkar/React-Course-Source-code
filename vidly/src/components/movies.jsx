import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

import { getMovies, deleteMovie } from "./../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { Paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const allGeneres = { _id: 0, name: "All Genres" };
  const [selectedGenre, setSelectedGenre] = useState(allGeneres);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  async function getAllGenres() {
    const { data } = await getGenres();
    setGenres([allGeneres, ...data]);
  }

  async function getAllMovies() {
    const { data } = await getMovies();
    setMovies([...data]);
  }

  useEffect(() => {
    getAllMovies();
    getAllGenres();
  }, []);

  let filtered = movies;
  if (searchQuery) {
    filtered = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  } else if (selectedGenre && selectedGenre._id) {
    console.log(selectedGenre);
    filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
  }

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  const allMovies = Paginate(sorted, currentPage, pageSize);

  const handleSort = (path) => {
    if (sortColumn.path === path) {
      setSortColumn({
        path,
        order: sortColumn.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortColumn({
        path,
        order: "asc",
      });
    }
  };

  const handleDelete = async (movie) => {
    const originalMovies = movies;

    setMovies(originalMovies.filter((m) => m._id !== movie._id));
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This Movie has already been deleted!");
        setMovies(originalMovies);
      }
    }
  };

  const handleLike = (movie) => {
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    setMovies(
      movies.map((m) => {
        return m;
      })
    );
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(allGeneres);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { length: count } = movies;

  if (count === 0) return <p>There are No Movies in the Database</p>;

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        {props.user && (
          <Link
            to="movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        )}
        <p>Showing {filtered.length} Movies in the Database</p>
        <input
          type="text"
          id="query"
          className="form-control my-3"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MoviesTable
          user={props.user}
          onDelete={handleDelete}
          onLike={handleLike}
          allMovies={allMovies}
          onSort={handleSort}
        />
        <Pagination
          itemsCounts={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
