import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useGridData } from "./grid-data";

const GridContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: white;
`;

const columnDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];
export const MuiGrid = function () {
  const rowData = useGridData({
    hasId: true,
    url: "https://www.ag-grid.com/example-assets/row-data.json",
  });

  return (
    <GridContainer>
      <DataGrid rows={rowData} columns={columnDefs} />
    </GridContainer>
  );
};
/*
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>EmpID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Org</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow
              key={row.EmpID}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell>{row.EmpID}</TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.Age}</TableCell>
              <TableCell>{row.Org}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
*/
