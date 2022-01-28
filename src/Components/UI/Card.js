import styles from './Card.module.css';

const Card = props => (
  <div className={`${styles.card} ${props.className}`}>{props.children}</div>
);

export default Card;
