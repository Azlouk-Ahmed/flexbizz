import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components'
import Offer from "../../components/offer/Offer"
import { useFetchData } from '../../hooks/useFetchData';

const ModalDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
  padding: 1rem;
  border: 1px solid #aaa;
  background: #fff;
`
const BackDrop = styled(motion.div)`
  background: #aaaaaa2e;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`

function Modal({ isOpen, onClose, report }) {
    console.log("report from model :",report);

    const {data} = useFetchData(process.env.REACT_APP_API_URL+"/report/"+report)
  if (!isOpen) return null;


  return (
    <AnimatePresence>
        <BackDrop />
    <ModalDiv
      initial={{y: 10, x: "-50%", opacity: 0}}
      animate={{y: 150, opacity: 1}}
      exit={{y: 100, opacity: 0}}
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {
            data && data.about === "announcement" && <Offer offer={data.elementReported} />
        }
      </div>
    </ModalDiv>
    </AnimatePresence>
  );
}

export default Modal;
