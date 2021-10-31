import { useFile } from '@frontend/services/useFile';
import { useKeyPressEvent } from 'react-use';
import { useLocation } from 'wouter';
import File from '../File';
import Modal from '../Modal';
import Spinner from '../Spinner';

const FileModal: React.FC<{ fileId: string }> = ({ fileId }) => {
  const [, setLocation] = useLocation();
  const { currentFile, error } = useFile(fileId);

  const closeModal = () => setLocation('/files');
  useKeyPressEvent('Escape', closeModal);

  return (
    <Modal onClickOutside={closeModal}>
      {currentFile && <File file={currentFile} />}
      {error && (
        <>
          <b>Virhe ladattaessa tiedostoa!</b> <p>Yritä uudelleen myöhemmin.</p>
        </>
      )}
      {!error && !currentFile && <Spinner />}
    </Modal>
  );
};

export default FileModal;
