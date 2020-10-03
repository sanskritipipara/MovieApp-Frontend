import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import NavBar from "./NavBar/NavBar";
import './App.css';
import Home from "./core/Home";
import MovieDetails from "./MovieDetails/MovieDetails";
import Favoritepage from "./FavoritePage/Favoritepage";

const Routes = () => {
    return (
      <BrowserRouter>
      <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/movie/:movieId" exact component={MovieDetails} />
          <Route path="/favorite" exact component={Favoritepage} />
        </Switch>
      </BrowserRouter>
    ); 
  };
  
  export default Routes;
  