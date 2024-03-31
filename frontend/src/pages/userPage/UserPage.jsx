import React,{useRef} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import "./userpage.css"
import { MdVerified } from "react-icons/md";
import UserPortfolio from '../../components/userPortfolio/UserPortfolio';
import { useFetchData } from '../../hooks/useFetchData';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { PDFExport } from '@progress/kendo-react-pdf';
import { FaArrowDownLong } from "react-icons/fa6";

function UserPage() {
    const {auth} = useAuthContext();
    const {loading,data,error} = useFetchData("http://localhost:5000/portfolio/user");
    const pdfExportComponent = useRef(null);

    const exportPDF = () => {
        pdfExportComponent.current.save();
    };
  return (
    <div className="profile">
        <div className="user-details">
            <div className="user--container">

            <div className="user">
                <div className="img--container">
                    <img src={auth?.user.img} alt=""/>
                </div>
                <div className="info">
                {auth?.user.status &&<div className={`status ${auth?.user.status}`} >{auth?.user.status} <img src={auth?.user.status === "available for work"? require("../../img/availablework.gif") : require("../../img/hiring.gif")} /></div>}
                    <div className="name">
                        <span>{auth?.user.name} {auth?.user.familyName} 
                        {
                            auth?.user.role ==="Admin" && <MdVerified />
                        }
                        </span>
                    </div>
                    <div className="education">
                        connections : <span>{auth?.user.connections.length}</span>
                    </div>
                    <div className="badges">
                        badges : <span>{auth?.user.badges.length}</span>
                    </div>
                </div>
            </div>
            </div>
            <div className="stats">
                <div className="box">
                    <h1>0 DT</h1>
                    <span>incomes</span>
                </div>
                <div className="box">
                    <h1>0 DT</h1>
                    <span>spendings</span>
                </div>
                <div className="box">
                    <h1>0</h1>
                    <span>projects as client</span>
                </div>
                <div className="box">
                    <h1>0</h1>
                    <span>project as freelancer</span>
                </div>
            </div>
            <div className="user-portfolio">
                {data &&
                
                <div className="pdf--view">
                    <FaArrowDownLong onClick={exportPDF} />
                    <PDFExport ref={pdfExportComponent} fileName="portfolio.pdf" margin={{ top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }}>
                        <UserPortfolio data={data} />
                    </PDFExport>
                </div>
                }
                {
                loading && <Loading />
                }

                {
                error && <Error error={error}/>
                }
            </div>

        </div>
    </div>
  )
}

export default UserPage