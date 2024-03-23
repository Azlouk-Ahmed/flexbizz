import React from 'react'

function Error({error}) {
  return (
    <div className="error">
        <img src={require("../../img/error.png")} alt='error'/>
        {error}</div>
  )
}

export default Error