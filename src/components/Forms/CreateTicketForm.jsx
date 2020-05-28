import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { createTicket } from "../../actions";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="title"
        name="title"
        label="Title"
        variant="outlined"
        className="form-item"
        inputRef={register}
        required
      />
      <TextField
        id="content"
        name="content"
        label="Content"
        variant="outlined"
        className="form-item"
        multiline
        rows={4}
        inputRef={register}
        required
      />
      <InputLabel id="category">Category</InputLabel>
      <Controller
        as={Select}
        control={control}
        name="category_id"
        labelId="category"
        defaultValue={1}
        className="form-item"
      >
        <MenuItem value={1}>Technical Support</MenuItem>
        <MenuItem value={2}>Leave of Absense</MenuItem>
        <MenuItem value={3}>Student Support</MenuItem>
      </Controller>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
