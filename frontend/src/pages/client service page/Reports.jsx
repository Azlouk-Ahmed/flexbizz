import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useFetchData } from "../../hooks/useFetchData";
import UserObj from "./UserObj"; // Adjust the import path as necessary
import Modal from "../../components/popup/Modal"; // Import your modal component
import './reports.css';
import { BsEye } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import { BiCheck } from "react-icons/bi";
import { useActContext } from "../../hooks/useActContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

function formatDate(dateString) {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function Reports() {
  const {reports, dispatch} = useActContext();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useFetchData("http://localhost:5000/report/");
  const {auth} = useAuthContext();

  useEffect(() => {
    if (data && Array.isArray(data)) {
        dispatch({ type: "SET_REPORTS", payload: data });
    }
  }, [data]);

  const handleView = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleModify =async (id) => {
    console.log("clicked");
    if(auth){try {
      const response = await axios.put(`http://localhost:5000/report/${id}`, { status: "delivered" }, {
        headers: {
          Authorization: `Bearer ${auth.token}` 
        }
      });
      console.log(response.data);
      dispatch({ type: "UPDATE_REPORTS", payload: response.data.report });
    } catch (error) {
      console.error('Error modifying report:', error);
    }}
  };

  const handleDelete = async (id) => {
    if(auth){try {
      const response = await axios.put(`http://localhost:5000/report/${id}`, { status: "cancelled" }, {
        headers: {
          Authorization: `Bearer ${auth.token}` 
        }
      });
      console.log(response.data);
      dispatch({ type: "UPDATE_REPORTS", payload: response.data.report });
    } catch (error) {
      console.error('Error modifying report:', error);
    }}
  };

  const columns = [
    { 
      field: 'id',
      headerName: 'id', 
      width: 200, 
    },
    { 
      field: 'reporter',
      headerName: 'Reporter', 
      width: 200, 
      renderCell: (params) => <UserObj id={params.value} /> 
    },
    { 
      field: 'reported', 
      headerName: 'Reported', 
      width: 200, 
      renderCell: (params) => <UserObj id={params.value} /> 
    },
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
          <BsEye className="primary" onClick={() => handleView(params.row)}/>
          <BiCheck className="green" onClick={() => handleModify(params.row.id)}/>
          <CiSquareRemove className="red" onClick={() => handleDelete(params.row.id)}/>
        </div>
      ),
    },
  ];

  const rows = reports.map((report) => ({
    id: report._id,
    reporter: report.reporter,
    reported: report.reported,
    about: report.about,
    description: report.description,
    status: report.status,
    createdAt: formatDate(report.createdAt),
    updatedAt: formatDate(report.updatedAt),
  }));

  return (
    <div className="tabledata" style={{ height: 600, width: '100%', background: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4} 
        rowsPerPageOptions={[4]} 
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          report={selectedReport.id}
        />
      )}
    </div>
  );
}

export default Reports;
