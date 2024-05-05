import React from 'react';
import './styles.css'

function Empty() {
  return (
    <div className="df empty">
        <img src={require("../../img/empty.png")} />
        <div>it's empty here</div>
    </div>
  )
}

export default Empty