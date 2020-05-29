import React from "react";
import { useForm } from "react-hook-form";
import { 
  DARK_BLUE,
  BLUE,
  LIGHT_BLUE,
  GREEN,
  RED,
  WHITE,
  GRAY,
  BLACK,
  HIGHLIGHT_BLUE,
  StyledTitle,
  StyledForm,
  StyledButton,
  StyledTextField,
  StyledFormGroup
} from '../../utils/styles'
import { useDispatch } from "react-redux";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { userLogin } from "../../actions/";

export default function LoginForm(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, triggerValidation } = useForm();
  const onSubmit = (data) => {
    axiosWithAuth()
      .post("/auth/login", data)
      .then((res) => {
        dispatch(userLogin(res.data));
        props.history.push("/home/unresolved");
      })
      .catch((err) => console.log(data, err.response.data.message));
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div className='flex'>
        <StyledTitle className='title'>DevDesk</StyledTitle>
        <StyledTitle className='par'>The help-ticket system.</StyledTitle>
        <StyledTextField
          id="name"
          name="username"
          label="Name"
          variant="outlined"
          ref={register({
            required: "Name is required",
          })}
          error={errors.username}
          helperText={errors.username && errors.username.message}
          onBlur={() => triggerValidation("username")}
          placeholder='Username'
        />
        <StyledTextField
          id="password"
          name="password"
          type='password'
          label="Password"
          variant="outlined"
          ref={register({
            required: "Password is required",
            minLength: 8,
          })}
          error={errors.password}
          helperText={
            (errors.password && errors.password.message) ||
            (errors.password && "Password must be atleast 8 characters")
          }
          onBlur={() => triggerValidation("password")}
          placeholder='Password'
        />
        <StyledFormGroup row>
          <StyledButton type="submit" variant="contained" color="green">
            Log In
          </StyledButton>
          <StyledButton color="primary" onClick={() => props.history.push("/register")}>
            Register
          </StyledButton>
        </StyledFormGroup>
      </div>
    </StyledForm>
  );
}
