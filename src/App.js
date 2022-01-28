import { useState } from 'react';

import './App.css';
import Cart from './Components/Cart/Cart';

import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';

import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showModalHandler = () => setCartIsShown(true);

  const closeModalHandler = () => setCartIsShown(false);

  return (
    <CartProvider>
      <Header onShowModal={showModalHandler} />
      <Meals />
      {cartIsShown && <Cart onCloseModal={closeModalHandler} />}
    </CartProvider>
  );
}

export default App;
