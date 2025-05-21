import React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Detail = {
  title: string;
  value: string;
};

type DetailViewProps = {
  item: {
    image: {
      src: string;
      alt: string;
    };
    details: Detail[];
  };
};

export const DetailView = ({ item }: DetailViewProps) => {
  const { image, details } = item;
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={6}>
        <figure>
          <img src={image.src} alt={image.alt} style={{ maxWidth: "100%", borderRadius: "10px" }} />
        </figure>
      </Grid>
      <Grid size={6}>
        <List>
          {details.map(({ title, value }) => (
            <ListItem key={title}>
              <ListItemText primary={title} secondary={value} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
