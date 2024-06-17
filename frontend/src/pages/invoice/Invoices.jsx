import React, { useRef, useState } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useFetchData } from '../../hooks/useFetchData';
import { useAuthContext } from '../../hooks/useAuthContext';
import InvoiceComponent from './InvoiceComponent';

function Invoices() {
    const { auth } = useAuthContext();
    const { data } = useFetchData(process.env.REACT_APP_API_URL+"/transaction/user/" + auth?.user?._id);


    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

    const pdfExportComponent = useRef(null);

    const exportPDF = (invoiceId) => {
        setSelectedInvoiceId(invoiceId);
        setTimeout(() => {
            pdfExportComponent.current.save(); 
        }, 200); 
    };

    return (
        <div className='fd-c mt'>
            <div>Invoices</div>
            <div className="df-c">
                {
                    data?.map((el) => (
                        <div key={el._id} className="invoice-item">
                            <InvoiceComponent data={el} />
                            <button className='primary-btn' onClick={() => exportPDF(el._id)}>Export to PDF</button>
                            {selectedInvoiceId === el._id && (
                                <PDFExport ref={pdfExportComponent}>
                                    <div className="pdf-content">
                                        <InvoiceComponent data={el} />
                                    </div>
                                </PDFExport>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Invoices;
