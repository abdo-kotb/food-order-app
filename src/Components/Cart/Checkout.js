import { useRef, useState } from 'react';

import styles from './Checkout.module.css';

import Input from '../UI/Input';

const textValueIsValid = value => [
  value.current.value.trim(),
  value.current.value !== '',
];

const Checkout = function (props) {
  const [formValidity, setFormValidity] = useState({});
  const [isTouched, setIsTouched] = useState(false);

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const checkoutChangeHandler = function () {
    const [, nameIsValid] = textValueIsValid(nameInputRef);
    const [, addressIsValid] = textValueIsValid(addressInputRef);
    const [, cityIsValid] = textValueIsValid(cityInputRef);

    const codeValue = postalInputRef.current.value.trim();
    const codeIsValid = isFinite(codeValue) && codeValue.length === 4;

    setFormValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      postalCode: codeIsValid,
    });
  };

  const checkoutSubmitHandler = function (e) {
    e.preventDefault();

    const [nameValue, nameIsValid] = textValueIsValid(nameInputRef);
    const [addressValue, addressIsValid] = textValueIsValid(addressInputRef);
    const [cityValue, cityIsValid] = textValueIsValid(cityInputRef);

    const codeValue = postalInputRef.current.value.trim();
    const codeIsValid = isFinite(codeValue) && codeValue.length === 4;

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && codeIsValid;

    setIsTouched(true);
    setFormValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      postalCode: codeIsValid,
    });

    if (!formIsValid) return;

    props.onOrderSubmit({
      name: nameValue,
      address: addressValue,
      city: cityValue,
      postalCode: codeValue,
    });
  };

  return (
    <form className={styles['checkout-form']} onSubmit={checkoutSubmitHandler}>
      <Input
        className={
          isTouched && !formValidity.name && styles['checkout-invalid']
        }
        ref={nameInputRef}
        label="Your name"
        input={{ type: 'text', id: 'name', onChange: checkoutChangeHandler }}
      />
      <Input
        className={
          isTouched && !formValidity.address && styles['checkout-invalid']
        }
        ref={addressInputRef}
        label="Street"
        input={{ type: 'text', id: 'street', onChange: checkoutChangeHandler }}
      />
      <Input
        className={
          isTouched && !formValidity.postalCode && styles['checkout-invalid']
        }
        ref={postalInputRef}
        label="Postal"
        input={{ type: 'text', id: 'postal', onChange: checkoutChangeHandler }}
      />
      <Input
        className={
          isTouched && !formValidity.city && styles['checkout-invalid']
        }
        ref={cityInputRef}
        label="Your city"
        input={{ type: 'text', id: 'city', onChange: checkoutChangeHandler }}
      />
      <button
        className={styles['button--alt']}
        type="button"
        onClick={props.onHideCheckout}
      >
        Cancel
      </button>
      <button className={styles.button}>Confirm</button>
    </form>
  );
};

export default Checkout;
