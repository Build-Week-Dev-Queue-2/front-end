import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { createTicket } from "../../actions";

import {
  FlexDiv,
  StyledForm,
  StyledTextField,
  StyledWrapper,
  StyledButton,
  WHITE,
} from "../../utils/styles";

export default function CreateTicketForm() {
  const dispatch = useDispatch();
  const { register, control, handleSubmit } = useForm();
  const user = useSelector((state) => state.user);

  const onSubmit = (data) => {
    const ticket = {
      ...data,
      author: user.user_id,
    };
    axiosWithAuth()
      .post("/api/tickets", ticket)
      .then((res) => {
        dispatch(createTicket(res.data));
      })
      .catch((err) => console.log(err));
  };

  const styles = makeStyles({
    dropdown: {
      color: WHITE,
      "&:before": {
        borderColor: WHITE,
      },
      "&:after": {
        borderColor: WHITE,
      },
    },
    arrow: {
      fill: "white",
    },
  });

  const classes = styles();

  return (
    <FlexDiv>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "100%", maxHeight: "50vh" }}
      >
        <StyledWrapper>
          <StyledTextField
            id="title"
            name="title"
            placeholder="Title"
            ref={register}
          />
          <StyledTextField
            id="content"
            name="content"
            placeholder="Content"
            ref={register}
            required
          />
        </StyledWrapper>
        <InputLabel id="category" style={{ color: WHITE }}>
          Category
        </InputLabel>
        <Controller
          as={Select}
          control={control}
          name="category_id"
          labelId="category"
          defaultValue={1}
          className={classes.dropdown}
          inputProps={{
            classes: {
              icon: classes.arrow,
            },
          }}
        >
          <MenuItem value={1}>Technical Support</MenuItem>
          <MenuItem value={2}>Leave of Absense</MenuItem>
          <MenuItem value={3}>Student Support</MenuItem>
        </Controller>
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "0 auto" }}
        >
          Submit
        </StyledButton>
      </StyledForm>
    </FlexDiv>
  );
}
