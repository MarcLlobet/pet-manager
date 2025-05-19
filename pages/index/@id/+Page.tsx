import React from "react";
import { HealthyPet } from "../../../types";
import { useData } from "vike-react/useData";
import { PetDetails } from "./PetDetails";
export default function Page() {
  const pet: HealthyPet = useData();

  if (!pet) return null;

  return (
    <div key={pet.id}>
      <PetDetails pet={pet} />
    </div>
  );
}
