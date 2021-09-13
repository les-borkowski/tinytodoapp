import React from 'react'
import './modal-style.css'
// import {Button} from '@material-ui/core'

export default function Modal(props) {
  if (!props.show) {
    return null
  }
  return (
    <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        { props.children }
        {/* <Button variant="contained" fullWidth onClick={props.onClose} >Close</Button> */}
      </div>
    </div>
  )
}
