import { Link } from "react-router-dom"

export const Navigation = (props) => {

  return (
    
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll'  href='#page-top'>
          Teaching Assistance Tools
          </a>{''}
          
        </div>

       
          <div
          className='collapse navbar-collapse' 
          id='bs-example-navbar-collapse-1'
          
          
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#feature' className='page-scroll'>
                Features
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            
            <li>
              <a href='#team' className='page-scroll'>
               Contact
              </a>
            </li>
            
            <li>
              <Link to="/login">
                <p className='page-scroll'>
                  login
                </p>
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}


