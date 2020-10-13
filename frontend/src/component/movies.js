import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import {toast } from "react-toastify";
import {getMovies, deleteMovie} from '../component/services/movieService';
import { getGenres } from '../component/services/genreService';
import _ from 'lodash';

import  {paginate} from "../utils/paginate";
import ListGroup  from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Pagination from "./common/Pagination";
import SearchBox from './common/searchBox';


class Movies extends Component {
  state = {
    movies: [],
    getGenres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectGenre: null,
    sortColumn: {path: 'title', order: 'asc'}
  };

   async componentDidMount() {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];

      const {data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  // Adding new movies
  addNewMovie= ()=>{
    return (
      <NavLink className="nav-item nav-link active" to="/movies/new"></NavLink>
    );
  }

  handleDelete =  async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

  try{
    await deleteMovie(movie._id);
  }
  catch (ex){
    if(ex.response && ex.response.status ===404)
    toast.error("This movie has already been deleted")
    this.setState({movies: originalMovies})
  }
   
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState = { movies };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn});
  };

 handleSearch =query =>{
   this.setState({searchQuery: query, selectedGenre: null, currentPage: 1})
 }


  getPagedData =  () =>{
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn
    } = this.state;

     let filtered = allMovies;
     if (searchQuery)
       filtered = allMovies.filter((m) =>
         m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
       );
     else if (selectedGenre && selectedGenre._id)
       filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
       
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
      const { length: count } = this.state.movies;
      const {
      pageSize,
      currentPage,
      searchQuery,
      //selectedGenre,
      movies: //allMovies,
      sortColumn
    } = this.state;
   
    if (count === 0) return <p>There are no movies in the database</p>;
    
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
          {/* Render new movies*/}
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>
            There are <b>{totalCount}</b> movies in the database
          </p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
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