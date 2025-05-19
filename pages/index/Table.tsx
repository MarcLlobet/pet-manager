import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import visuallyHidden from "@mui/utils/visuallyHidden";

import type { HealthyPet, LimitType, OrderType, SortType } from "../../types";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Link } from "../../renderer/Link";

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

export type PetTableProps = {
  pets: HealthyPet[];
  columns: (keyof HealthyPet)[];
  totalPets: number;
  rowsPerPage: LimitType;
  page: number;
  orderBy: keyof HealthyPet;
  orderType: OrderType;
  onRequestSort: (property: SortType) => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: LimitType) => void;
};

export const PetTable = ({
  pets,
  columns,
  totalPets,
  rowsPerPage,
  page,
  orderBy,
  orderType,
  onRequestSort,
  onPageChange,
  onRowsPerPageChange,
}: PetTableProps) => {
  const createSortHandler = (property: keyof HealthyPet) => () => {
    onRequestSort(property as SortType);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rowsPerPageNumber = parseInt(event.target.value, 10);
    onRowsPerPageChange(rowsPerPageNumber as LimitType);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columns.map((column) => (
              <TableCell key={column} sortDirection={orderBy === column ? orderType : false}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? orderType : "asc"}
                  onClick={createSortHandler(column)}
                >
                  {column}
                  {orderBy === column ? (
                    <Box component="span" sx={visuallyHidden}>
                      {orderType === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell>
                <img src={pet.photo_url} alt={`${pet.name} portrait`} width="50" />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={`${pet.id}-${column}`}>
                  {column === "name" ? <Link href={`${pet.id}`}>{pet[column]}</Link> : pet[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10] as LimitType[]}
              colSpan={columns.length + 1}
              count={totalPets}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
