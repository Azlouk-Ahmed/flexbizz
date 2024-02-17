import React from 'react'

function Home({user}) {
  return (
    <div>
      welcome to home page {user.name}
    <img src={user.img} alt="" />
    </div>
  )
}

export default Home