import styles from './FileCardDetails.module.scss';

const FileCardDetails: React.FC = ({ children }) => (
  <div className={styles.fileDetails}>{children}</div>
);
export default FileCardDetails;
