import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";

export default function TicketDetails({ ticket }) {
  const {
    register,
    control,
    handleSubmit,
    triggerValidation,
    errors,
  } = useForm();
  const comments = useSelector((state) => state.comments[ticket.ticket_id]);
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="title"
            name="title"
            variant="outlined"
            className="form-item"
            inputRef={register}
            defaultValue={ticket.title}
          />
          <TextField
            id="content"
            name="content"
            variant="outlined"
            className="form-item"
            multiline
            rows={4}
            inputRef={register}
            defaultValue={ticket.title}
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
            <MenuItem value={2}>Leave of Absence</MenuItem>
            <MenuItem value={3}>Student Support</MenuItem>
          </Controller>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      ) : (
        <>
          <h1>{ticket.title}</h1>
          <p>{ticket.author}</p>
          <p>{ticket.date}</p>
          <p>{ticket.content}</p>
          <p>{ticket.category}</p>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          {comments &&
            comments.map((comment) => {
              return (
                <Typography>{`${comment.author}: ${comment.message}`}</Typography>
              );
            })}
          <form onSubmit={() => console.log("commented.")}>
            <TextField
              name="message"
              label="Message"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(evt) => console.log(evt.target.value)}
            />
          </form>
        </>
      )}
    </div>
  );
}
