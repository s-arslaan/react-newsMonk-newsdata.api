import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  const updateCountry = (country) => {
    props.setCountry(country);
  }

  useEffect(() => {
    updateCountry();
  }, [])

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" style={{zIndex:100}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/world">NewsMonk</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/top">Top Headlines</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/world">World</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/environment">Environment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/food">Food</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/politics">Politics</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Country ({props.country})
              </button>
              <ul className="dropdown-menu dropdown-menu-start">
                <li><button className="dropdown-item" type="button" onClick={() => {updateCountry('in')}}>IND</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => {updateCountry('us')}}>USA</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => {updateCountry('gb')}}>UK</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => {updateCountry('au')}}>AUS</button></li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
