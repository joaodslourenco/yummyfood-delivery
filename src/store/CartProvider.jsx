import CartContext from './cart-context'
import { useReducer } from 'react'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems

    if (existingCartItem) {
      let updatedItem
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState
}

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  function addItemToCartHandler(item) {
    dispatchCartAction({ type: 'ADD', item: item })
  }
  function removeItemFromCartHandler(id) {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}
