import React from 'react'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"

import PropTypes from 'prop-types'

import '../CSS/navbar1.css'

const Navbar1 = (props) => {
  return (
    <div className={`navbar1-container ${props.rootClassName} `}>
      <div className="navbar1-navbar navbar-container">
        <div className="navbar1-max-width max-width">
          <span className="navbar1-text">
            <span className="brand-Name">
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span className="text-teaching">Teaching Assistance Tools</span>
            <span className="brand-Name">
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
          <div className="navbar1-links" style={{padding:20}}>
            {/* <button className='buttom-profile'><img  
              alt={props.pastedImage_alt}   
              src={props.pastedImage_src}
              className="navbar1-pasted-image"
            /></button> */}

              {/* <button type="button" class="btn btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                </svg>
                  
              </button> */}
              <Link to={'/Logout'}>
              <Button  class='button-42'>Logout</Button>
              </Link>
              
          </div>
        </div>
      </div>
    </div>
  )
}

Navbar1.defaultProps = {
  pastedImage_src: '/playground_assets/pastedimage-xa37-200h.png',
  rootClassName: '',
  pastedImage_alt: 'pastedImage',
}
Navbar1.propTypes = {
  pastedImage_src: PropTypes.string,
  rootClassName: PropTypes.string,
  pastedImage_alt: PropTypes.string,
}

export default Navbar1
