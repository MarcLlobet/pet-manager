import React, { useCallback, useEffect, useState } from "react";
import type { HealthyPet, LimitType, SortType } from "../../types";
import { useAppState } from "../../renderer/usePageContext";
import { getPetsData } from "./getPetsData";

import { PetTable } from "./Table";

export default function Page() {
  const [pets, setPets] = useState<HealthyPet[]>([]);
  const [totalPets, setTotalPets] = useState<number>(0);
  const { state, setState } = useAppState();

  const handleSort = useCallback((property: SortType) => {
    setState((prevState) => ({
      ...prevState,
      _sort: property,
      _order: prevState._order === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setState((prevState) => ({
      ...prevState,
      _page: newPage + 1,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((newLimit: LimitType) => {
    setState((prevState) => ({
      ...prevState,
      _limit: newLimit,
    }));
  }, []);

  useEffect(() => {
    (async function fetchPets() {
      const { pets: fetchedPetsData, totalPets } = await getPetsData(state);
      setPets(fetchedPetsData);
      setTotalPets(totalPets);
    })();
  }, [state]);

  return (
    <PetTable
      pets={pets}
      columns={["id", "name", "kind", "weight", "height", "length"]}
      totalPets={totalPets}
      rowsPerPage={state._limit}
      page={state._page - 1}
      orderBy={state._sort}
      orderType={state._order}
      onRequestSort={handleSort}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
}
