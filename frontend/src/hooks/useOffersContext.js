import { useContext } from "react"
import { OffersContext } from "../context/OffersContext"

export const useOffersContext = () => {
  const context = useContext(OffersContext)
  
  if(!context) {
    throw Error('useOffersContext must be used inside a useOffersContextProvider')
  }


  return context
}