import React from 'react';
import Movies from './component/movies';
import { Route, Redirect, Switch} from 'react-router-dom';
import MoviesForm from './component/pages/MoviesForm';

import Rentals from "./component/pages/Rentals";
import NotFound from "./component/pages/NotFound";
import Customers from './component/pages/Customers';
import NavBar from './component/pages/Navbar';
import LoginForm from "./component/LoginForm";

import "./App.css";



function App() {
  return (
    <>
    <NavBar />
    <main className="container">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MoviesForm}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/"  exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
    </>
  );
}

export default App;
