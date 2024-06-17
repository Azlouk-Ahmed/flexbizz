import React from 'react'
import Error from '../components/error/Error'
import { useAuthContext } from '../hooks/useAuthContext'

function Banned() {
    const {auth, dispatch} = useAuthContext();
    const logout = () => {
        console.log("logged out")
        localStorage.removeItem("auth");
        dispatch({type:"LOGOUT"})
        window.open(process.env.REACT_APP_API_URL+"/auth/logout", "_self");
    }
  return (
    <div className='centergrid ban'>
        <Error error="your account has been banned for violating our policies" />
        <div className="primary-btn mt" onClick={logout}>log out</div>
    </div>
  )
}

export default Banned