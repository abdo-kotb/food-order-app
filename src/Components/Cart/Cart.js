import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import styles from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from './CartItem';

const Cart = function (props) {
  const [orderState, setOrderState] = useState();
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const orderHandler = function () {
    setOrderState({
      state: true,
      content: 'Ordering...',
    });
  };

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  return (
    <Modal onClose={props.onCloseModal}>
      <ul className={styles['cart-items']}>
        {cartCtx.items.map(item => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <p>Total Amount</p>
        <p>{totalAmount}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onCloseModal}>
          Close
        </button>
        {hasItems && (
          <button className={styles.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
      {orderState && cartCtx.items.length > 0 && (
        <p style={{ textAlign: 'center' }}>{orderState.content}</p>
      )}
    </Modal>
  );
};

export default Cart;
