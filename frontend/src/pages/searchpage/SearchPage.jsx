import React from 'react'
import Offers from '../../components/joboffers/Offers'
import Search from '../../components/search/Search'
import "./searchpage.css"
import Allusers from '../../components/getallusers/Allusers'

function SearchPage() {
  return (
    <div className="searchpage">
        <Search />
        <Offers />
        <Allusers />
    </div>
  )
}

export default SearchPage