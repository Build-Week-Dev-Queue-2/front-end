import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TextField, Button, FormGroup } from "@material-ui/core";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { userLogin } from "../../actions/userActions";

import Form from "./Form";

export default function LoginForm(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, triggerValidation } = useForm();
  const onSubmit = (data) => {
    axiosWithAuth()
      .post("/auth/login", data)
      .then((res) => {
        dispatch(userLogin(res.data));
        props.history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form title="Login" handleSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="name"
        name="username"
        label="Name"
        variant="outlined"
        inputRef={register({
          required: "Name is required",
        })}
        error={errors.username}
        helperText={errors.username && errors.username.message}
        onBlur={() => triggerValidation("username")}
        className="form-item"
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        variant="outlined"
        inputRef={register({
          required: "Password is required",
          minLength: 8,
        })}
        error={errors.password}
        helperText={
          (errors.password && errors.password.message) ||
          (errors.password && "Password must be atleast 8 characters")
        }
        onBlur={() => triggerValidation("password")}
        className="form-item"
      />
      <FormGroup row className="form-item">
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
        <Button color="primary" onClick={() => props.history.push("/register")}>
          Register
        </Button>
      </FormGroup>
    </Form>
  );
}
