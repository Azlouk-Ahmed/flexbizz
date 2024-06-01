import { useContext } from "react"
import { ActContext} from "../context/ActivitiesContext"

export const useActContext = () => {
  const context = useContext(ActContext)
  
  if(!context) {
    throw Error('actContext must be used inside a actContextContextProvider')
  }


  return context
}