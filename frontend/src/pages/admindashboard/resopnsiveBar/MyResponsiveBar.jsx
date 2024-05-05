import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import "./responsivebar.css";

function MyResponsiveBar() {
    const data01 = [
        { name: 'Annoucements', value: 400 },
        { name: 'Achievements', value: 300 },
        { name: 'Likes', value: 300 },
        { name: 'Comments', value: 200 },
        { name: 'Badges', value: 278 },
        { name: 'Connections', value: 189 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Assign colors from COLORS array to each data entry
    const pieData = data01.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <div className='chart-container pie-container'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MyResponsiveBar;
