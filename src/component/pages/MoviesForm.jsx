import React from "react";

const MoviesForm = ({match, history}) => {
  return (
    <div>
      <h4>Movie form {match.params.id}</h4>
      <button className="btn btn-primary" onClick ={()=>history.push('/movies')} >Save</button>
    </div>
  );
};

export default MoviesForm;
