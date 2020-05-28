import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { userRegister } from "../../actions/";

import Form from "./Form";

export default function RegisterForm(props) {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    triggerValidation,
    errors,
  } = useForm();
  const onSubmit = (data) => {
    axiosWithAuth()
      .post("/auth/register", data)
      .then((res) => {
        dispatch(userRegister(res.data));
        props.history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form title="Register" handleSubmit={handleSubmit(onSubmit)}>
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
      <InputLabel id="role">Role</InputLabel>
      <Controller
        as={Select}
        control={control}
        name="role_id"
        labelId="role"
        defaultValue={1}
        className="form-item"
      >
        <MenuItem value={1}>Student</MenuItem>
        <MenuItem value={2}>Helper</MenuItem>
        <MenuItem value={3}>Student &amp; Helper</MenuItem>
      </Controller>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="form-item button"
      >
        Register
      </Button>
    </Form>
  );
}
