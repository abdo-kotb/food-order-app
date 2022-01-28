import react from 'react';

import styles from './Input.module.css';

const Input = react.forwardRef(function (props, ref) {
  return (
    <fieldset className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} id={props.id} {...props.input} />
    </fieldset>
  );
});

export default Input;
