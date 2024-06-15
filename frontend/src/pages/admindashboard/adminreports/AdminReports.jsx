import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useFetchData } from '../../../hooks/useFetchData';
import { useActContext } from '../../../hooks/useActContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import UserObj from '../../client service page/UserObj';
import { formatDate } from '../../../utils/utils';
import { BiCheck } from 'react-icons/bi';

function AdminReports() {
  const { reports, dispatch } = useActContext();
  const { data } = useFetchData("http://localhost:5000/report/admin/delivered");
  const { auth } = useAuthContext();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch({ type: "SET_REPORTS", payload: data });
    }
  }, [data]);

  const handleModify = async (id) => {
    console.log("clicked");
    if (auth) {
      try {
        const response = await axios.put(`http://localhost:5000/report/admin/${id}`, { status: "handled" }, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        console.log(response.data);
        dispatch({ type: "UPDATE_REPORTS", payload: response.data.report });
      } catch (error) {
        console.error('Error modifying report:', error);
      }
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'reporter', headerName: 'Reporter', width: 200, renderCell: (params) => <UserObj id={params.value} /> },
    { field: 'reported', headerName: 'Reported', width: 200, renderCell: (params) => <UserObj id={params.value} /> },
    { field: 'about', headerName: 'About', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => {
        const statusClass = `status ${params.value.toLowerCase()}`;
        return <span className={statusClass}>{params.value}</span>;
      }
    },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="df">
          <BiCheck className="green" onClick={() => handleModify(params.row._id)} />
        </div>
      ),
    },
  ];

  // Ensure each row has a unique id based on _id
  const rows = reports.map((report) => ({
    id: report._id,
    _id: report._id,
    reporter: report.reporter,
    reported: report.reported,
    about: report.about,
    description: report.description,
    status: report.status,
    createdAt: formatDate(report.createdAt),
    updatedAt: formatDate(report.updatedAt),
  }));

  return (
    <div className='df-c' style={{ padding: "1rem", height: 600, width: "100%", background: "white" }}>
      <div>Admin Reports</div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default AdminReports;
