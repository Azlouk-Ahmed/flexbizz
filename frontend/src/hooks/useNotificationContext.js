import { useContext } from "react"
import { NotificationContext } from "../context/NotificationContext"

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  
  if(!context) {
    throw Error('useNotificationContext must be used inside a useNotificationContextProvider')
  }


  return context
}