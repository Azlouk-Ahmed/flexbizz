import React from 'react'
import MyResponsiveBar from './resopnsiveBar/MyResponsiveBar'
import Team from './team/Team'
import "./dashboard.css"
import { BiMoney } from 'react-icons/bi'
import { FaMoneyBill } from 'react-icons/fa6'
import { GiMoneyStack } from 'react-icons/gi'
import { RiMoneyEuroBoxLine } from 'react-icons/ri'
import { MdNotificationImportant, MdOutlineLibraryAdd, MdRemoveCircle } from 'react-icons/md'
import { FiPocket } from 'react-icons/fi'
import { BsPiggyBank } from 'react-icons/bs'
import { HiUserRemove } from 'react-icons/hi'
import { useFetchData } from '../../hooks/useFetchData'

function Dashboard() {
  const {data} = useFetchData("http://localhost:5000/achievements/admin");
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
              <div className="dinar">{data?.totalBudget}DT</div>
              </div>
            </div>
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont gr"><BsPiggyBank /></div>
                <span className='gr1'>total NET</span>
              </div>
              <div className="df-c g0">
              <span>Pure Incomes</span>
              <div className="dinar">{data?.netIncome}DT</div>
              </div>
            </div>
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont yl"><MdNotificationImportant /></div>
                <span className='yl1'>To Handle</span>
              </div>
              <div className="df-c g0">
              <span>Held In System</span>
              <div className="dinar">{data?.insystem}DT</div>
              </div>
            </div>
            <div className="box df-c">
              <div className="wrap df">
                <div className="icon-cont or"><GiMoneyStack /></div>
                <span className='or1'>Incoming</span>
              </div>
              <div className="df-c g0">
              <span>Pridicted Incomes</span>
              <div className="dinar">{data?.predictedIncome}DT</div>
              </div>
            </div>
          </div>
          <MyResponsiveBar />
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
      </div>

    </div>
  )
}

export default Dashboard