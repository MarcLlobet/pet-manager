import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { DetailView } from "../components/DetailView";
import { getPetById } from "../controllers/getPetById";
import { PetDetailInfo } from "../types";

const PetPage = () => {
  const [pet, setPet] = useState<PetDetailInfo>();
  const pathParams = useParams();

  useEffect(() => {
    (async function fetchOnMount() {
      if (!pathParams.id) {
        return;
      }
      const pathId = Number(pathParams.id);
      const pet = await getPetById(pathId);
      setPet(pet);
    })();
  }, []);

  return <div data-testid="pet-details-page">{pet ? <DetailView item={pet} /> : null}</div>;
};

export default PetPage;
