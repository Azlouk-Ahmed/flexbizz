import React from 'react'
import { useFetchData } from '../../hooks/useFetchData'
import { SlWallet } from "react-icons/sl";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { formatNumber } from '../../utils/utils';

function Stats({id}) {
    const {data: freelancer} = useFetchData("http://localhost:5000/achievements/freelancer/"+id);
    const {data: client} = useFetchData("http://localhost:5000/achievements/client/"+id);
    const {data: freelancerMonthIncome} = useFetchData("http://localhost:5000/achievements/income/"+id);
    const {data: clientMonthSpending} = useFetchData("http://localhost:5000/achievements/spending/"+id);

    
    return (
        <div className="stats">
            <div className="box money">
                <div className="df">
                    <span> <SlWallet />+</span> incomes
                </div>
                <div>
                    <h1>{formatNumber(freelancerMonthIncome?.totalIncomeCurrentMonth)} DT</h1>
                    <span className={freelancerMonthIncome?.percentageDifference < 0 ? 'danger' : 'sucess'}>
                        <div className="df">
                            {freelancerMonthIncome?.percentageDifference < 0 ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                            {formatNumber(Math.abs(freelancerMonthIncome?.percentageDifference))}%
                        </div>
                    </span>
                </div>
            </div>
            <div className="box money">
                <div className="df">
                    <span> <SlWallet />-</span> spendings
                </div>
                <div>
                    <h1>{formatNumber(clientMonthSpending?.totalSpendingCurrentMonth)} DT</h1>
                    <span className={clientMonthSpending?.percentageDifference < 0 ? 'danger' : 'sucess'}>
                        <div className="df">
                            {clientMonthSpending?.percentageDifference < 0 ? <MdOutlineKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                            {formatNumber(Math.abs(clientMonthSpending?.percentageDifference))}%
                        </div>
                    </span>
                </div>
            </div>
            <div className="box">
                <h1>{client?.achievements.length}</h1>
                <span>projects as client</span>
            </div>
            <div className="box">
                <h1>{freelancer?.achievements.length}</h1>
                <span>project as freelancer</span>
            </div>
        </div>
    )
}

export default Stats;