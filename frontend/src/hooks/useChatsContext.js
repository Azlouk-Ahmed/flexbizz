import { useContext } from "react"
import { ChatsContext } from "../context/chatContext"

export const useChatsContext = () => {
  const context = useContext(ChatsContext)
  
  if(!context) {
    throw Error('useChatsContext must be used inside a useChatsContextProvider')
  }


  return context
}