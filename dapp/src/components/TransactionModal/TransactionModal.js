import { openInNewTab } from '../../utils/function';
import { Modal, Box, Typography, Link, Button } from '@mui/material';

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
        class="flex flex-col justify-center items-center w-80 bg-white
                  border-2 border-black shadow-md
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
