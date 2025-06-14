import React, { useEffect, useState, Suspense } from "react";
import Modal from "@mui/material/Modal";

import { DetailView } from "../components/DetailView";
import { getPetById } from "../controllers/getPetById";
import { PetDetailInfo } from "../types";
import Dialog from "../components/Dialog";

export const PetOfTheDayModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [pet, setPetOfTheDay] = useState<PetDetailInfo>();

  useEffect(() => {
    const fetchPetOfTheDay = async () => {
      const dayOfTheMonth = new Date().getDate();
      const petData = await getPetById(dayOfTheMonth);
      setPetOfTheDay(petData);
    };

    if (isOpen) {
      fetchPetOfTheDay();
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Suspense fallback={<div>Loading...</div>}>
        <Dialog onClose={onClose} modalContent={pet ? <DetailView item={pet} /> : null} />
      </Suspense>
    </Modal>
  );
};

export default PetOfTheDayModal;
