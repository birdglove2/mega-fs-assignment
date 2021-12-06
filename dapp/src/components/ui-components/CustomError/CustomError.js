import { Snackbar, Alert } from '@mui/material';

const ErrorAlert = ({ isError, handleCloseError, errorMessage }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isError}
      autoHideDuration={3000}
      onClose={handleCloseError}
    >
      <Alert onClose={handleCloseError} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
