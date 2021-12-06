import { Box, Skeleton } from '@mui/material';
import SkeletonBox from '../../components/CustomBox/SkeletonBox';

const HomepageSkeleton = () => {
  return (
    <div class="flex flex-col items-center mt-40 ">
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
