import React from "react";
import { TablePagination } from "@mui/material";
import { gridPageCountSelector,gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";

export const CustomPagination = (): JSX.Element => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <TablePagination
      color='primary'
      count={pageCount}
      onPageChange={(_, value): void => apiRef.current.setPage(value - 1)}
      page={page + 1}
      rowsPerPage={10}
      sx={{
        "& .MuiPaginationItem-root": {
          fontSize: "1rem"
        }
      }}
    />
  );
};
