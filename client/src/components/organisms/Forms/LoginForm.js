import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../../utils/UserFunctions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #777",
    borderRadius: "7px",
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    var user = {
      email: email,
      password: password,
    };
    login(user).then((res) => {
      if (res) {
        props.history.push("/profile");
      }
    });
  };

  return (
    <form className={classes.formWrapper} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1">
        Inloggning
      </Typography>
      <TextField label="E-post" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" type="submit">
        Logga in
      </Button>
    </form>
  );
}
