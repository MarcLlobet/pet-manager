import React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Detail = {
  key: string;
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

export const DetailViewComponent = ({ item }: DetailViewProps) => {
  const { image, details } = item;
  return (
    <Grid container rowSpacing={1} columnSpacing={{ sm: 2, md: 3 }} sx={{ paddingY: "2rem" }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <figure
          style={{
            margin: "0",
            maxHeight: "100%",
            minWidth: "100%",
            paddingRight: "20px",
            boxSizing: "border-box",
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              width: "auto",
              height: "auto",
            }}
          />
        </figure>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <List>
          {details.map(({ key, title, value }) => (
            <ListItem key={key} disablePadding dense>
              <ListItemText
                primary={title}
                secondary={value}
                slotProps={{
                  primary: { color: "text.primary", fontWeight: "bold" },
                  secondary: { color: "text.secondary" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export const DetailView = React.memo(DetailViewComponent);
