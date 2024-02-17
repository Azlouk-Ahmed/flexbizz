import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './mockteam';
import "./team.css";

function Team() {
    return (
        <div style={{ height: 400, width: '50%' }}>
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
