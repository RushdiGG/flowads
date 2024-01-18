import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { dispatchGetTemplates } from "../../../redux/slices/templatesSlice";
import axios from "axios";
import { API_URL } from "../../../config";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    height: "400px",
    width: "400px",
    alignItems: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function TemplateList() {
  let dispatch = useDispatch();
  let templates = useSelector((state) => state.templates.templates);

  useEffect(() => {
    dispatch(dispatchGetTemplates());
  }, []);
  const classes = useStyles();

  const handleDelete = (id) => {
    console.log(id);
    axios({
      method: "delete",
      url: API_URL + "/api/templates",
      data: { id: id },
    }).then((res) => {
      dispatch(dispatchGetTemplates());
    });
  };
  return (Array.isArray(templates) ? templates : []).map((template) => (
    <Card className={classes.card}>
      <Typography variant="h4" component="h2">
        {template.title}
      </Typography>
      <CardMedia
        className={classes.media}
        image={template.image}
        title="Paella dish"
      />
      <Link to={`/Editor/${template._id}`}>
        <Button>Edit template</Button>
      </Link>
      <Button onClick={() => handleDelete(template._id)}>Delete</Button>
    </Card>
  ));
}
