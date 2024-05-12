import React from 'react'
import PropTypes from 'prop-types'
import '../CSS/presentation.css'
import Add from './Add'

const Presentation = (props, { todo, onEditClick, onDeleteClick } ) => {
  return (
    
      <div className="presentation-container1">
        <div className="presentation-container2">
          <button className="presentation-button button">{props.button}</button>
        </div>
        <div className="presentation-container3">
         

            <Add></Add>
  
       
        </div>
      </div>
  
  )
}

Presentation.defaultProps = {
  button: 'My Presentation',
  button1: '+ New presentation',
}
Presentation.propTypes = {
  button: PropTypes.string,
  button1: PropTypes.string,
}

export default Presentation
