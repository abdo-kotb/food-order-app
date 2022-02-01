import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import styles from './Cart.module.css';
import LoadingIcon from '../UI/LoadingIcon';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import gif from '../../assets/are-you-serious-spiderman.gif';

const Cart = function (props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [doneSend, setDoneSend] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const sendDataHandler = async function (data) {
    setIsSending(true);

    await fetch(
      'https://react-http-477ed-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: data,
          meals: cartCtx.items,
        }),
      }
    );

    setIsSending(false);
    setDoneSend(true);

    cartCtx.clearItems();
  };

  const orderHandler = function () {
    setIsCheckout(true);
  };

  const hideCheckoutHandler = () => setIsCheckout(false);

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const actionButtons = (
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
  );

  const modalComponent = (
    <>
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
      {isCheckout && (
        <Checkout
          onHideCheckout={hideCheckoutHandler}
          onOrderSubmit={sendDataHandler}
        />
      )}
      <div className={styles.total}>
        <p>Total Amount</p>
        <p>{totalAmount}</p>
      </div>
      {isCheckout || actionButtons}
    </>
  );

  return (
    <Modal onClose={props.onCloseModal}>
      {isSending || doneSend || modalComponent}
      {isSending && (
        <p className={styles.container}>
          <LoadingIcon />
        </p>
      )}
      {doneSend && (
        <div className={styles.container}>
          <img
            style={{ borderRadius: '1rem', marginBottom: '1rem' }}
            src={gif}
            alt="gif"
          />
          <div className={styles.actions}>
            <button className={styles.button} onClick={props.onCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
