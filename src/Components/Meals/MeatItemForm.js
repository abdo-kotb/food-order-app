import { useState, useRef } from 'react';

import styles from './MealItemForm.module.css';

import Input from '../UI/Input';

const MealItemForm = function (props) {
  const amountInputRef = useRef();
  const [isValidInput, setIsValidInput] = useState(true);

  const submitHandler = function (e) {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;

    if (!enteredAmount.trim()) {
      setIsValidInput(false);
      return;
    }
    setIsValidInput(true);
    props.onAddToCart(+enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `meal-${props.id}`,
          type: 'number',
          min: '1',
          max: '5',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isValidInput && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
