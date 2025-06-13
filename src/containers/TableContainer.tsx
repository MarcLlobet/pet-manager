import React, { useEffect, useState } from "react";
import { Column, SkeletonTable, Table } from "../components/Table";
import { getPets } from "../controllers/getPets";
import { useAppState } from "../context/AppContext";
import { PetListInfo } from "../types";

export const TableContainer = () => {
  const [petsData, setPetsData] = useState<{
    pets: PetListInfo[];
    totalPets: number;
    loading: boolean;
  }>({
    pets: [],
    totalPets: 0,
    loading: true,
  });
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
      const { pets: fetchedPetsData, totalPets: fetchedTotalPets } = await getPets(state);
      await Promise.resolve(() => setTimeout(() => {}, 1000));
      // only for demo purposes
      setPetsData({
        pets: fetchedPetsData,
        totalPets: fetchedTotalPets,
        loading: false,
      });
    })();
  }, [state]);

  const columns = ["id", "name", "kind", "weight", "height", "length"] as Column[];

  if (petsData?.loading) {
    return <SkeletonTable nRows={state?._limit ?? 5} nCols={columns.length} />;
  }
  console.log("total", petsData?.totalPets);
  return (
    <Table
      items={petsData?.pets}
      columns={columns}
      totalPets={petsData?.totalPets}
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
