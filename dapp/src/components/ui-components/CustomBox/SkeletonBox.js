import { Box, Skeleton } from '@mui/material';

const SkeletonBox = () => {
  return (
    <Box class="w-full m-4 p-2 flex flex-col justify-start border-solid border-2">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" />
    </Box>
  );
};
export default SkeletonBox;
