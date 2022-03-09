import React from 'react'
import classes from './Checkout.module.css'

const Checkout = props => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Your Address</label>
        <input type="text" id="address" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button>Submit</button>
    </form>
  )
}

export default Checkout
