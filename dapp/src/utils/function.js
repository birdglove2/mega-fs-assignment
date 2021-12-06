export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const round3decimal = (number) => {
  return Math.round(number * 1000) / 1000;
};

export const getBlockPerSec = async (web3) => {
  const times = [];
  let currentBlock = await web3.eth.getBlock('latest');
  let previousBlock;
  for (let i = 0; i < 10; i++) {
    if (currentBlock.number !== null) {
      previousBlock = await web3.eth.getBlock(currentBlock.parentHash);
      if (previousBlock.number !== null) {
        const time = currentBlock.timestamp - previousBlock.timestamp;
        times.push(time);
      }
    }

    currentBlock = previousBlock;
  }

  let sum = 0;
  for (let i = 0; i < times.length; i++) {
    sum += times[i];
  }

  const avg = sum / times.length;
  return 1 / avg;
};
