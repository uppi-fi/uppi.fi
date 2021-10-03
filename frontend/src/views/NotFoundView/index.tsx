import image from '../../assets/images/404.png';
import styles from './NotFound.module.scss';

function NotFoundView() {
  return (
    <div className={styles.root}>
      <div className={styles.text}>Tiedostoa ei löydy</div>
      <img className={styles.image} src={image} alt="" />
    </div>
  );
}

export default NotFoundView;
