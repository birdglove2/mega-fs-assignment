import { Box, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { CustomError, SkeletonBox } from '../../components/ui-components';
import { useError } from '../../hooks';

const HomepageSkeleton = () => {
  const { isError, setIsError, handleCloseError } = useError();

  useEffect(() => {
    let timer = setTimeout(() => setIsError(true), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isError]);

  return (
    <div class="flex flex-col items-center mt-40 ">
      <CustomError
        handleCloseError={handleCloseError}
        errorMessage={'You should be on Rinkeby to login'}
        isError={isError}
      />
      <div class="flex flex-row justify-start items-left w-1/2 -ml-20">
        <Box class="w-24 p-2 mr-2 border-2 ">
          <Skeleton variant="text" />
        </Box>
        <Box class="w-24 p-2 border-2 ">
          <Skeleton variant="text" />
        </Box>
      </div>

      <div class="flex flex-row justify-around w-1/2">
        <SkeletonBox />
        <SkeletonBox />
        <SkeletonBox />
      </div>

      <Box class="w-96 h-80 p-4 flex flex-col justify-between items-center border-2">
        <Skeleton variant="text" width="40%" height="3rem" />
        <Skeleton variant="rectangular" width="16rem" height="4rem" />
        <Skeleton variant="rectangular" width="15rem" height="3rem" />
      </Box>
    </div>
  );
};

export default HomepageSkeleton;
