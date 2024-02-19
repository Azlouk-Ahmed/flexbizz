import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { RiArrowDropRightFill } from "react-icons/ri";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { CiFileOn } from "react-icons/ci";
import Modal from 'react-modal';
import { MdOutlineCancel } from "react-icons/md";

function MessageComponent({ message }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  function openModal() { setModalIsOpen(true); }
  function closeModal() { setModalIsOpen(false); }
  const { auth } = useAuthContext();

  const isImageFile = (fileName) => {
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".tiff",
      ".webp",
      ".svg",
      ".ico",
      ".psd",
      ".ai",
      ".eps",
      ".raw",
      ".cr2",
      ".nef",
      ".orf",
      ".arw"
    ];
    
    const ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
    return imageExtensions.includes(ext);
  };

  return (
    <>
      {auth && (
        <div
          className={
            auth && auth.user._id === message.senderId ? "sent" : "received"
          }
        >
          <RiArrowDropRightFill className="arrow" />
          {message.text}
          {message.file ? (
            isImageFile(message.file) ? (
              <img
                className="display-image" onClick={openModal}
                src={`http://localhost:5000/uploads/${message.file}`}
                alt={message.file}
              />
            ) : (
              <a
                className="display-file"
                href={`http://localhost:5000/uploads/${message.file}`}
                download
              >
                <CiFileOn /> {message.file}
              </a>
            )
          ) : null}
          <Modal className="modal" isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel={message.file} >
            <img
                className="display-image" onClick={openModal}
                src={`http://localhost:5000/uploads/${message.file}`}
                alt={message.file}
              />
            <MdOutlineCancel onClick={closeModal} className="close-modal" />
          </Modal>
          <div className="date-sent">
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MessageComponent;
