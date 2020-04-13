import React from 'react'
// import './Error1.css'
import './Error2.css'
import { Link } from 'react-router-dom'

export default function Error() {
  return (

    // example 1

    // <div id="notfound">
    //   <div className="notfound">
    //     <div className="notfound-404">
    //       <h1>404</h1>
    //       <h2>Page not found</h2>
    //     </div>
    //     <Link to="/">Go To Homepage</Link>
    //   </div>
    // </div>

    // example 2

    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to="/">Go To Homepage</Link>
      </div>
    </div>
  )
}
