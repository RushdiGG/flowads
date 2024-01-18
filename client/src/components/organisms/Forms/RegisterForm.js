import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../../../utils/UserFunctions";
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

export default function RegisterForm({ history }) {
  const classes = useStyles();

  let [user, setUser] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    let userInfo = {
      user: user,
      email: email,
      password: password,
    };
    let success = register(userInfo).then((res) => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
    if (success) {
      history.push("/login");
    }
  };

  return (
    <form className={classes.formWrapper} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1">
        Användar Registrering
      </Typography>
      <TextField label="Användare" value={user} onChange={(e) => setUser(e.target.value)} />
      <TextField label="E-post" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" type="submit">
        Skapa användare
      </Button>
    </form>
  );
}
