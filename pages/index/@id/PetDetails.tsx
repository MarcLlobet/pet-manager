import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { HealthyPet } from "../../../types";

export const PetDetails = ({ pet }: { pet: HealthyPet }) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={6}>
        <figure>
          <img
            src={pet.photo_url}
            alt={`${pet.name} the ${pet.kind}`}
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </figure>
      </Grid>
      <Grid size={6}>
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={pet.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Kind" secondary={pet.kind} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Weight" secondary={`${pet.weight} grams`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Height" secondary={`${pet.height} cm`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Length" secondary={`${pet.length} cm`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Health" secondary={pet.health} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Description" secondary={pet.description} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
