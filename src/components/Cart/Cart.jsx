import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [error, setError] = useState(null)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  const orderHandler = e => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async userData => {
    setIsSubmitting(true)
    try {
      const response = await fetch(
        'https://yummyfood-delivery-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({ user: userData, orderedItem: cartCtx.items })
        }
      )
      if (!response.ok) {
        throw new Error(
          'There was an error while submitting your order. Please try again.'
        )
      }
    } catch (error) {
      setError(error.message)
    }
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {error && <p>{error.message}</p>}
      {!isCheckout && modalActions}
    </>
  )

  const didSubmitModalContent = <p>Your order has been sent!</p>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}
