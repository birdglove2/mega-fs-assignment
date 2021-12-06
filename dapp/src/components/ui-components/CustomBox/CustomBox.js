import { Box, Typography, Skeleton } from '@mui/material';

const CustomBox = ({ title, value, isLoading = false }) => {
  return (
    <Box class="w-full m-4 p-2 flex flex-col justify-start border-solid border-2 border-black rounded">
      <Typography class="font-medium">{title}</Typography>
      {!isLoading ? <Typography>{value}</Typography> : <Skeleton width="60%" variant="text" />}
    </Box>
  );
};
export default CustomBox;
