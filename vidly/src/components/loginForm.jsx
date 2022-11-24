import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi-browser";

import { handleSubmit, renderInput, renderButton } from "./helpers/form";
import auth from "../services/authService";

function LoginForm() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const location =  useLocation();

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const doSubmit = async () => {
    try {
      await auth.login(data.username, data.password);
      window.location = location.state || "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errors.username = error.response.data;
        setErrors({ username: error.response.data });
      }
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form
        onSubmit={(e) =>
          handleSubmit(e, data, schema, errors, setErrors, doSubmit)
        }
        className="container w-50 m-auto"
      >
        {renderInput(
          "Username",
          "username",
          "text",
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderInput(
          "Password",
          "password",
          "password",
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderButton("Login", data, schema)}
      </form>
    </div>
  );
}

export default LoginForm;
