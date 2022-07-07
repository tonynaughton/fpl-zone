import React from "react";
import { Pagination } from "@mui/material";
import { gridPageCountSelector,gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";

export const CustomPagination = (): JSX.Element => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color='primary'
      count={pageCount}
      onChange={(_, value): void => apiRef.current.setPage(value - 1)}
      page={page + 1}
      sx={{
        "& .MuiPaginationItem-root": {
          fontSize: "1rem"
        }
      }}
    />
  );
};
