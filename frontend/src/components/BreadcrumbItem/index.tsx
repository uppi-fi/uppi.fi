import styles from './BreadcrumbItem.module.scss';

const BreadcrumbItem: React.FC = ({ children }) => (
  <span className={styles['breadcrumb__item']}>
    <span className={styles['breadcrumb__inner']}>{children}</span>
    <span className={styles['breadcrumb__separator']}>/</span>
  </span>
);
export default BreadcrumbItem;
