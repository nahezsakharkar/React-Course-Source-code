import { useState } from "react";
import Joi from "joi-browser";
import { handleSubmit, renderInput, renderButton } from "./helpers/form";
import { register } from "../services/userService";
import auth from "../services/authService";

function RegisterForm() {
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const doSubmit = async () => {
    try {
      const response = await register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = ("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errors.username = error.response.data;
        setErrors({ username: error.response.data });
      }
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
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
        {renderInput(
          "Name",
          "name",
          "text",
          schema,
          data,
          setData,
          errors,
          setErrors
        )}
        {renderButton("Register", data, schema)}
      </form>
    </div>
  );
}

export default RegisterForm;
