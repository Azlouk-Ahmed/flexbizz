import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import "./team.css";
import { formatDate } from '../../../utils/utils';

function Team() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/user/')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleChangeRole = (userId, newRole) => {
        // Update the role for the user with userId in the backend
        // You can use axios.put or axios.post to update the user's role
        // Example: axios.put(`http://localhost:5000/user/${userId}`, { role: newRole });
        console.log(`Changing role for user ${userId} to ${newRole}`);
    };
    const handlesubmitrole = (userId, newRole) => {
        // Update the role for the user with userId in the backend
        // You can use axios.put or axios.post to update the user's role
        // Example: axios.put(`http://localhost:5000/user/${userId}`, { role: newRole });
        console.log(`Changing role for user ${userId} to ${newRole}`);
    };

    const columns = [
        { field: 'img', headerName: 'Image', width: 70, renderCell: (params) => (<><div className="actimg"><img src={params.value} alt="User" /></div></>) },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'role', headerName: 'Role', width: 200, renderCell: (params) => (
            <select value={params.value} onChange={(e) => handleChangeRole(params.row.id, e.target.value)}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Support">Support</option>
            </select>
        )},
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { field: 'updatedAt', headerName: 'Updated At', width: 200 },
        {
            field: 'submit',
            headerName: 'Submit',
            width: 150,
            renderCell: (params) => (
                <button className='primary-btn' onClick={() => handleChangeRole(params.row.id, params.row.role)}>Change Role</button>
            )
        }
    ];

    const rows = userData.map((user) => ({
        id: user._id,
        img: user.img,
        name: `${user.name} ${user.familyName}`,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt),
    }));

    return (
        <div className='df-c' style={{ height: 400, width: 900, background: "white" }}>
            FlexBizz Team
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default Team;
