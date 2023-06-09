import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import { Edit2, X } from "react-feather";

const GridContainer = styled.div`
  width: 100%;
  height: 248px;
  min-width: 500px;

  & .ag-header {
    color: #fff;
    background-color: #1d1724;
    border-bottom: solid 1px #cca1da;
  }
  & .ag-cell {
    color: #9d88b6;
    background-color: #1d1724;
  }
  & .ag-row {
    color: #9d88b6;
    border-bottom: solid 1px #493650;
  }
  & .ag-header-cell {
    color: #fddbff;
  }
  & .ag-root-wrapper {
    border: 1px solid #493650;
  }
  & .ag-center-cols-viewport {
    background-color: #1d1724;
  }
`;
const defaultColDef = {
  sortable: true,
};
const statusMap = {
  0: "Backlog",
  1: "In Progress",
  2: "Complete",
  3: "Closed",
  4: "Closed",
};

const Grid = styled(AgGridReact)``;
export const AgGrid = function ({ tableData, isError, onUpdate, setIsEdit }) {
  const cellRendererFn = function (params) {
    if (params.value === "content") {
      return <span>{params.value}</span>;
    }
    return params.value;
  };
  const cellStatusRendererFn = function (params) {
    let color = "#4caf50";
    switch (params.value) {
      case 0: {
        color = "#e91e63";
        break;
      }
      case 1: {
        color = "#00bcd4";
        break;
      }
      case 2: {
        color = "#4caf50";
        break;
      }
      case 3: {
        color = "#673ab7";
        break;
      }
      default: {
        color = "#e91e63";
      }
    }
    return (
      <span style={{ color, fontWeight: "bold" }}>
        {statusMap[params.value]}
      </span>
    );
  };
  const cellUserRendererFn = function (params) {
    return (
      // eslint-disable-next-line
      <a style={{ color: "#d390ee" }} href="#">
        {params.value}
      </a>
    );
  };
  const onChangeStatus = function (params) {
    let row = params.node.data;
    row.status = params.node.data.actions;
    row.actions = Number(params.node.data.actions) + 1;

    onUpdate(row);
  };
  const onEdit = function (params) {
    setIsEdit({ isEdit: true, rowData: params.node.data });
  };
  const deleteRow = function (params) {
    let row = params.node.data;
    onUpdate({
      ...row,
      taskDesc: "",
      owner: "",
      creator: "",
      status: "4",
      loggedHours: "",
    });
  };
  const cellActionRendererFn = function (params) {
    return (
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          sx={{ marginBottom: "5px" }}
          onClick={() => onChangeStatus(params)}
          disabled={params.value === 4}
        >
          {statusMap[params.value]}
        </Button>
        <span>
          <IconButton
            color="secondary"
            sx={{ marginLeft: "4px" }}
            size="small"
            onClick={() => onEdit(params)}
          >
            <Edit2 />
          </IconButton>
          <IconButton
            color="secondary"
            sx={{ marginLeft: "4px" }}
            size="small"
            onClick={() => deleteRow(params)}
          >
            <X />
          </IconButton>
        </span>
      </span>
    );
  };
  const columnDefs = [
    {
      field: "taskId",
      cellRenderer: cellRendererFn,
    },
    {
      field: "taskDesc",
      width: "280px",
      cellRenderer: cellRendererFn,
    },
    {
      field: "owner",
      cellRenderer: cellUserRendererFn,
    },
    {
      field: "creator",
      cellRenderer: cellUserRendererFn,
    },
    {
      field: "status",
      cellRenderer: cellStatusRendererFn,
    },
    {
      field: "loggedHours",
      cellRenderer: cellRendererFn,
    },
    {
      field: "actions",
      width: "300px",
      cellRenderer: cellActionRendererFn,
    },
  ];
  return (
    <GridContainer className="ag-theme-alpine">
      <Grid
        rowData={tableData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </GridContainer>
  );
};
