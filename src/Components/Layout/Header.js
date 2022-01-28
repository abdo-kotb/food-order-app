import styles from './Header.module.css';

import mealsImage from '../../assets/meals.jpg';

import HeaderCartBtn from './HeaderCartBtn';

const Header = function (props) {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartBtn onShowModal={props.onShowModal} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="a table of food" />
      </div>
    </>
  );
};

export default Header;
