import React, { PureComponent } from 'react'
import "./connection.css"
import { useAuthContext } from '../../hooks/useAuthContext'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import MyResponsiveBar from '../admindashboard/resopnsiveBar/MyResponsiveBar';


function Connections() {
    const {auth} = useAuthContext();
  return (
    <>
        {auth &&
            <div>Connections

              <MyResponsiveBar />
            </div>
            
        }
    </>
  )
}

export default Connections