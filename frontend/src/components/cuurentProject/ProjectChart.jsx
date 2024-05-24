import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Color for the completed part of the pie chart
const COMPLETED_COLOR = '#0088FE';
// Color for the remaining part of the pie chart
const REMAINING_COLOR = '#EAEAEA';

const ProjectChart = ({ projectDone }) => {
  const projectRemaining = 100 - projectDone;

  const renderTooltipContent = (value) => {
    return `${value}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart className="dec">
        <Tooltip formatter={renderTooltipContent} />
        <Pie
          data={[
            { name: 'Completed', value: projectDone },
            { name: 'Remaining', value: projectRemaining },
          ]}
          cx={100}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          <Cell key="completed" fill={COMPLETED_COLOR} />
          <Cell key="remaining" fill={REMAINING_COLOR} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProjectChart;
