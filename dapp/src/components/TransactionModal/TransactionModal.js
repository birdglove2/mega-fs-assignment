import { openInNewTab } from '../../utils/function';
import { Modal, Box, Typography, Link, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -80%)',
  width: '20rem',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const TransactionModal = ({ modalOpen, handleModalClose, txHash }) => {
  const url = `https://rinkeby.etherscan.io/tx/${txHash}`;
  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        // class="flex flex-col justify-center items-center w-80 bg-white
        //           border-2 border-black shadow-md
        //           absoulute top-1/2 left-1/2 transform translate-x-full translate-y-full"
        sx={style}
      >
        <Typography class="m-2 p-2 font-medium ">Transaction Submitted</Typography>
        <div class="pb-2 mb-4 font-medium ">
          <span>View on </span>
          <Link
            class="cursor-pointer text-blue-500 underline"
            href={url}
            onClick={(e) => {
              e.preventDefault();
              openInNewTab(url);
            }}
          >
            Etherscan
          </Link>
        </div>

        <Button
          class="w-full p-2 border-t-2 border-black hover:bg-gray-900 hover:text-white"
          onClick={handleModalClose}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
};
export default TransactionModal;
