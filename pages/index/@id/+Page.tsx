import React from "react";
import { HealthyPet } from "../../../types";
import { useData } from "vike-react/useData";
import { PetDetails } from "./PetDetails";
export default function Page() {
  const pet: HealthyPet = useData();

  return <div data-testid="pet-details-page">{pet ? <PetDetails pet={pet} /> : null}</div>;
}
