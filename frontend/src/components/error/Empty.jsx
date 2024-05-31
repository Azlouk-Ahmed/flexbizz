import React from 'react';
import './styles.css'

function Empty({msg}) {
  return (
    <div className="df empty">
        <img src={require("../../img/empty.png")} />
        {!msg &&<div>it's empty here</div>}
        {msg &&<div>{msg}</div>}
    </div>
  )
}

export default Empty