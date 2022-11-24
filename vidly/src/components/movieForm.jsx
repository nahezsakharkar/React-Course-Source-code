import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Joi from "joi-browser";

import { getGenres } from "./../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";
import {
  handleSubmit,
  renderInput,
  renderSelect,
  renderButton,
} from "./helpers/form";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  async function getAllGenres() {
    const { data } = await getGenres();
    setGenres([...data]);
  }

  async function getSingleMovie() {
    try {
      const { data } = await getMovie(id);
      setData(mapToViewModel(data));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/not-found", { replace: true });
      }
    }
  }

  useEffect(() => {
    getAllGenres();
    if (id === "new") return;

    getSingleMovie();
  }, [id]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const doSubmit = async () => {
    await saveMovie(data);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Movie Form</h1>
      <form
        onSubmit={(e) =>
          handleSubmit(e, data, schema, errors, setErrors, doSubmit)
        }
        className="container w-50 m-auto"
      >
        {renderInput(
          "Title",
          "title",
          "text",
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderSelect(
          "Geners",
          "genreId",
          genres,
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderInput(
          "Number in Stock",
          "numberInStock",
          "number",
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderInput(
          "Rate",
          "dailyRentalRate",
          "number",
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderButton("Save", data, schema)}
      </form>
    </div>
  );
};

export default MovieForm;
