import { Box } from '@mui/material';
import { CustomButton } from '../ui-components';
const Header = ({ connect, disconnect, account }) => {
  return (
    <div class="flex flex-row absolute top-0 right-0 transform -translate-x-9 translate-y-9">
      {account ? (
        <Box class="p-2 mr-4 border-2 border-black rounded">
          <h1 class="font-medium">Address: {account}</h1>{' '}
        </Box>
      ) : null}
      {!account ? (
        <CustomButton mainColor="white" secondaryColor="black" onClick={connect} label="Login" />
      ) : (
        <CustomButton
          mainColor="black"
          secondaryColor="white"
          onClick={disconnect}
          label="Logout"
        />
      )}
    </div>
  );
};

export default Header;
