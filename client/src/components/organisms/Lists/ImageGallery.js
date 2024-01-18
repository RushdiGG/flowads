import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    alignItems: "center",
    width: "19%",
  },
  selected: {
    border: "2px solid blue",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 1:1
  },
}));

export default function TemplateList({
  images,
  selectedImage,
  setSelectedImage,
}) {
  const classes = useStyles();

  const handleClick = (i) => {
    setSelectedImage(i);
  };

  return (
    <Card className={classes.container}>
      {images.map((image, i) => (
        <Card
          className={`${classes.card} ${
            selectedImage == i ? classes.selected : ""
          }`}
          onClick={() => handleClick(i)}
        >
          <CardMedia className={classes.media} image={image.url} />
        </Card>
      ))}
    </Card>
  );
}
