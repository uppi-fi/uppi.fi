import styles from './Breadcrumb.module.scss';

const Breadcrumb: React.FC = ({ children }) => (
  <div className={styles.breadcrumb}>{children}</div>
);
export default Breadcrumb;
