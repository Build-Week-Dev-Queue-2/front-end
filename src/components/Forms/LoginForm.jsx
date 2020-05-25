import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, FormGroup } from "@material-ui/core";

import Form from "./Form";

export default function LoginForm(props) {
  const { register, handleSubmit, errors, triggerValidation } = useForm();
  const onSubmit = (data) => console.log(data);

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
