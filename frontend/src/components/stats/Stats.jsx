import React from 'react'
import { useFetchData } from '../../hooks/useFetchData'
import { SlWallet } from "react-icons/sl";

function Stats({id}) {
    const {data: freelancer} = useFetchData("http://localhost:5000/achievements/freelancer/"+id);
    const {data: client} = useFetchData("http://localhost:5000/achievements/client/"+id);

    const formatNumber = (num) => {
        if(!num) {
            return 0;
        } else if (num < 1000) {
          return num.toString();
        } else if (num < 1000000) {
          return (num / 1000).toFixed(1) + 'k';
        } else {
          return (num / 1000000).toFixed(1) + 'm';
        }
    };
  return (
        <div className="stats">
            <div className="box money">
                <div className="df">
                <span> <SlWallet />+</span> incomes
                </div>
                <div>
                    <h1>{formatNumber(freelancer?.totalIncome)} DT</h1>
                    <span className='danger'>-10%</span>

                </div>
            </div>
            <div className="box money">
            <div className="df">
                    <span> <SlWallet />-</span> spendings
                </div>
                <div>
                    <h1>{formatNumber(client?.totalSpendings)} DT</h1>
                    <span className='sucess'>+20%</span>
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

export default Stats