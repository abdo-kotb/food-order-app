import { useContext } from 'react';

import styles from './MealItem.module.css';

import MealItemForm from './MeatItemForm';
import CartContext from '../../store/cart-context';

const MealItem = function (props) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = function (amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.heading,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.heading}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.price}>${props.price.toFixed(2)}</p>
      </div>
      <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
    </li>
  );
};

export default MealItem;
