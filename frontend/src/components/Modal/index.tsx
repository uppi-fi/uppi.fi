import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

type ModalProps = {
  onClickOutside: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClickOutside, children }) => {
  return ReactDOM.createPortal(
    <div className={styles['modal-background']} onClick={onClickOutside}>
      <div
        className={styles['modal-content']}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('modal-root')!
  );
};

export default Modal;
