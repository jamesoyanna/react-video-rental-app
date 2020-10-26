import React from 'react';
import Form from '../common/Form';
import Joi from "joi-browser";
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from './../services/genreService';

class MoviesForm extends Form {
  state = {
  data: {
     title: "",
      genreId:"", 
      numberInStock: "", 
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  }

  //Using Joi for validation
  schema = {
     _id: Joi.string(),
     title: Joi.string()
     .required()
     .label("Title"),
     genreId: Joi.string()
     .required()
     .label("Genre"),
     numberInStock: Joi.number()
     .required()
     .min(0)
     .max(100)
     .label("Number in Stock"),
     dailyRentalRate:Joi.number()
     .required()
     .min(0)
     .max(10)
     .label("Daily Rental Rate")
  }

  async polulateGenres(){
   const {data: genres} =  await getGenres();
  this.setState({genres})
  }

  async populateMovie(){
  try{
  const movieId = this.props.match.params.id;
  if (movieId === "new") return; 
 const { data: movie } = await getMovie(movieId);
 this.setState({data: this.mapToViewModel(movie)})
  }
catch(ex){
if(ex.response && ex.response.status === 4040)
 this.props.history.repalce("/not-found")
}

}

  async componentDidMount(){
  await this.polulateGenres
  await this.populateMovie

  } 

  mapToViewModel(movie){
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = () => {
    //call to server
    saveMovie(this.state.data)
    this.props.history.push("/movies")
  }


  render() {
    return (
      <div>
      
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;















// const MoviesForm = ({match, history}) => {
//   return (
//     <div>
      

//       <button className="btn btn-primary" onClick ={()=>history.push('/movies')} >Save</button>
//     </div>
//   );
// };

// export default MoviesForm;
