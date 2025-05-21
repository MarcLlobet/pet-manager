import { Link } from "react-router-dom";

import React from "react";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableMui from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import visuallyHidden from "@mui/utils/visuallyHidden";

import { LimitType, OrderType, PetListInfo, SortType } from "../types";
import { Typography } from "@mui/material";

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

type Item = PetListInfo;
type ItemKeys = keyof Item;
type Column = Exclude<ItemKeys, "image">;

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
  items: Item[];
  columns: Column[];
  totalPets: number;
  rowsPerPage: LimitType;
  page: number;
  orderBy: ItemKeys;
  orderType: OrderType;
  onRequestSort: (property: SortType) => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: LimitType) => void;
};

export const Table = ({
  items,
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
  const createSortHandler = (property: Column) => () => {
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
      <TableMui size="small" sx={{ minHeight: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columns.map((column) => (
              <TableCell key={column as string} sortDirection={orderBy === column ? orderType : false}>
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
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={item.image.src} alt={item.image.alt} width="50" />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={`${item.id}-${column}`}>
                  {column === "name" ? (
                    <Link to={`${item.id}`} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "primary.main",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {item[column]}
                      </Typography>
                    </Link>
                  ) : (
                    item[column]
                  )}
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
      </TableMui>
    </TableContainer>
  );
};
