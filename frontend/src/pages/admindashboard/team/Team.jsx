import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import "./team.css";
import { formatDate } from '../../../utils/utils';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { ToastContainer, toast } from 'react-toastify';

function Team() {
    const [userData, setUserData] = useState([]);
    const { auth } = useAuthContext();

    useEffect(() => {
        axios.get('http://localhost:5000/user/')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLocalChangeRole = (userId, newRole) => {
        setUserData(prevUserData =>
            prevUserData.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    const handleChangeRole = (userId, newRole) => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/role`, { userId, newRole }, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
            .then(response => {
                console.log(`Role updated for user ${userId} to ${newRole}`);
                toast.success('Role changed successfully');
            })
            .catch(error => {
                console.error('Error updating user role:', error);
                toast.error(error?.response?.data?.error || 'Error changing role');
            });
    };

    const handleSelectChange = (userId, newRole) => {
        handleLocalChangeRole(userId, newRole);
        handleChangeRole(userId, newRole);
    };

    const handleToggleBan = (userId) => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/ban`, { userId }, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
            .then(response => {
                const updatedUser = response.data.user;
                setUserData(prevUserData =>
                    prevUserData.map(user =>
                        user._id === updatedUser._id ? updatedUser : user
                    )
                );
                toast.success(`User ${updatedUser.banned ? 'banned' : 'unbanned'} successfully`);
            })
            .catch(error => {
                console.error('Error toggling ban status:', error);
                toast.error(error?.response?.data?.error || 'Error toggling ban status');
            });
    };

    const columns = [
        {
            field: 'img', headerName: 'Image', width: 70, renderCell: (params) => (
                <div className="actimg">
                    <img src={params.value} alt="User" />
                </div>
            )
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        {
            field: 'role', headerName: 'Role', width: 150, renderCell: (params) => (
                <select
                    className={`select ${params.value}`}
                    value={params.value}
                    onChange={(e) => handleSelectChange(params.row.id, e.target.value)}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Support">Support</option>
                </select>
            )
        },
        {
            field: 'status', headerName: 'Status', width: 200, renderCell: (params) => (
                <>
                    {params.value === "hiring" ? (
                        <div className="status hiring">
                            <div>is hiring</div>
                            <span className="hiring__circle"></span>
                        </div>
                    ) : (
                        <div className="status">
                            <div>{params.value}</div>
                            <span className="status__available-circle"></span>
                        </div>
                    )}
                </>
            )
        },
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { field: 'updatedAt', headerName: 'Updated At', width: 200 },
        {
            field: 'toggleBan',
            headerName: 'Ban/Unban',
            width: 150,
            renderCell: (params) => (
                <button
                    className='primary-btn w-100'
                    onClick={() => handleToggleBan(params.row.id)}
                >
                    {params.row.banned ? 'Unban User' : 'Ban User'}
                </button>
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
        banned: user.banned,
    }));

    return (
        <div className='df-c' style={{ padding: "1rem",height: 600, width: "100%", background: "white" }}>
            <ToastContainer />
            FlexBizz Members
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}

export default Team;
