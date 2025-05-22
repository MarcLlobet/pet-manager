import React, { useEffect, useState } from "react";
import { Column, SkeletonTable, Table } from "../components/Table";
import { getPets } from "../controllers/getPets";
import { useAppState } from "../context/AppContext";
import { PetListInfo } from "../types";

export const TableContainer = () => {
  const [pets, setPets] = useState<PetListInfo[]>([]);
  const [totalPets, setTotalPets] = useState<number>(0);
  const { state, setState } = useAppState();

  const handleSort = (property: typeof state._sort) => {
    setState((prevState) => ({
      ...prevState,
      _sort: property,
      _order: prevState._order === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState((prevState) => ({
      ...prevState,
      _page: newPage + 1,
    }));
  };

  const handleRowsPerPageChange = (newLimit: typeof state._limit) => {
    setState((prevState) => ({
      ...prevState,
      _limit: newLimit,
    }));
  };

  useEffect(() => {
    (async function fetchPets() {
      const { pets: fetchedPetsData, totalPets } = await getPets(state);
      await Promise.resolve(() => setTimeout(() => {}, 1000));
      // only for demo purposes
      setPets(fetchedPetsData);
      setTotalPets(totalPets);
    })();
  }, [state]);

  const columns = ["id", "name", "kind", "weight", "height", "length"] as Column[];

  if (!pets?.length) {
    return <SkeletonTable nRows={state?._limit ?? 5} nCols={columns.length} />;
  }

  return (
    <Table
      items={pets}
      columns={columns}
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
};
