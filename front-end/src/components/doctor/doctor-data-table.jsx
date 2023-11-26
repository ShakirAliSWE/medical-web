import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Countdown from "react-countdown";
import TimerCountDown from "../timer-count-down";
import { startCountDown } from "../../utils/date-time";
import CONSULTATION_TYPES from "../../mock/cosultation-types.json";

const columns = [
  {
    field: "_id",
    headerName: "REQUEST ID",
    flex: 1,
    headerClassName: "data-table-header",
  },
  {
    field: "name",
    headerName: "PATIENT NAME",
    flex: 1,
    headerClassName: "data-table-header",
  },
  {
    field: "age",
    headerName: "PATIENT AGE",
    flex: 1,
    headerClassName: "data-table-header",
  },
  {
    field: "type",
    headerName: "CONSULTATION TYPE",
    flex: 1,
    headerClassName: "data-table-header",
    sortable: false,
    renderCell: ({ row }) => {
      return CONSULTATION_TYPES[row.type];
    },
  },
  {
    field: "status",
    headerName: "REQUEST STATUS",
    headerClassName: "data-table-header",
    sortable: false,
    width: 150,
    renderCell: ({ row }) => {
      return (
        <RenderRequestStatus status={row.status} countDown={row.requestAt} />
      );
    },
  },
];

export default function DoctorDataTable({
  loading = false,
  rows = [],
  onClick = () => {},
}) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        loading={loading}
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        getRowId={(row) => row._id}
        onRowClick={onClick}
      />
    </div>
  );
}

const RenderRequestStatus = ({ status, countDown }) => {
  if (status === 0) {
    return (
      <Countdown date={startCountDown(countDown)} renderer={TimerCountDown} />
    );
  }
  const statusStyles = {
    0: { className: "bg-info", label: "Waiting" },
    1: { className: "bg-secondary", label: "Expired" },
    2: { className: "bg-success", label: "Accepted" },
    3: { className: "bg-danger", label: "Declined" },
    4: { className: "bg-success", label: "Completed" },
  };

  const stylProps = {
    width: 80,
    borderRadius: 0,
  };

  const { className, label } = statusStyles[status] || {};

  return className ? (
    <span className={`badge p-2 ${className}`} style={stylProps}>
      {label}
    </span>
  ) : null;
};
