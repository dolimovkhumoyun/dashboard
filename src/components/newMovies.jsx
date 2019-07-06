import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovies, saveMovie } from "../service/fakeMovieService";
import { getGenres } from "../service/fakeGenreService";

class NewMovieForm extends Form {
  state = {
    data: { title: "", genre: getGenres()[0]._id, numInStock: "", rate: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string().label("Genre"),
    numInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    rate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    const { title, genre, numInStock, rate } = this.state;
    const movie = {
      title: title,
      genreId: genre,
      numberInStock: numInStock,
      dailyRentalRate: rate
    };
    const movies = saveMovie(movie);
    console.log(movies);
    // this.setState({ movies });

    // Call the surver
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>New Movie Registration Form Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", getGenres())}
          {this.renderInput("numInStock", "Number in Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
