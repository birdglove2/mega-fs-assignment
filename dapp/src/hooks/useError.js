import { useState } from 'react';

const useError = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenError = () => setIsError(true);
  const handleCloseError = () => setIsError(false);

  const handleError = (err) => {
    console.log('err', err);
    setErrorMessage(err.message);
    handleOpenError();
  };

  return { handleError, handleCloseError, isError, setIsError, errorMessage };
};

export default useError;
