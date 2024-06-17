import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../team/team.css'; 
import { useFetchData } from '../../../hooks/useFetchData';
import UserObj from '../../client service page/UserObj';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { createNotification } from '../../../API/API';

function CurrentProjectsData() {
    const {auth} = useAuthContext();
    const config = {
        headers: {
            Authorization: `Bearer ${auth?.token}`
        }
    };
    const [data, setData] = useState([]);
    const { data: currentprojects } = useFetchData(process.env.REACT_APP_API_URL+"/projects/");

    useEffect(() => {
        if (currentprojects && Array.isArray(currentprojects)) {
            setData(currentprojects);
        }
    }, [currentprojects]);

    const processData = (data) => {
        return data?.map((item) => {
            const versions = item?.workVersions || [];
            const version1 = versions[0] || {};
            const version2 = versions[1] || {};
            const version3 = versions[2] || {};

            return {
                id: item?._id,
                client: item?.client,
                freelancer: item?.freelancer,
                announcement: item?.announcement,
                version1Content: version1?.content || "N/A",
                version1Status: version1?.confirmed ? "Confirmed" : "Not Confirmed",
                version2Content: version2?.content || "N/A",
                version2Status: version2?.confirmed ? "Confirmed" : "Not Confirmed",
                version3Content: version3?.content || "N/A",
                version3Status: version3?.confirmed ? "Confirmed" : "Not Confirmed",
                createdAt: item?.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A",
                updatedAt: item?.updatedAt ? new Date(item.updatedAt).toLocaleString() : "N/A",
            };
        }) || [];
    };

    const handleConfirmPayment = async (row) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/transaction`,
                {
                    clientId: row.client,
                    freelancerId: row.freelancer,
                    projectId: row.announcement
                },
                config
            );

            createNotification(
                row.freelancer,
                row.id,
                "acceptence",
                "flexbizz Team",
                auth.token,
                "transfered "+response.data.projectBudget+" to your bank account"
            );
    
            if (response.data && response.data.projectBudget > 0) {
                try {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${row.id}`,config);
    
                    const responseData = await axios.post(
                        process.env.REACT_APP_API_URL+"/api/payer",
                        { "amount": response.data.projectBudget * 1000 }
                    );
    
                    window.open(responseData.data.result.link, "_blank");
    
                } catch (error) {
                    console.error("Error processing payment:", error);
                    toast.error("Something went wrong during the payment process");
                }
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
            toast.error(error?.response?.data?.error || "Payment failed!");
        }
    };
    
    const handleRefund =async (row) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/announcement/${row.announcement}`,
                config
            );
            createNotification(
                row.client,
                row.id,
                "acceptence",
                "flexbizz Team",
                auth.token,
                `accpted your refund demand has been accepted`
            );
    
            if (response.data && response.data.budgetMax > 0) {
                try {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${row.id}`,config);
    
                    const responseData = await axios.post(
                        process.env.REACT_APP_API_URL+"/api/payer",
                        { "amount": response.data.budgetMax * 1000 }
                    );
    
                    window.open(responseData.data.result.link, "_blank");
    
                } catch (error) {
                    console.error("Error processing payment:", error);
                    toast.error("Something went wrong during the payment process");
                }
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
            toast.error(error?.response?.data?.error || "Payment failed!");
        }
    };

    const columns = [
        { field: 'client', headerName: 'Client', width: 150, renderCell: (params) => <UserObj id={params.value} /> },
        { field: 'freelancer', headerName: 'Freelancer', width: 150, renderCell: (params) => <UserObj id={params.value} /> },
        { field: 'announcement', headerName: 'Announcement', width: 150 },
        {
            field: 'version1Content',
            headerName: 'Version 1 Content',
            width: 200,
            renderCell: (params) => (
                params.value !== "N/A" ? 
                <a href={`${process.env.REACT_APP_API_URL}/uploads/${params.value}`} target="_blank" rel="noopener noreferrer" className="version-content">
                    {params.value}
                </a> : "N/A"
            ),
        },
        {
            field: 'version1Status',
            headerName: 'Version 1 Status',
            width: 150,
            renderCell: (params) => (
                <div className={`status ${params.value === "Confirmed" ? "delivered" : "pending"}`}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'version2Content',
            headerName: 'Version 2 Content',
            width: 200,
            renderCell: (params) => (
                params.value !== "N/A" ? 
                <a href={`${process.env.REACT_APP_API_URL}/uploads/${params.value}`} target="_blank" rel="noopener noreferrer" className="link">
                    {params.value}
                </a> : "N/A"
            ),
        },
        {
            field: 'version2Status',
            headerName: 'Version 2 Status',
            width: 150,
            renderCell: (params) => (
                <div className={`status ${params.value === "Confirmed" ? "delivered" : "pending"}`}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'version3Content',
            headerName: 'Version 3 Content',
            width: 200,
            renderCell: (params) => (
                params.value !== "N/A" ? 
                <a href={`${process.env.REACT_APP_API_URL}/uploads/${params.value}`} target="_blank" rel="noopener noreferrer" className="version-content">
                    {params.value}
                </a> : "N/A"
            ),
        },
        {
            field: 'version3Status',
            headerName: 'Version 3 Status',
            width: 150,
            renderCell: (params) => (
                <div className={`status ${params.value === "Confirmed" ? "delivered" : "pending"}`}>
                    {params.value}
                </div>
            ),
        },
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { field: 'updatedAt', headerName: 'Updated At', width: 200 },
        {
            field: 'confirmPayment',
            headerName: 'Confirm Payment',
            width: 200,
            renderCell: (params) => {
                const allVersionsConfirmed = params.row.version1Status === 'Confirmed' && 
                                            params.row.version2Status === 'Confirmed' && 
                                            params.row.version3Status === 'Confirmed';

                return (
                    <div className='df'>
                        {allVersionsConfirmed ? (
                            <button className="primary-btn fs center" onClick={() => handleConfirmPayment(params.row)}>Confirm Payment</button>
                        ) : (
                            <button className="primary-btn fs center" onClick={() => handleRefund(params.row)}>Refund</button>
                        )}
                    </div>
                );
            },
        },
    ];

    const rows = processData(data);

    return (
        <div className='df-c' style={{ padding: '1rem', height: 600, width: '100%', background: 'white' }}>
            <ToastContainer />
            <div>Projects in progress</div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}

export default CurrentProjectsData;
