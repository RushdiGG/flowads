import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  let logOut = (e) => {
    localStorage.removeItem("usertoken");
    props.history.push("/");
  };

  let loginRegLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/report" className="nav-link">
          Report
        </Link>
      </li>
    </ul>
  );
  let userLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link to="" onClick={""} className="nav-link">
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {localStorage.usertoken ? userLinks : loginRegLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
