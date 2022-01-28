import styles from './Modal.module.css';

import reactDom from 'react-dom';

const overlaysElement = document.getElementById('overlays');

const Backdrop = props => (
  <div className={styles.backdrop} onClick={props.onClick} />
);

const ModalOverlay = function (props) {
  return (
    <div className={styles.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = function (props) {
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onClick={props.onClose} />,
        overlaysElement
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlaysElement
      )}
    </>
  );
};

export default Modal;
