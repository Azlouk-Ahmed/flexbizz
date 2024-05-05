import React,{useEffect, useRef} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import "./userpage.css"
import UserPortfolio from '../../components/userPortfolio/UserPortfolio';
import { useFetchData } from '../../hooks/useFetchData';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { PDFExport } from '@progress/kendo-react-pdf';
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/userheader/UserHeader';
import Stats from '../../components/stats/Stats';

function UserPage() {
    const { auth } = useAuthContext();
    const { loading, data, error } = useFetchData("http://localhost:5000/portfolio/user");
    
    const pdfExportComponent = useRef(null);
    const navigate = useNavigate();
    const authLocal = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        if (!authLocal) {
            navigate("/landing");
        }
    }, [authLocal, navigate]);

    const exportPDF = () => {
        if(pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
  return (
    <div className="profile">
        {auth &&<div className="user-details">
            <div className="user--container">

             <UserHeader user={auth?.user} />
            </div>
            <Stats />
            <div className="">
                {data &&
                
                <div className="pdf--view">
                    <HiOutlineDownload onClick={exportPDF} />
                    <PDFExport ref={pdfExportComponent} fileName="portfolio.pdf" margin={{ top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }}>
                        <UserPortfolio data={data.portfolio} />
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

        </div>}
        {!authLocal && <Error error={"please try to log in"} />}
    </div>
  )
}

export default UserPage