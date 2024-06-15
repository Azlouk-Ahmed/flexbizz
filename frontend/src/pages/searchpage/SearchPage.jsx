import React, { useEffect } from 'react'
import Offers from '../../components/joboffers/Offers'
import Search from '../../components/search/Search'
import "./searchpage.css"
import Allusers from '../../components/getallusers/Allusers'
import { useNavigate } from 'react-router-dom'

function SearchPage() {
  const navigate = useNavigate(); 
  const authLocal = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    if (!authLocal) {
        navigate("/login");
    }
  }, [authLocal, navigate]);
  return (
    <div className="searchpage">
        <Search />
        <Offers admin={false} />
        <Allusers />
    </div>
  )
}

export default SearchPage