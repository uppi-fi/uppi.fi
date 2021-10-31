import ReactDOM from 'react-dom';
import SnackBar, { SnackBarMessageType } from '../components/SnackBar';

const triggerSnackbar = (
  title: string,
  message: string,
  messageType: SnackBarMessageType = 'info'
) => {
  const validMessageTypes = ['error', 'info', 'warning', 'success'];
  if (!validMessageTypes.includes(messageType)) {
    throw Error('Invalid snackbar message type');
  }
  ReactDOM.render(
    <SnackBar
      messageType={messageType}
      duration={4000}
      title={title}
      message={message}
    />,
    document.getElementById('snackbar-fixed-container')
  );
};

export const showErrorMessage = (title: string, message: string) => {
  triggerSnackbar(title, message, 'error');
};

export const showInfoMessage = (title: string, message: string) => {
  triggerSnackbar(title, message, 'info');
};

export const showSuccessMessage = (title: string, message: string) => {
  triggerSnackbar(title, message, 'success');
};

export const showWarningMessage = (title: string, message: string) => {
  triggerSnackbar(title, message, 'warning');
};
