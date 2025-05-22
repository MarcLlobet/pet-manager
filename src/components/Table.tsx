import { Link } from "react-router-dom";

import React, { useCallback, Suspense } from "react";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

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
import Skeleton from "@mui/material/Skeleton";

import { LimitType, OrderType, PetListInfo, SortType } from "../types";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

export type Item = PetListInfo;
export type ItemKeys = keyof Item;
export type Column = Exclude<ItemKeys, "image">;

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, 0);
    },
    [onPageChange],
  );

  const handleBackButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    },
    [onPageChange, page],
  );

  const handleNextButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    },
    [onPageChange, page],
  );

  const handleLastPageButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    },
    [onPageChange, count, rowsPerPage],
  );

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

export const DataTableComponent = ({
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
  const theme = useTheme();
  const createSortHandler = useCallback(
    (property: Column) => () => {
      onRequestSort(property as SortType);
    },
    [onRequestSort],
  );

  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      onPageChange(newPage);
    },
    [onPageChange],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const rowsPerPageNumber = parseInt(event.target.value, 10);
      onRowsPerPageChange(rowsPerPageNumber as LimitType);
    },
    [onRowsPerPageChange],
  );

  return (
    <TableContainer
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <TableMui size="small">
        <TableHead
          sx={{
            position: "sticky",
          }}
        >
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
                          color: theme.palette.text.primary,
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
              sx={{
                justifySelf: "right",
                "& .MuiIconButton-root, & .MuiSelect-icon": {
                  color: theme.palette.text.primary,
                },
              }}
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

const SkeletonTableBody = ({ nRows, nCols }: { nRows: number; nCols: number }) => (
  <>
    {Array.from({ length: nRows }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="rectangular" width={50} height={50} />
        </TableCell>
        {Array.from({ length: nCols }).map((_, index) => (
          <TableCell key={`${index}`}>
            <Skeleton variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export const SkeletonTable = ({ nRows, nCols }: { nRows: number; nCols: number }) => (
  <TableMui>
    <TableBody>
      <SkeletonTableBody nRows={nRows} nCols={nCols} />
    </TableBody>
  </TableMui>
);

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
}: PetTableProps) => (
  <Suspense fallback={<SkeletonTable nRows={rowsPerPage} nCols={columns.length} />}>
    <DataTableComponent
      items={items}
      columns={columns}
      totalPets={totalPets}
      rowsPerPage={rowsPerPage}
      page={page}
      orderBy={orderBy}
      orderType={orderType}
      onRequestSort={onRequestSort}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  </Suspense>
);
