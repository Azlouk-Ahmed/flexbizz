import React, { useEffect } from 'react'
import "./dashboard.css"

import { GiMoneyStack } from 'react-icons/gi'
import { MdNotificationImportant, MdOutlineLibraryAdd, MdRemoveCircle } from 'react-icons/md'
import { BsPiggyBank } from 'react-icons/bs'
import { useFetchData } from '../../hooks/useFetchData'
import UserAct from '../client service page/UserAct'
import { FaCrown } from "react-icons/fa6";
import Barchart from './barchart/Barchart'
import { bardata, donutdata } from '../../data/mockdata'
import ReportsChart from './reportschart/ReportsChart'
import { formatNumber } from '../../utils/utils'
import { CiSquareRemove } from "react-icons/ci";
import { IoCheckmarkDone } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import Team from "../admindashboard/team/Team"


function Dashboard() {

  const {data: finance} = useFetchData("http://localhost:5000/achievements/admin");
  const {data: topactive} = useFetchData("http://localhost:5000/activities/activities/top");
  return (
    <div className="bashboard">
      <div className='df-c dash'>
          <div className="df">
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont"><GiMoneyStack /></div>
                <span>total income</span>
              </div>
              <div className="df-c g0">
              <span >Completed Projects</span>
              <div className="dinar">{formatNumber(finance?.totalBudget)}DT</div>
              </div>
            </div>
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont gr"><BsPiggyBank /></div>
                <span className='gr1'>total NET</span>
              </div>
              <div className="df-c g0">
              <span>Pure Incomes</span>
              <div className="dinar">{formatNumber(finance?.netIncome)}DT</div>
              </div>
            </div>
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont yl"><MdNotificationImportant /></div>
                <span className='yl1'>To Handle</span>
              </div>
              <div className="df-c g0">
              <span>Held In System</span>
              <div className="dinar">{formatNumber(finance?.insystem)}DT</div>
              </div>
            </div>
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont or"><GiMoneyStack /></div>
                <span className='or1'>Incoming</span>
              </div>
              <div className="df-c g0">
              <span>Pridicted Incomes</span>
              <div className="dinar">{formatNumber(finance?.predictedIncome)}DT</div>
              </div>
            </div>
          </div>
          <Barchart data = {bardata} />
          <div className="reports-container df">
            <div className="df-c g0">

            <h1 className=''>reports</h1>
            <ReportsChart data = {donutdata} />
            </div>
            <div className="df-c">
              <div className="df">
                <div className="icon-cont" style={{background : "#f27070"}}>
                  <CiSquareRemove />
                </div>
                <div>Canceled</div>
              </div>
              <div className="df">
                <div className="icon-cont" style={{background : "rgb(139, 84, 255)"}}>
                  <IoCheckmarkDone />
                </div>
                <div>Handled</div>
              </div>
              <div className="df">
                <div className="icon-cont" style={{background : "#ddafff"}}>
                  <GiSandsOfTime />
                </div>
                <div>Pending</div>
              </div>
              <div className="df">
                <div className="icon-cont" style={{background : "#facf12"}}>
                  <CiDeliveryTruck />
                </div>
                <div>Delivered</div>
              </div>
              
            </div>
          </div>
          <Team />
      </div>
      <div className="dashsidebar df-c">
        <div className="df jc-sb">
          <div className="df-c ta-c">
            <span className=''>total users</span>
            <div className="dinar ta-c">27</div>
          </div>
          <div className="df-c ta-c">
            <span className='or1'>banned user</span>
            
            <div className="dinar or1 df ta-c"><MdRemoveCircle /> 27</div>
          </div>
        </div>
        <div className="primary-btn w-100">block users</div>
        <h3 className='ta-c'>Top Contrubuters</h3>
        <div className="df-c memberscontainer">
            {topactive && topactive.map((user, index) => (
              <div className="df">
                <FaCrown className={`crown${index}`} />
                <UserAct 
                  key={user._id} 
                  index={index} 
                  count={user.count}
                  user={user} 
                />
              </div>
            ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard