import React from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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
  StyledFormGroup,
  StyledWrapper,
  FlexDiv,
  MarginLeft,
} from '../../utils/styles'
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { userRegister } from "../../actions/";

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
        props.history.push("/home/unresolved");
      })
      .catch((err) => console.log(data, err.response.data));
  };

  const styles = makeStyles({
    dropdown: {
      color: WHITE,
      '&:before': {
        borderColor: WHITE,

      },
      '&:after': {
        borderColor: WHITE,
      },
    },
    arrow: {
      fill: 'white',
    }
  });

  const classes = styles();

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledWrapper>
        <StyledTitle >Register</StyledTitle>
        <StyledTextField
          id="name"
          name="username"
          label="Name"
          variant="outlined"
          placeholder='Username'
          ref={register({
            required: "Name is required",
          })}
          error={errors.username}
          helperText={errors.username && errors.username.message}
          onBlur={() => triggerValidation("username")}
        />
        <StyledTextField
            id="password"
            type='password'
          name="password"
          label="Password"
          variant="outlined"
          placeholder='Password'
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
        />
          <Controller
            as={Select}
            control={control}
            name="role_id"
            labelId="role"
            defaultValue={1}
            className={classes.dropdown}
            inputProps={{
              classes: {
                icon: classes.arrow
              }
            }}
          >
            <MenuItem value={1}>Student</MenuItem>
            <MenuItem value={2}>Helper</MenuItem>
          </Controller>
          <MarginLeft
            type="submit"
            variant="contained"
            color="primary"
            className="form-item button"
          >
            Register
          </MarginLeft>
      </StyledWrapper>
    </StyledForm>
  );
}
