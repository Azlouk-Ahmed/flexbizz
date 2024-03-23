import React from 'react'
import "./connection.css"
import { useAuthContext } from '../../hooks/useAuthContext'

function Connections() {
    const {auth} = useAuthContext();
  return (
    <>
        {auth &&
            <div>Connections</div>
        }
    </>
  )
}

export default Connections