import { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';

import styles from './HeaderCartBtn.module.css';

import CartIcon from '../Cart/CartIcon';

const HeaderCartBtn = function (props) {
  const cartCtx = useContext(CartContext);
  const [btnIsBumped, setBtnIsBumped] = useState(false);

  const btnClasses = `${styles.button} ${btnIsBumped && styles.bump}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;

    setBtnIsBumped(true);
    const timer = setTimeout(() => {
      setBtnIsBumped(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const cartItemsNum = cartCtx.items.reduce(
    (curNum, item) => curNum + item.amount,
    0
  );

  return (
    <>
      <button className={btnClasses} onClick={props.onShowModal}>
        <CartIcon className={styles.icon} />
        Your Cart
        <span className={styles.badge}>{cartItemsNum}</span>
      </button>
    </>
  );
};

export default HeaderCartBtn;
