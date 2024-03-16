import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"

export const useSocketContext = () => {
  const context = useContext(SocketContext)
  
  if(!context) {
    throw Error('useSocketContext must be used inside a useSocketContextProvider')
  }


  return context
}